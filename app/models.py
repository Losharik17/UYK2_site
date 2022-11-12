import os
from datetime import datetime
from enum import unique
from time import time
from flask import current_app
from sqlalchemy import event, DDL
from flask_sqlalchemy import BaseQuery
from app import db
# from flask_login import UserMixin, login_required
# from app import login, admin
from flask_admin import BaseView, expose, AdminIndexView
from flask_admin.contrib.sqla import ModelView

# class Administrator(UserMixin, db.Model):
#     id = db.Column(db.Integer, primary_key=True, index=True, unique=True)
#     name = db.Column(db.String(128))
#     email = db.Column(db.String(128))
#     password = db.Column(db.String(64))
#
#     def check_password(self, password):
#         return self.password == password
#
#
# @login.user_loader
# def load_user(id):
#     return Administrator.query.get(int(id))
#
# class AdministratorView(ModelView):
#     can_edit = False
#     can_delete = False
#     can_create = False
#     column_exclude_list = ['password']


class News(db.Model):
    PATH = 'app/static/images/news/'
    id = db.Column(db.Integer, primary_key=True, index=True)
    title = db.Column(db.String(255))
    @property
    def img_url(self):
        """Возвращает url для изображения"""
        path = os.path.join(self.PATH, f'{self.id}.jpg')
        if os.path.isfile(path):
            return f'{self.PATH[:3]}{self.id}.jpg'
        return f'{self.PATH[:3]}0.jpg'  # стандартное фот
    def save_img(self, img):
        """Сохраняет фото для новости"""
        path = os.path.join(self.PATH, f'{self.id}.jpg')
        img.save(path)
    def delete_img(self):
        """Удаляет фото для новости"""
        path = os.path.join(self.PATH, f'{self.id}.jpg')
        if os.path.isfile(path):
            os.remove(path)
    def change_img(self, img):
        """Изменяет фото для новости"""
        self.save_img(img)
        # path = os.path.join(self.PATH, f'{self.id}.jpg')
        # img.save(path)