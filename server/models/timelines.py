from extensions import db
from sqlalchemy.dialects.mysql import LONGTEXT

'''
CREATE TABLE `timeline` (
  `id` int(11) NOT NULL,
  `agent` varchar(200) NOT NULL,
  `schedule` LONGTEXT NOT NULL,
  `token` varchar(200) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
'''

class Timelines(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    agent = db.Column(db.String(200), nullable=False)
    schedule = db.Column(LONGTEXT, nullable=False)
    user = db.Column(db.String(200), nullable=False)
    token = db.Column(db.String(200), nullable=False)

    def serialize(self):
        from models.agents import Agents
        # Get agent details from the database
        agent_details = Agents.query.filter_by(tag=self.agent).first()
        agent_data = agent_details.serialize() if agent_details else {}
        return {
            "id": self.id,
            "agent": agent_data,
            "schedule": self.schedule,
            "user": self.user,
            "token": self.token
        }