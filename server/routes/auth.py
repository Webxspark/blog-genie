import bcrypt
import random
from flask import Blueprint, request, jsonify
from models.users import Users
from extensions import db, create_access_token, jwt_required, get_jwt_identity, create_refresh_token
from datetime import timedelta
auth_bp = Blueprint("auth", __name__)

@auth_bp.route("/register", methods=["POST"])
def register():
    data = request.get_json()
    # validate
    if not data["username"] or not data["email"] or not data["password"]:
        return jsonify({"msg": "Invalid request!"}), 400

    if Users.query.filter_by(email=data['email']).first():
        return jsonify({"msg": "Email already exists"}), 400
    username = data["username"]
    email = data["email"]
    password_hash = bcrypt.hashpw(data["password"].encode(), bcrypt.gensalt())
    token = random.randint(100000, 999999)
    try:
        new_user = Users(username=username, email=email, password=password_hash, token=token)
        db.session.add(new_user)
        db.session.commit()
        return jsonify({"msg": "User registered successfully"}), 201
    except Exception as e:
        return jsonify({"msg": "An error occurred", "_e": e}), 500

@auth_bp.route("/login", methods=["POST"])
def login():
    data = request.get_json()
    #validation
    if not data["email"] or not data["password"]:
        return jsonify({"msg": "Invalid request!"}), 400
    
    user = Users.query.filter_by(email=data["email"]).first()
    if not user:
        return jsonify({"msg": "User does not exist"}), 404
    
    if not bcrypt.checkpw(data["password"].encode(), user.password.encode()):
        return jsonify({"msg": "Incorrect password!"}), 400
    
    accessToken = create_access_token(identity=user.email, expires_delta=timedelta(minutes=5))
    refreshToken = create_refresh_token(identity=user.email)

    
    return jsonify({
        "msg": f"Welcome {user.username or ':)'}", 
        "access_token": accessToken,
        "refresh_token": refreshToken
        }), 200

@auth_bp.route("/refresh", methods=["POST"])
@jwt_required(refresh=True)
def refresh():
    current_user = get_jwt_identity()
    accessToken = create_access_token(identity=current_user, expires_delta=timedelta(minutes=5))
    return jsonify({
        "access_token": accessToken
    }), 200