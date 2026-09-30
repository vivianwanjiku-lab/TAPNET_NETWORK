"""Backend implementation for auth."""

from flask import Blueprint

from controllers.auth_controller import (
    login_user,
    register_user
)


auth_bp = Blueprint(
    "auth",
    __name__
)


@auth_bp.route(
    "/register",
    methods=["POST"]
)
# Validate submitted details, prevent duplicates, and save a hashed password.
def register():
    return register_user()


@auth_bp.route(
    "/login",
    methods=["POST"]
)
# Verify account credentials and return a signed access token on success.
def login():
    return login_user()
