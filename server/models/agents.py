from extensions import db

'''
CREATE TABLE `agent` (
  `id` int(11) NOT NULL,
  `name` varchar(200) NOT NULL,
  `tag` varchar(200) NOT NULL,
  `user` varchar(200) NOT NULL,
  `cname` varchar(200) NOT NULL,
  `cniche` varchar(200) NOT NULL,
  `blogcat` varchar(200) NOT NULL,
  `blogdesc` varchar(1000) NOT NULL,
  `postfreq` int(200) NOT NULL,
  `cdescription` mediumtext NOT NULL,
  `instructions` longtext NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

'''

class Agents(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(200), nullable=False)
    tag = db.Column(db.String(200), nullable=False)
    user = db.Column(db.String(200), nullable=False)
    cname = db.Column(db.String(200), nullable=False)
    cniche = db.Column(db.String(200), nullable=False)
    blogcat = db.Column(db.String(200), nullable=False)
    blogdesc = db.Column(db.String(1000), nullable=False)
    postfreq = db.Column(db.Integer, nullable=False)
    cdescription = db.Column(db.Text, nullable=False)
    instructions = db.Column(db.Text, nullable=False)
    
    def serialize(self):
        return {
            "id": self.id,
            "name": self.name,
            "tag": self.tag,
            "user": self.user,
            "cname": self.cname,
            "cniche": self.cniche,
            "blogcat": self.blogcat,
            "blogdesc": self.blogdesc,
            "postfreq": self.postfreq,
            "cdescription": self.cdescription,
            "instructions": self.instructions
        }