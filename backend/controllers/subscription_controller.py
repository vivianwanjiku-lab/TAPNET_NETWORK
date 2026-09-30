"""Backend implementation for subscription controller."""

from services.subscription_service import (
    cancel_subscription,
    create_subscription,
    get_my_subscriptions
)


# Handle the add subscription operation.
def add_subscription():
    return create_subscription()


# Handle the get subscriptions operation.
def get_subscriptions():
    return get_my_subscriptions()


# Handle the cancel user subscription operation.
def cancel_user_subscription(subscription_id):
    return cancel_subscription(
        subscription_id
    )
