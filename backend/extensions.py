"""Define reusable Flask extensions before attaching them to the application."""

from flask_sqlalchemy import SQLAlchemy
from flask_jwt_extended import JWTManager


# Shared ORM handle; the Flask app binds it to its configuration at startup.
db = SQLAlchemy()
# Shared JWT handler used to issue and validate access tokens.
jwt = JWTManager()
