"""Record and list payments belonging to the signed-in user."""

from flask import jsonify, request
from flask_jwt_extended import get_jwt_identity

from extensions import db
from models.payment import Payment


# Convert a payment model into a JSON-ready response shape.
def payment_to_dict(payment):
    return {
        "id": payment.id,
        "user_id": payment.user_id,
        "amount": payment.amount,
        "payment_method": payment.payment_method,
        "transaction_id": payment.transaction_id,
        "status": payment.status,
        "created_at": payment.created_at.isoformat()
    }


# Validate a payment request and record it for the authenticated user.
def create_payment():
    user_id = get_jwt_identity()

    data = request.get_json()

    if not data:
        return jsonify({
            "message": "No data provided"
        }), 400

    amount = data.get("amount")
    payment_method = data.get("payment_method")
    transaction_id = data.get("transaction_id")

    if (
        amount is None
        or not payment_method
        or not transaction_id
    ):
        return jsonify({
            "message": (
                "Amount, payment method and "
                "transaction ID are required"
            )
        }), 400

    existing_payment = Payment.query.filter_by(
        transaction_id=transaction_id
    ).first()

    if existing_payment:
        return jsonify({
            "message": "Transaction ID already exists"
        }), 409

    payment = Payment(
        user_id=int(user_id),
        amount=amount,
        payment_method=payment_method,
        transaction_id=transaction_id,
        status="completed"
    )

    db.session.add(payment)
    db.session.commit()

    return jsonify({
        "message": "Payment recorded successfully",
        "payment": payment_to_dict(payment)
    }), 201


# Return the authenticated user’s payments in newest-first order.
def get_my_payments():
    user_id = get_jwt_identity()

    payments = Payment.query.filter_by(
        user_id=int(user_id)
    ).order_by(
        Payment.created_at.desc()
    ).all()

    return jsonify({
        "payments": [
            payment_to_dict(payment)
            for payment in payments
        ]
    }), 200
