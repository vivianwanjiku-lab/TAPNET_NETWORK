"""Backend implementation for user controller."""

from services.user_service import get_user_profile


# Handle the get profile operation.
def get_profile():
    return get_user_profile()
