from flask import render_template, flash, redirect, url_for, request, jsonify, current_app, g, Flask
from flask_login import current_user, login_required, LoginManager, login_user, logout_user, login_manager
from flask_principal import Principal, Permission, RoleNeed, Identity, identity_changed, identity_loaded, \
    AnonymousIdentity, ActionNeed
from app.main import bp
from app import db, login, principal
import os, datetime, time
from sqlalchemy import create_engine
from app.models import Administrator
from flask_ckeditor import CKEditor
import shutil
from werkzeug.urls import url_parse

# Needs
be_admin = RoleNeed('admin')

# Permissions
administrator = Permission(be_admin)
administrator.description = "Admin’s permissions"

apps_needs = [be_admin]
apps_permissions = [administrator]


@principal.identity_loader
def load_identity_when_session_expires():
    if hasattr(current_user, 'id'):
        return Identity(current_user.id)


@identity_loaded.connect
def on_identity_loaded(sender, identity):
    needs = []
    administrator = Administrator.query.filter_by(email=identity.id).first()
    if administrator:
        needs.append(be_admin)

    for n in needs:
        g.identity.provides.add(n)

engine = create_engine("sqlite:///IUK2.db")


@bp.route('/', methods=['GET'])
@bp.route('/main', methods=['GET'])
def main():
    return render_template('about.html')