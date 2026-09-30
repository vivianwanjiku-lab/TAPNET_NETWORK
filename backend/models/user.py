"""Define the customer and administrator account database model."""

from extensions import db


# Represent an account and its authentication and contact details.
class User(db.Model):
    __tablename__ = "users"

    # Primary key used to identify this row.
    id = db.Column(
        db.Integer,
        primary_key=True
    )

    # Human-readable name shown in the application.
    name = db.Column(
        db.String(100),
        nullable=False
    )

    # Unique email address used to identify the account.
    email = db.Column(
        db.String(120),
        unique=True,
        nullable=False
    )

    # Unique contact phone number for the account.
    phone = db.Column(
        db.String(20),
        unique=True,
        nullable=False
    )

    # Stores the password hash rather than the original password.
    password = db.Column(
        db.String(255),
        nullable=False
    )

    # Controls which application features the account may access.
    role = db.Column(
        db.String(20),
        nullable=False,
        default="customer"
    )

    # Provide a concise identifier when this model instance is displayed.
    # Avoid printing credentials; identify the account by its email.
    def __repr__(self):
        return f"<User {self.email}>"
