import time
from models.timelines import Timelines
def startBGAgent(app):
    with app.app_context():
        while True:
            print("BGAgent: I am alive!")
            # logic here
            time.sleep(10)