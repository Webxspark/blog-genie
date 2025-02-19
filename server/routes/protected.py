from flask import Blueprint, request, jsonify
from extensions import db, jwt_required, get_jwt_identity
import random
from models.agents import Agents
from sqlalchemy import or_

protected_bp = Blueprint("protected", __name__)

@protected_bp.route("/agents", methods=["GET"])
@jwt_required()
def agents():
    current_user = get_jwt_identity()
    requestData = request.get_json()
    reqParam = current_user
    if requestData.get("tag"):
        reqParam = requestData["tag"]
    
    # Fetch agents using the user's email or agent's tag
    agents = Agents.query.filter(or_(Agents.user == reqParam, Agents.tag == reqParam)).first()
    if not agents:
        return jsonify({"msg": "No agents found!"}), 404
    return jsonify({
        "status": 200,
        "msg": "Agents fetched successfully!",
        "data": agents.serialize()
    }), 200

@protected_bp.route("/agents", methods=['POST'])
@jwt_required()
def createAgent():
    current_user = get_jwt_identity()
    data = request.get_json()

    required_parameters = [
        "name",
        "cname",
        "cniche",
        "blogcat",
        "blogdesc",
        "postfreq",
        "cdescription",
        "instructions"
    ]

    for param in required_parameters:
        if not data.get(param):
            return jsonify({"msg": f"Parameter {param} is required!"}), 400
    
    agentTag = f"AGENT_{random.randint(1000, 9999)}"
    
    Agent = Agents(
        name = data["name"],
        tag = agentTag,
        user = current_user,
        cname = data["cname"],
        cniche = data["cniche"],
        blogcat = data["blogcat"],
        blogdesc = data["blogdesc"],
        postfreq = data["postfreq"],
        cdescription = data["cdescription"],
        instructions = data["instructions"]
    )

    try:
        db.session.add(Agent)
        db.session.commit()
        return jsonify({"msg": "Agent created successfully!"}), 201
    except Exception as e:
        return jsonify({"msg": "An error occurred", "_e": e}), 500