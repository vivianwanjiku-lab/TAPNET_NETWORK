"""Backend implementation for auth controller."""

from services.auth_service import login, register


# Handle the register user operation.
def register_user():
    return register()


# Handle the login user operation.
def login_user():
    return login()
