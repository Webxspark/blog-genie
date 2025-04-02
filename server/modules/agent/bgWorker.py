import time
import json
from extensions import db
from models.timelines import Timelines
from modules.functions import writeContent, generateThumbnail, BlogClient
def startBGAgent(app):
    with app.app_context():
        while True:
            timelines = Timelines.query.all()
            for rawTimeline in timelines:
                timeline = rawTimeline.serialize()
                id = timeline.get('id')
                agent = timeline.get('agent')
                schedules = json.loads(timeline.get('schedule'))
                
                for schedule in schedules:
                    if(schedule['posted'] == False):
                        schedule_date = schedule['date'] # format: DD-MM-YYYY
                        if schedule_date == time.strftime("%d-%m-%Y"):
                            currentSchedulePosts = schedule['posts']
                            blogAPI = BlogClient()
                            for scheduledPost in currentSchedulePosts:
                                print("Authenticating media platform...")
                                if not blogAPI.isLoggedIn():
                                    print("You are not logged in! Trying to login...")
                                    if not blogAPI.login():
                                        print("Login failed!")
                                        return False
                                print(f"Generating content for {scheduledPost['title']} on {schedule_date}")
                                response = writeContent(
                                    title=scheduledPost['title'],
                                    description=scheduledPost['description'],
                                    company=agent['cname'],
                                    niche=agent['cniche'],
                                    blogCategory=agent['blogcat'],
                                    blogDescription=agent['blogdesc'],
                                    contentDescription=agent['cdescription'],
                                    instructions=agent['instructions']
                                )
                                article_content = response.choices[0].message.content
                                article = json.loads(article_content)
                                print("Content generated successfully!")

                                post_title = scheduledPost['title']
                                post_description = scheduledPost['description']
                                post_body = article['content']
                                print("\nGenerating thumbnail...")
                                post_thumbnail = generateThumbnail(scheduledPost['thumbnail_prompts'][0])

                                print("\nCreating post...")
                                blogAPI.createPost(
                                    title=post_title,
                                    description=post_description,
                                    body=post_body,
                                    thumbnail=post_thumbnail
                                )

                            #----------------------------------------------
                            schedule['posted'] = True
                            # Update the schedule in the database
                            rawTimeline.schedule = json.dumps(schedules)
                            db.session.commit()
                            #----------------------------------------------

            # Sleep for a specified interval before checking again
            time.sleep(10)