"""Define payment records and their relationship to user accounts."""

from datetime import datetime

from extensions import db


# Represent a payment made by a user.
class Payment(db.Model):
    __tablename__ = "payments"

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

    # Amount received for this payment.
    amount = db.Column(
        db.Float,
        nullable=False
    )

    # Payment channel used for this transaction.
    payment_method = db.Column(
        db.String(50),
        nullable=False
    )

    # Unique external or internal payment reference.
    transaction_id = db.Column(
        db.String(100),
        unique=True,
        nullable=False
    )

    # Current lifecycle state of this record.
    status = db.Column(
        db.String(20),
        nullable=False,
        default="pending"
    )

    # Timestamp captured when the payment is created.
    created_at = db.Column(
        db.DateTime,
        nullable=False,
        default=datetime.utcnow
    )

    # Resolve the account that owns this payment through user_id.
    user = db.relationship(
        "User",
        backref=db.backref(
            "payments",
            lazy=True
        )
    )

    # Provide a concise identifier when this model instance is displayed.
    def __repr__(self):
        return f"<Payment {self.transaction_id}>"
