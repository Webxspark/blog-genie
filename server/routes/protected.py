from flask import Blueprint, request, jsonify
from extensions import db, jwt_required, get_jwt_identity
import random
from models.agents import Agents
from models.timelines import Timelines
from sqlalchemy import or_
from modules.functions import createTimelineResponse
import json

protected_bp = Blueprint("protected", __name__)

@protected_bp.route("/ping", methods=['GET'])
@jwt_required()
def ping():
    current_user = get_jwt_identity()
    return jsonify({
        "msg": "Pong!",
    }), 200

@protected_bp.route("/agents", methods=["GET"])
@jwt_required()
def agents():
    current_user = get_jwt_identity()
    reqParam = current_user
    
    # Fetch agents using the user's email or agent's tag
    agents = Agents.query.filter(or_(Agents.user == reqParam, Agents.tag == reqParam))
    if not agents:
        return jsonify({"msg": "No agents found!"}), 404
    return jsonify({
        "status": 200,
        "msg": "Agents fetched successfully!",
        "data": [agent.serialize() for agent in agents]
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
    
@protected_bp.route("/new-timeline", methods=["POST"])
@jwt_required()
def newTimeline():
    current_user = get_jwt_identity()
    data = request.get_json()
    required_parameters = [
        "agent_tag"
    ]
    for param in required_parameters:
        if not data.get(param):
            return jsonify({"msg": f"Parameter {param} is required!"}), 400
        
    # Check if the agent exists in timeline
    timelineInfo = Timelines.query.filter_by(agent=data["agent_tag"]).first()
    if timelineInfo:
        return jsonify({"msg": "Timeline already exists!"}), 400
    
    # get agent info
    agentInfo = Agents.query.filter_by(tag=data["agent_tag"]).first()
    if not agentInfo:
        return jsonify({"msg": "Agent not found!"}), 404
    agent: Agents = agentInfo.serialize()
    timelineResp = None
    try:
        response = createTimelineResponse(agent['name'], agent['cname'], agent['cniche'], agent['blogcat'], agent['blogdesc'], agent['postfreq'], agent['cdescription'], agent['instructions'])
        # Extract the content from the ChatCompletion object
        timeline_content = response.choices[0].message.content
        # Now parse the content as JSON
        timelineResp = json.loads(timeline_content)

    except Exception as e:
        print(e)
        return jsonify({"msg": "Error processing timeline", "error": str(e)}), 500
    # Save the timeline to the database
    timeline = Timelines(
        agent = agent['tag'],
        schedule = json.dumps(timelineResp['timeline']),
        user=current_user,
        token = random.randint(100000, 999999)
    )
    try:
        db.session.add(timeline)
        db.session.commit()
        return jsonify({"msg": "Timeline created successfully!"}), 201
    except Exception as e:
        return jsonify({"msg": "An error occurred", "_e": e}), 500

@protected_bp.route("/timelines", methods=["GET"])
@jwt_required()
def getUserTimelines():
    current_user = get_jwt_identity()
    timelines = Timelines.query.filter_by(user=current_user)
    if not timelines:
        return jsonify({"msg": "No timelines found!"}), 404
    return jsonify({
        "status": 200,
        "msg": "Timelines fetched successfully!",
        "data": [timeline.serialize() for timeline in timelines]
    }), 200

# @protected_bp.route('/timelines', methods=['DELETE'])
@protected_bp.route('/timelines/<string:token>', methods=['DELETE'])
@jwt_required()
def deleteTimeline(token):
    current_user = get_jwt_identity()
    # Validate the token
    if not token:
        return jsonify({"msg": "Token is required!"}), 400
    # Check if the timeline exists
    timelineInfo = Timelines.query.filter_by(token=token).first()
    if not timelineInfo:
        return jsonify({"msg": "Timeline not found!"}), 404
    
    # check if the timeline belongs to the user
    if timelineInfo.user != current_user:
        return jsonify({"msg": "Timeline does not belong to you!"}), 403
    try:
        db.session.delete(timelineInfo)
        db.session.commit()
        return jsonify({"msg": "Timeline deleted successfully!"}), 200
    except Exception as e:
        return jsonify({"msg": "An error occurred", "_e": e}), 500