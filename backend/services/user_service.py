"""Load and format the signed-in user profile."""

from flask import jsonify
from flask_jwt_extended import get_jwt_identity

from models.user import User


# Find the authenticated account and return its public profile fields.
def get_user_profile():
    user_id = get_jwt_identity()

    user = User.query.get(
        int(user_id)
    )

    if not user:
        return jsonify({
            "message": "User not found"
        }), 404

    return jsonify({
        "user": {
            "id": user.id,
            "name": user.name,
            "email": user.email,
            "phone": user.phone,
            "role": user.role
        }
    }), 200
