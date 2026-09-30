"""Implement account registration and login operations."""

from flask import jsonify, request
from flask_jwt_extended import create_access_token
from werkzeug.security import (
    check_password_hash,
    generate_password_hash
)

from extensions import db
from models.user import User


# Validate submitted details, prevent duplicates, and save a hashed password.
def register():
    data = request.get_json()

    if not data:
        return jsonify({
            "message": "No data provided"
        }), 400

    name = data.get("name")
    email = data.get("email")
    phone = data.get("phone")
    password = data.get("password")

    if not name or not email or not phone or not password:
        return jsonify({
            "message": "Name, email, phone and password are required"
        }), 400

    existing_email = User.query.filter_by(
        email=email
    ).first()

    if existing_email:
        return jsonify({
            "message": "Email is already registered"
        }), 409

    existing_phone = User.query.filter_by(
        phone=phone
    ).first()

    if existing_phone:
        return jsonify({
            "message": "Phone number is already registered"
        }), 409

    hashed_password = generate_password_hash(
        password
    )

    user = User(
        name=name,
        email=email,
        phone=phone,
        password=hashed_password,
        role="customer"
    )

    db.session.add(user)
    db.session.commit()

    return jsonify({
        "message": "User registered successfully",
        "user": {
            "id": user.id,
            "name": user.name,
            "email": user.email,
            "phone": user.phone,
            "role": user.role
        }
    }), 201


# Verify account credentials and return a signed access token on success.
def login():
    data = request.get_json()

    if not data:
        return jsonify({
            "message": "No data provided"
        }), 400

    email = data.get("email")
    password = data.get("password")

    if not email or not password:
        return jsonify({
            "message": "Email and password are required"
        }), 400

    user = User.query.filter_by(
        email=email
    ).first()

    if not user:
        return jsonify({
            "message": "Invalid email or password"
        }), 401

    if not check_password_hash(
        user.password,
        password
    ):
        return jsonify({
            "message": "Invalid email or password"
        }), 401

    access_token = create_access_token(
        identity=str(user.id)
    )

    return jsonify({
        "message": "Login successful",
        "access_token": access_token,
        "user": {
            "id": user.id,
            "name": user.name,
            "email": user.email,
            "phone": user.phone,
            "role": user.role
        }
    }), 200
