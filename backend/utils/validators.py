"""Check whether the authenticated account has administrator access."""

from flask import jsonify
from flask_jwt_extended import get_jwt_identity

from models.user import User


# Return an error response unless the authenticated account is an administrator.
def admin_required():
    user_id = get_jwt_identity()

    user = User.query.get(
        int(user_id)
    )

    if not user:
        return jsonify({
            "message": "User not found"
        }), 404

    if user.role != "admin":
        return jsonify({
            "message": "Admin access required"
        }), 403

    return None
