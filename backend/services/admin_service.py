"""Build administrator payment, subscription, and dashboard data."""

from flask import jsonify

from extensions import db
from models.package import Package
from models.payment import Payment
from models.subscription import Subscription
from models.user import User


# Return all payment records for the administrator view.
def get_all_payments():
    payments = Payment.query.order_by(
        Payment.created_at.desc()
    ).all()

    return jsonify({
        "payments": [
            {
                "id": payment.id,
                "user_id": payment.user_id,
                "amount": payment.amount,
                "payment_method": payment.payment_method,
                "transaction_id": payment.transaction_id,
                "status": payment.status,
                "created_at": payment.created_at.isoformat()
            }
            for payment in payments
        ]
    }), 200


# Return all subscription records for the administrator view.
def get_all_subscriptions():
    subscriptions = Subscription.query.order_by(
        Subscription.start_date.desc()
    ).all()

    return jsonify({
        "subscriptions": [
            {
                "id": subscription.id,
                "user_id": subscription.user_id,
                "package_id": subscription.package_id,
                "package_name": subscription.package.name,
                "start_date": subscription.start_date.isoformat(),
                "end_date": subscription.end_date.isoformat(),
                "status": subscription.status
            }
            for subscription in subscriptions
        ]
    }), 200


# Aggregate account, package, payment, subscription, and revenue totals.
def get_dashboard_stats():
    total_customers = User.query.filter_by(
        role="customer"
    ).count()

    total_packages = Package.query.count()

    total_payments = Payment.query.count()

    total_subscriptions = Subscription.query.count()

    active_subscriptions = Subscription.query.filter_by(
        status="active"
    ).count()

    total_revenue = db.session.query(
        db.func.sum(Payment.amount)
    ).scalar() or 0

    return jsonify({
        "dashboard": {
            "total_customers": total_customers,
            "total_packages": total_packages,
            "total_payments": total_payments,
            "total_subscriptions": total_subscriptions,
            "active_subscriptions": active_subscriptions,
            "total_revenue": float(total_revenue)
        }
    }), 200
