"""Backend implementation for payment controller."""

from services.payment_service import (
    create_payment,
    get_my_payments,
    get_payment_detail,
    poll_payment_status,
    handle_mpesa_callback,
    handle_airtel_callback,
    handle_stripe_webhook,
)


# Handle the add payment operation.
def add_payment():
    return create_payment()


# Handle the get payments operation.
def get_payments():
    return get_my_payments()


def get_payment(payment_id):
    return get_payment_detail(payment_id)


def check_payment_status(payment_id):
    return poll_payment_status(payment_id)


def mpesa_callback():
    return handle_mpesa_callback()


def airtel_callback():
    return handle_airtel_callback()


def stripe_webhook():
    return handle_stripe_webhook()
