from flask import Blueprint, request, jsonify
from extensions import jwt_required, get_jwt_identity
protected_bp = Blueprint("protected", __name__)

@protected_bp.route("/agents", methods=["GET"])
@jwt_required()
def agents():
    current_user = get_jwt_identity()
    return jsonify({"message": f"Welcome to the agents page {current_user}!"}), 200