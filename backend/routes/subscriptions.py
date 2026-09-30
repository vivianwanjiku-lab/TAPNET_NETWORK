"""Backend implementation for subscriptions."""

from flask import Blueprint
from flask_jwt_extended import jwt_required

from controllers.subscription_controller import (
    add_subscription,
    cancel_user_subscription,
    get_subscriptions
)


subscriptions_bp = Blueprint(
    "subscriptions",
    __name__
)


@subscriptions_bp.route(
    "/",
    methods=["POST"]
)
@jwt_required()
# Handle the create operation.
def create():
    return add_subscription()


@subscriptions_bp.route(
    "/",
    methods=["GET"]
)
@jwt_required()
# Handle the my subscriptions operation.
def my_subscriptions():
    return get_subscriptions()


@subscriptions_bp.route(
    "/<int:subscription_id>",
    methods=["DELETE"]
)
@jwt_required()
# Handle the cancel operation.
def cancel(subscription_id):
    return cancel_user_subscription(
        subscription_id
    )
