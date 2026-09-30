"""Create, list, expire, and cancel customer subscriptions."""

from datetime import datetime, timedelta

from flask import jsonify, request
from flask_jwt_extended import get_jwt_identity

from extensions import db
from models.package import Package
from models.subscription import Subscription


# Convert a subscription and its package into response data.
def subscription_to_dict(subscription):
    return {
        "id": subscription.id,
        "user_id": subscription.user_id,
        "package_id": subscription.package_id,
        "package_name": subscription.package.name,
        "start_date": subscription.start_date.isoformat(),
        "end_date": subscription.end_date.isoformat(),
        "status": subscription.status
    }


# Mark active subscriptions past their end date as expired.
def update_expired_subscriptions():
    current_time = datetime.utcnow()

    expired = Subscription.query.filter(
        Subscription.end_date <= current_time,
        Subscription.status == "active"
    ).all()

    for subscription in expired:
        subscription.status = "expired"

    if expired:
        db.session.commit()


# Validate the selected package and create a time-bounded subscription.
def create_subscription():
    user_id = get_jwt_identity()

    data = request.get_json()

    if not data:
        return jsonify({
            "message": "No data provided"
        }), 400

    package_id = data.get("package_id")

    if package_id is None:
        return jsonify({
            "message": "Package ID is required"
        }), 400

    package = db.session.get(
        Package,
        package_id
    )

    if not package:
        return jsonify({
            "message": "Package not found"
        }), 404

    if not package.is_active:
        return jsonify({
            "message": "This package is no longer available"
        }), 400

    start_date = datetime.utcnow()

    end_date = start_date + timedelta(
        days=package.duration
    )

    subscription = Subscription(
        user_id=int(user_id),
        package_id=package.id,
        start_date=start_date,
        end_date=end_date,
        status="active"
    )

    db.session.add(subscription)
    db.session.commit()

    return jsonify({
        "message": "Subscription created successfully",
        "subscription": subscription_to_dict(
            subscription
        )
    }), 201


# Update expired records and return this user’s subscriptions.
def get_my_subscriptions():
    update_expired_subscriptions()

    user_id = get_jwt_identity()

    subscriptions = Subscription.query.filter_by(
        user_id=int(user_id)
    ).order_by(
        Subscription.start_date.desc()
    ).all()

    return jsonify({
        "subscriptions": [
            subscription_to_dict(subscription)
            for subscription in subscriptions
        ]
    }), 200


# Allow the owner to cancel a subscription that has not expired.
def cancel_subscription(subscription_id):
    user_id = get_jwt_identity()

    subscription = db.session.get(
        Subscription,
        subscription_id
    )

    if not subscription:
        return jsonify({
            "message": "Subscription not found"
        }), 404

    if subscription.user_id != int(user_id):
        return jsonify({
            "message": (
                "You are not allowed to "
                "cancel this subscription"
            )
        }), 403

    if subscription.status == "cancelled":
        return jsonify({
            "message": "Subscription is already cancelled"
        }), 400

    if subscription.end_date <= datetime.utcnow():
        subscription.status = "expired"
        db.session.commit()

        return jsonify({
            "message": "Subscription has already expired",
            "subscription": subscription_to_dict(
                subscription
            )
        }), 400

    subscription.status = "cancelled"

    db.session.commit()

    return jsonify({
        "message": "Subscription cancelled successfully",
        "subscription": subscription_to_dict(
            subscription
        )
    }), 200
