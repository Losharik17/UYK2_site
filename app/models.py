from datetime import datetime
from enum import unique
from time import time
from flask import current_app
from sqlalchemy import event, DDL
from flask_sqlalchemy import BaseQuery
from app import db
from flask_login import UserMixin, login_required
from app import login, admin
from flask_admin import BaseView, expose, AdminIndexView
from flask_admin.contrib.sqla import ModelView

class Administrator(UserMixin, db.Model):
    id = db.Column(db.Integer, primary_key=True, index=True, unique=True)
    name = db.Column(db.String(128))
    email = db.Column(db.String(128))
    password = db.Column(db.String(64))

    def check_password(self, password):
        return self.password == password


@login.user_loader
def load_user(id):
    return Administrator.query.get(int(id))

class AdministratorView(ModelView):
    can_edit = False
    can_delete = False
    can_create = False
    column_exclude_list = ['password']