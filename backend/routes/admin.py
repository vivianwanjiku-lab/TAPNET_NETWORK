"""Backend implementation for admin."""

from flask import Blueprint
from flask_jwt_extended import jwt_required

from controllers.admin_controller import (
    get_dashboard,
    get_payments,
    get_subscriptions
)

from utils.validators import admin_required


admin_bp = Blueprint(
    "admin",
    __name__
)


@admin_bp.route(
    "/payments",
    methods=["GET"]
)
@jwt_required()
# Handle the payments operation.
def payments():
    access_check = admin_required()

    if access_check:
        return access_check

    return get_payments()


@admin_bp.route(
    "/subscriptions",
    methods=["GET"]
)
@jwt_required()
# Handle the subscriptions operation.
def subscriptions():
    access_check = admin_required()

    if access_check:
        return access_check

    return get_subscriptions()


@admin_bp.route(
    "/dashboard",
    methods=["GET"]
)
@jwt_required()
# Handle the dashboard operation.
def dashboard():
    access_check = admin_required()

    if access_check:
        return access_check

    return get_dashboard()
