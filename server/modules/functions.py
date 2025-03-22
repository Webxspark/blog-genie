from flask import jsonify
from config import GroqClient
from datetime import datetime

def jsonResp(message: str, statusCode: int, data={}):
    out = {
        "status": statusCode,
        "message": message
    }
    if data:
        out["data"] = data
    return jsonify(out), statusCode

def createTimelineResponse(name, company, niche, blogCategory, blogDescription, postFrequency, contentDescription, instructions):
    if not instructions:
        instructions = "No instructions provided"
    messages = [
        {
            "role": "system",
            "content": f'''
            You are {name}, a content writer at {company} who specializes in {niche} and writes with a great sense of {blogCategory} and a little humor. 
            You are hired to write blogs with the following description: {blogDescription}.
            You are asked to plan your content calendar with a post frequency of {postFrequency} posts per day for the next 7 days.
            Your content should be relatable with a touch of {contentDescription}.
            Your content can also be apart from the description but should point to the main topic.
            The content should be SEO optimized and should be written in a way that it was written by a 15+ years experienced writer.
            Today is {datetime.now().strftime("%d-%m-%Y")}.
            
            Here are some additional instructions: {instructions}

            Your response should be in JSON format with the following structure (and nothing else):
            {{
                "timeline": [
                    {{
                        "date": "dd-mm-yyyy",
                        "posts": [
                            {{
                                "title": "Blog Title (in humanized form)",
                                "description": "Blog Description (in humanized form)",
                                "tags": ["tag1", "tag2"],
                                "thumbnail_prompts": ["stable diffusion text-to-image prompt1", "stable diffusion text-to-image prompt2"]
                            }}
                        ],
                        "posted": false
                    }}
                ]
            }}
            '''
        },
        {
            "role": "user",
            "content": f"Please create me a timeline for the next 7 days with a post frequency of {postFrequency} post(s) per day."
        }
    ]
    chat_completion = GroqClient.chat.completions.create(
        messages=messages,
        model="llama3-8b-8192",
        response_format={"type": "json_object"}
    )
    return chat_completion
