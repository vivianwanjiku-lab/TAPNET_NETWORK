"""Backend implementation for admin controller."""

from services.admin_service import (
    get_all_payments,
    get_all_subscriptions,
    get_dashboard_stats
)


# Handle the get payments operation.
def get_payments():
    return get_all_payments()


# Handle the get subscriptions operation.
def get_subscriptions():
    return get_all_subscriptions()


# Handle the get dashboard operation.
def get_dashboard():
    return get_dashboard_stats()
