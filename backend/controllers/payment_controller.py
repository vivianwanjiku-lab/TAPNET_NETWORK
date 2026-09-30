"""Backend implementation for payment controller."""

from services.payment_service import (
    create_payment,
    get_my_payments
)


# Handle the add payment operation.
def add_payment():
    return create_payment()


# Handle the get payments operation.
def get_payments():
    return get_my_payments()
