import os
import datetime as dt
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
class ImageFunctions:
    def save_img(self, img):
        """Сохраняет изображение"""
        path = os.path.join(self.PATH, f'{self.id}.jpg')
        img.save(path)

    def delete_img(self):
        """Удаляет изображение"""
        path = os.path.join(self.PATH, f'{self.id}.jpg')
        if os.path.isfile(path):
            os.remove(path)

    def change_img(self, img):
        """Изменяет изображение"""
        self.save_img(img)

    @property
    def img_url(self):
        """Возвращает url для изображения"""
        path = os.path.join(self.PATH, f'{self.id}.jpg')
        if os.path.isfile(path):
            return f'{self.PATH[:3]}{self.id}.jpg'
        return f'{self.PATH[:3]}0.jpg'  # стандартное фот


class News(db.Model, ImageFunctions):
    PATH = 'app/static/images/news/'

    id = db.Column(db.Integer, primary_key=True, index=True)
    title = db.Column(db.String(255))
    text = db.Column(db.Text)
    date = db.Column(db.Date)
    link = db.Column(db.String(4095))


class Event(db.Model, ImageFunctions):
    PATH = 'app/static/images/events/'

    id = db.Column(db.Integer, primary_key=True, index=True)
    title = db.Column(db.String(255))
    text = db.Column(db.Text)
    start_date = db.Column(db.Date)
    end_date = db.Column(db.Date)
    address = db.Column(db.String(255))
    link = db.Column(db.String(4095))
