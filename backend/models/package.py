"""Define the internet package catalog database model."""

from extensions import db


# Represent a purchasable internet service package.
class Package(db.Model):
    __tablename__ = "packages"

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

    # Optional explanatory text for the package.
    description = db.Column(
        db.Text
    )

    # Amount charged for this package or payment.
    price = db.Column(
        db.Float,
        nullable=False
    )

    # Package validity period, measured in days.
    duration = db.Column(
        db.Integer,
        nullable=False
    )

    # Advertised internet speed for this package.
    speed = db.Column(
        db.String(50),
        nullable=False
    )

    # Controls whether customers can select this package.
    is_active = db.Column(
        db.Boolean,
        nullable=False,
        default=True
    )

    # Provide a concise identifier when this model instance is displayed.
    # Keep package objects identifiable in logs and debugging output.
    def __repr__(self):
        return f"<Package {self.name}>"
