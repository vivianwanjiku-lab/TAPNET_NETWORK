"""Create the Flask application, initialize shared extensions, and register API routes."""

from flask import Flask
from flask_migrate import Migrate

from config import Config
from extensions import db, jwt


app = Flask(__name__)

app.config.from_object(Config)


# Initialize extensions
db.init_app(app)
jwt.init_app(app)


# Initialize migrations
migrate = Migrate(app, db)


# Import models
from models.user import User
from models.package import Package
from models.payment import Payment
from models.subscription import Subscription


# Import routes
from routes.auth import auth_bp
from routes.users import users_bp
from routes.packages import packages_bp
from routes.payments import payments_bp
from routes.subscriptions import subscriptions_bp
from routes.admin import admin_bp


# Register routes
app.register_blueprint(
    auth_bp,
    url_prefix="/api/auth"
)

app.register_blueprint(
    users_bp,
    url_prefix="/api/users"
)

app.register_blueprint(
    packages_bp,
    url_prefix="/api/packages"
)

app.register_blueprint(
    payments_bp,
    url_prefix="/api/payments"
)

app.register_blueprint(
    subscriptions_bp,
    url_prefix="/api/subscriptions"
)

app.register_blueprint(
    admin_bp,
    url_prefix="/api/admin"
)


@app.route("/")
# Return a health response for the running backend.
def home():
    return {
        "message": "TAPNET_NETWORK backend is running",
        "database": "PostgreSQL"
    }


if __name__ == "__main__":
    app.run(debug=True)
