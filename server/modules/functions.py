from flask import jsonify
from config import GroqClient
from datetime import datetime, timedelta
import os
import requests
import base64


def update_env_var(key, value):
    """Update a specific environment variable in the .env file"""
    env_path = '.env'
    # Read all lines from .env file
    with open(env_path, 'r') as file:
        lines = file.readlines()
    
    # Check if the key exists and update it, or append if it doesn't exist
    key_exists = False
    for i, line in enumerate(lines):
        if line.strip().startswith(f"{key}="):
            lines[i] = f"{key}={value}\n"
            key_exists = True
            break
    
    if not key_exists:
        lines.append(f"{key}={value}\n")
    
    # Write the updated content back to the file
    with open(env_path, 'w') as file:
        file.writelines(lines)
    
    # Update the environment variable in the current process
    os.environ[key] = value

def jsonResp(message: str, statusCode: int, data={}):
    out = {
        "status": statusCode,
        "message": message
    }
    if data:
        out["data"] = data
    return jsonify(out), statusCode

def writeContent(title, description, company, niche, blogCategory, blogDescription, contentDescription, instructions):
    if instructions == "-":
        instructions = "No instructions provided"
    
    messages = [
        {
            "role": "system",
            "content": f'''
            You are a content writer at {company} who specializes in {niche} and writes with a great sense of {blogCategory} and a little humor. 
            You are hired to write blogs with the following description: {blogDescription}.
            Your content should be relatable with a touch of {contentDescription}.
            Your content can also be apart from the description but should point to the main topic.
            The content should be SEO optimized and should be written in a way that it was written by a 15+ years experienced writer.
            The content should be in the html format which is opt for WYSIWYG editors and don't include image files or URLs.
            
            Here are some additional instructions: {instructions}

            Your response should be in JSON format with the following structure (and nothing else):
            {{
                "content" : str<html>,
            }}
            '''
        },
        {
            "role": "user",
            "content": f"Please write me a blog post with the title '{title}' and description '{description}'."
        }
    ]
    chat_completion = GroqClient.chat.completions.create(
        messages=messages,
        model="llama3-8b-8192",
        response_format={"type": "json_object"}
    )
    return chat_completion


def createTimelineResponse(name, company, niche, blogCategory, blogDescription, postFrequency, contentDescription, instructions):
    if not instructions:
        instructions = "No instructions provided"
    
    postDates = []
    # Get the current date and generate 6 more dates
    current_date = datetime.now()
    for i in range(7):
        date = current_date.strftime("%d-%m-%Y")
        postDates.append(date)
        current_date += timedelta(days=1)
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
            Required date schedule: {postDates} and keep the date format as dd-mm-yyyy.

            
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

def generateThumbnail(prompt):
    hyperbolic_key = os.environ.get("HYPERBOLIC_API_KEY")
    url = "https://api.hyperbolic.xyz/v1/image/generation"
    headers = {
        "Content-Type": "application/json",
        "Authorization": f"Bearer {hyperbolic_key}"
    }
    data = {
        "model_name": "SDXL1.0-base",
        "prompt": prompt,
        "steps": 30,
        "cfg_scale": 5,
        "enable_refiner": False,
        "height": 832,
        "width": 1216,
        "backend": "auto"
    }

    response = requests.post(url, headers=headers, json=data)
    store_dir = "static/thumbnails"
    if not os.path.exists(store_dir):
        os.makedirs(store_dir)
    if response.status_code == 200:
        '''
        Response Schema:
        {
            'images': [{'index': <int>, 'image': <base64_str>, 'random_seed': <int>}],
            'inference_time': <float>
        }
        '''
        response_json = response.json()
        base64_image = response_json['images'][0]['image']
        # Decode the base64 string
        image_data = base64.b64decode(base64_image)
        # Save the image to a file
        filename = f"thumbnail_{int(response_json['images'][0]['random_seed'])}.png"
        
        file_path = os.path.join(store_dir, filename)
        with open(file_path, 'wb') as image_file:
            image_file.write(image_data)
        print(f"Image saved to {file_path}")
        return file_path
    else:
        print(f"Error: {response.status_code} - {response.text}")
        # reuturn blank.png
        return "static/thumbnails/blank.png"
    
class BlogClient:
    def __init__(self):
        self.URL = os.environ.get("BLOG_API_URL") # without trailing slash
        self.AUTH_TOKEN = os.environ.get('BLOG_AUTH_TOKEN')
    def isLoggedIn(self):
        url = f"{self.URL}/user"
        headers = {
            "Authorization": f"Bearer {self.AUTH_TOKEN}",
            "Accept": "application/json",
        }
        response = requests.get(url, headers=headers)
        if response.status_code == 200:
            print(response.text)
            return True
        else:
            return False
    
    def login(self):
        email = os.environ.get("BLOG_EMAIL")
        password = os.environ.get("BLOG_PASSWORD")
        url = f"{self.URL}/login"
        data = {
            "email": email,
            "password": password
        }
        response = requests.post(url, json=data)
        '''
        Response schema:
        {
            "message": "Welcome Alan Christofer!",
            "user": {
                "name": "Alan Christofer",
                "email": "alanchris@webxspark.com",
                "id": 1
            },
            "token": "2|0hXRqz3JIrtFpMxXnn0t4vIi3OGciGgBj5n8nJ9Wfaf24605"
        }
        '''
        if response.status_code == 200:
            data = response.json()
            self.AUTH_TOKEN = data['token']
            # write the token to .env file
            update_env_var('BLOG_AUTH_TOKEN', self.AUTH_TOKEN)
            print(f"Logged in successfully!")
            return True
        else:
            print(f"Error: {response.status_code} - {response.text}")
            return False
    
    def createPost(self, title, description, body, thumbnail):
        url = f"{self.URL}/posts"
        print("\n******************\n")
        print("Validating session! Please wait...")
        if not self.isLoggedIn():
            print("You are not logged in! Trying to login...")
            if not self.login():
                print("Login failed!")
                return False
        
        headers = {
            "Authorization": f"Bearer {self.AUTH_TOKEN}",
            "Accept": "application/json",
        }
        # Load the thumbnail
        with open(thumbnail, 'rb') as f:
            thumbnail_data = f.read()
        
        # Create multipart form data with both text fields and file
        files = {
            'thumbnail': (os.path.basename(thumbnail), thumbnail_data, 'image/png')
        }
        # send the body as JSON
        data = {
            "title": title,
            "description": description,
            "body": body,
        }
        print(f"Creating post with title: {title}")
        response = requests.post(url, headers=headers, data=data, files=files)
        print(f"Response: {response.status_code} - {response.text}")
        # remove the thumbnail
        os.remove(thumbnail)

        # check the response if the header is 201
        if response.status_code == 201:
            print(f"Post created successfully! {response.json()}")
            return True
        else:
            print(f"Error: {response.status_code} - {response.text}")
            print("\n******************\n")
            return False