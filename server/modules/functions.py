from flask import jsonify

def jsonResp(message: str, statusCode: int, data={}):
    out = {
        "status": statusCode,
        "message": message
    }
    if data:
        out["data"] = data
    return jsonify(out), statusCode