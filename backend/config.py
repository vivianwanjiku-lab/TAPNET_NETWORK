"""Load environment-backed settings for the database and JWT authentication."""

import os

from dotenv import load_dotenv


load_dotenv()


# Centralize settings loaded by Flask from environment variables.
class Config:
    # Read the PostgreSQL connection string from the ignored environment file.
    SQLALCHEMY_DATABASE_URI = os.getenv("DATABASE_URL")
    # Disable SQLAlchemy event tracking because the app does not use it.
    SQLALCHEMY_TRACK_MODIFICATIONS = False
    # Keep signed-token secrets outside source control.
    JWT_SECRET_KEY = os.getenv("JWT_SECRET_KEY")
