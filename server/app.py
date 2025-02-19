from flask import Flask, jsonify
from flask_cors import CORS
from modules.functions import jsonResp
from config import Config
from extensions import db, jwt
from routes.auth import auth_bp
from routes.protected import protected_bp

app = Flask(__name__)
# Enable CORS policy
CORS(app)

# Load the configuration
app.config.from_object(Config)

# Initialize the extensions
# 1. db (SQLAlchemy)
db.init_app(app)
# 2. jwt (JWTManager)
jwt.init_app(app)

# Handling expired token response
@jwt.expired_token_loader
def expired_token_callback(jwt_header, jwt_data):
    return jsonify({
        "msg": "Token has expired!",
        "status": 401,
        "action": "refresh_token"
    }), 401


# Registering blueprints
app.register_blueprint(auth_bp, url_prefix="/auth")
app.register_blueprint(protected_bp, url_prefix="/sudo")

# Create tables inside application context
with app.app_context():
    db.create_all()

# Starting the app
app.run("0.0.0.0", 8080, debug=False)
