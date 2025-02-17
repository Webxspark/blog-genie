from flask import Flask
from flask_cors import CORS
from modules.functions import jsonResp
from config import Config
from extensions import db, jwt
from routes.auth import auth_bp


app = Flask(__name__)
CORS(app)
app.config.from_object(Config)

db.init_app(app)
jwt.init_app(app)

app.config["SESSION_TYPE"] = "filesystem"
app.config['SESSION_PERMANENT'] = False
app.register_blueprint(auth_bp, url_prefix="/auth")



app.run("0.0.0.0", 8080, debug=False)