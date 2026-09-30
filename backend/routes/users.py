"""Backend implementation for users."""

from flask import Blueprint
from flask_jwt_extended import jwt_required

from controllers.user_controller import get_profile


users_bp = Blueprint(
    "users",
    __name__
)


@users_bp.route(
    "/profile",
    methods=["GET"]
)
@jwt_required()
# Handle the profile operation.
def profile():
    return get_profile()
