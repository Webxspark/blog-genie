from flask import Blueprint, request, jsonify
from models.users import Users
from extensions import db

auth_bp = Blueprint("auth", __name__)

@auth_bp.route("/register", methods=["POST"])
def register():
    # data = request.json
    # new_user = Users(username=data["username"], email=data["email"], password_hash=data["password"], tag=data["tag"])
    # db.session.add(new_user)
    # db.session.commit()
    return jsonify({"message": "User registered successfully"}), 201