"""Backend implementation for package controller."""

from services.package_service import (
    create_package,
    delete_package,
    get_all_packages,
    get_package,
    update_package
)


# Handle the get packages operation.
def get_packages():
    return get_all_packages()


# Handle the get single package operation.
def get_single_package(package_id):
    return get_package(package_id)


# Handle the add package operation.
def add_package():
    return create_package()


# Handle the edit package operation.
def edit_package(package_id):
    return update_package(package_id)


# Handle the remove package operation.
def remove_package(package_id):
    return delete_package(package_id)
