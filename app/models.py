import os
from app import db
from flask import url_for, Markup
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
#
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
        relative_path = os.path.join(self.PATH, f'{self.id}.jpg')
        url_path = url_for('static', filename=relative_path)

        if os.path.isfile(os.path.join(os.getcwd(), url_path[1:])):
            return url_path

        return url_for('static', filename=f'{self.PATH}0.jpg')  # стандартное фото


class News(db.Model, ImageFunctions):
    PATH = 'images/news/'

    id = db.Column(db.Integer, primary_key=True, index=True)
    title = db.Column(db.String(256))
    text = db.Column(db.Text)
    date = db.Column(db.Date)
    link = db.Column(db.String(4096))
    author = db.Column(db.String(128))


class Event(db.Model, ImageFunctions):
    PATH = 'images/events/'

    id = db.Column(db.Integer, primary_key=True, index=True)
    title = db.Column(db.String(256))
    text = db.Column(db.Text)
    start_date = db.Column(db.Date)
    end_date = db.Column(db.Date)
    address = db.Column(db.String(256))
    link = db.Column(db.String(4096))


class Text(db.Model):
    id = db.Column(db.Integer, primary_key=True, index=True)
    title = db.Column(db.String(256))
    text = db.Column(db.Text)


class AcademicPlan(db.Model, ImageFunctions):
    PATH = 'images/academic_plan/'

    id = db.Column(db.Integer, primary_key=True, index=True)
    course = db.Column(db.Integer)
    semester = db.Column(db.Integer)
