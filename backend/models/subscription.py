"""Define package subscriptions and their user and package relationships."""

from datetime import datetime

from extensions import db


# Represent a user’s active or historical package period.
class Subscription(db.Model):
    __tablename__ = "subscriptions"

    # Primary key used to identify this row.
    id = db.Column(
        db.Integer,
        primary_key=True
    )

    # Foreign key linking this record to its account owner.
    user_id = db.Column(
        db.Integer,
        db.ForeignKey("users.id"),
        nullable=False
    )

    # Foreign key linking the subscription to its package.
    package_id = db.Column(
        db.Integer,
        db.ForeignKey("packages.id"),
        nullable=False
    )

    # Timestamp when the subscription becomes active.
    start_date = db.Column(
        db.DateTime,
        nullable=False,
        default=datetime.utcnow
    )

    # Timestamp when the subscription period ends.
    end_date = db.Column(
        db.DateTime,
        nullable=False
    )

    # Current lifecycle state of this record.
    status = db.Column(
        db.String(20),
        nullable=False,
        default="active"
    )

    # Resolve the account that owns this subscription through user_id.
    user = db.relationship(
        "User",
        backref=db.backref(
            "subscriptions",
            lazy=True
        )
    )

    # Resolve the selected plan through package_id.
    package = db.relationship(
        "Package",
        backref=db.backref(
            "subscriptions",
            lazy=True
        )
    )

    # Provide a concise identifier when this model instance is displayed.
    def __repr__(self):
        return f"<Subscription {self.id}>"
