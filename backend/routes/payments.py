"""Payment routes - M-Pesa, Stripe, Airtel Money, Cash."""

from flask import Blueprint, request
from flask_jwt_extended import jwt_required

from controllers.payment_controller import (
    add_payment,
    get_payments,
    get_payment,
    initiate_mpesa_callback,
    initiate_airtel_callback,
    initiate_stripe_webhook,
    query_payment_status,
)

payments_bp = Blueprint("payments", __name__)


# ============ CREATE PAYMENT (all methods) ============

@payments_bp.route("/", methods=["POST"])
@jwt_required()
def create():
    """Initiate a payment via mpesa, airtel, stripe, or cash."""
    return add_payment()


# ============ LIST / GET ============

@payments_bp.route("/", methods=["GET"])
@jwt_required()
def my_payments():
    return get_payments()


@payments_bp.route("/<payment_id>", methods=["GET"])
@jwt_required()
def payment_detail(payment_id):
    return get_payment(payment_id)


@payments_bp.route("/<payment_id>/status", methods=["GET"])
@jwt_required()
def payment_status(payment_id):
    """Poll this to check if a pending payment completed."""
    return query_payment_status(payment_id)


# ============ CALLBACKS (no auth — called by providers) ============

@payments_bp.route("/callback/mpesa", methods=["POST"])
def mpesa_callback():
    """Safaricom M-Pesa STK Push result callback."""
    return initiate_mpesa_callback()


@payments_bp.route("/callback/airtel", methods=["POST"])
def airtel_callback():
    """Airtel Money collection callback."""
    return initiate_airtel_callback()


@payments_bp.route("/callback/stripe", methods=["POST"])
def stripe_webhook():
    """Stripe webhook for checkout.session.completed."""
    return initiate_stripe_webhook()
