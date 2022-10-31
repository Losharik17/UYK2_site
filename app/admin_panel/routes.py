from flask import render_template, flash, redirect, url_for, request, jsonify, current_app, g
from typing import List
from app.main import bp
import os, datetime, time
from app.models import *
from flask_admin.contrib.sqla import ModelView
from app.main.routes import administrator
# from app.main.functions import *
from sqlalchemy import create_engine
from flask_ckeditor import CKEditor
import shutil
from flask_admin.contrib.fileadmin import FileAdmin

admin.add_view(FileAdmin('app/static/', name='Static Files'))
admin.add_view(AdministratorView(Administrator, db.session))

class MyView(AdminIndexView):
    @administrator.require(http_exception=403)
    @expose('/')
    def index(self):
        return self.render('admin/index.html')
