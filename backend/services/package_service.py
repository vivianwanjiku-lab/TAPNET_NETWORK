"""Implement package listing, lookup, creation, update, and deletion."""

from flask import jsonify, request

from extensions import db
from models.package import Package


# Convert a package model into the public API response shape.
def package_to_dict(package):
    return {
        "id": package.id,
        "name": package.name,
        "description": package.description,
        "price": package.price,
        "duration": package.duration,
        "speed": package.speed,
        "is_active": package.is_active
    }


# Return the package catalog.
def get_all_packages():
    packages = Package.query.all()

    return jsonify({
        "packages": [
            package_to_dict(package)
            for package in packages
        ]
    }), 200


# Look up one package and return a not-found response when absent.
def get_package(package_id):
    package = db.session.get(
        Package,
        package_id
    )

    if not package:
        return jsonify({
            "message": "Package not found"
        }), 404

    return jsonify({
        "package": package_to_dict(package)
    }), 200


# Validate package input and persist a new catalog entry.
def create_package():
    data = request.get_json()

    if not data:
        return jsonify({
            "message": "No data provided"
        }), 400

    name = data.get("name")
    description = data.get("description")
    price = data.get("price")
    duration = data.get("duration")
    speed = data.get("speed")

    if (
        not name
        or price is None
        or duration is None
        or not speed
    ):
        return jsonify({
            "message": (
                "Name, price, duration and speed "
                "are required"
            )
        }), 400

    package = Package(
        name=name,
        description=description,
        price=price,
        duration=duration,
        speed=speed
    )

    db.session.add(package)
    db.session.commit()

    return jsonify({
        "message": "Package created successfully",
        "package": package_to_dict(package)
    }), 201


# Apply supplied fields to an existing package and save the changes.
def update_package(package_id):
    package = db.session.get(
        Package,
        package_id
    )

    if not package:
        return jsonify({
            "message": "Package not found"
        }), 404

    data = request.get_json()

    if not data:
        return jsonify({
            "message": "No data provided"
        }), 400

    if "name" in data:
        package.name = data["name"]

    if "description" in data:
        package.description = data["description"]

    if "price" in data:
        package.price = data["price"]

    if "duration" in data:
        package.duration = data["duration"]

    if "speed" in data:
        package.speed = data["speed"]

    if "is_active" in data:
        package.is_active = data["is_active"]

    db.session.commit()

    return jsonify({
        "message": "Package updated successfully",
        "package": package_to_dict(package)
    }), 200


# Remove an existing package from the catalog.
def delete_package(package_id):
    package = db.session.get(
        Package,
        package_id
    )

    if not package:
        return jsonify({
            "message": "Package not found"
        }), 404

    db.session.delete(package)
    db.session.commit()

    return jsonify({
        "message": "Package deleted successfully"
    }), 200
