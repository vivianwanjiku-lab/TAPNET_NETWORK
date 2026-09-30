"""Backend implementation for packages."""

from flask import Blueprint
from flask_jwt_extended import jwt_required

from controllers.package_controller import (
    add_package,
    edit_package,
    get_packages,
    get_single_package,
    remove_package
)

from utils.validators import admin_required


packages_bp = Blueprint(
    "packages",
    __name__
)


@packages_bp.route(
    "/",
    methods=["GET"]
)
# Handle the packages operation.
def packages():
    return get_packages()


@packages_bp.route(
    "/<int:package_id>",
    methods=["GET"]
)
# Handle the package operation.
def package(package_id):
    return get_single_package(
        package_id
    )


@packages_bp.route(
    "/",
    methods=["POST"]
)
@jwt_required()
# Handle the create operation.
def create():
    access_check = admin_required()

    if access_check:
        return access_check

    return add_package()


@packages_bp.route(
    "/<int:package_id>",
    methods=["PUT"]
)
@jwt_required()
# Handle the update operation.
def update(package_id):
    access_check = admin_required()

    if access_check:
        return access_check

    return edit_package(
        package_id
    )


@packages_bp.route(
    "/<int:package_id>",
    methods=["DELETE"]
)
@jwt_required()
# Handle the delete operation.
def delete(package_id):
    access_check = admin_required()

    if access_check:
        return access_check

    return remove_package(
        package_id
    )
