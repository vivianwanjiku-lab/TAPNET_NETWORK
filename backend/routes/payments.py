"""Backend implementation for payments."""

from flask import Blueprint
from flask_jwt_extended import jwt_required

from controllers.payment_controller import (
    add_payment,
    get_payments
)


payments_bp = Blueprint(
    "payments",
    __name__
)


@payments_bp.route(
    "/",
    methods=["POST"]
)
@jwt_required()
# Handle the create operation.
def create():
    return add_payment()


@payments_bp.route(
    "/",
    methods=["GET"]
)
@jwt_required()
# Handle the my payments operation.
def my_payments():
    return get_payments()
