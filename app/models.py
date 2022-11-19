import os
from dataclasses import dataclass, field
import datetime as dt
from app import db
from flask import url_for


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

        if os.path.isfile(os.path.join(os.getcwd(), 'app/', url_path[1:])):
            return url_path
        return url_for('static', filename=f'{self.PATH}0.jpg')


@dataclass
class News(db.Model, ImageFunctions):
    PATH = 'images/news/'

    id = db.Column(db.Integer, primary_key=True, index=True)
    title = db.Column(db.String(256))
    text = db.Column(db.Text)
    date = db.Column(db.Date)
    link = db.Column(db.String(4096))
    author = db.Column(db.String(128))

    id: int
    title: str
    text: str
    date: field(default_factory=dt.datetime.now)
    link: str
    author: str
    img_url: str


@dataclass
class Event(db.Model, ImageFunctions):
    PATH = 'images/events/'

    id = db.Column(db.Integer, primary_key=True, index=True)
    title = db.Column(db.String(256))
    text = db.Column(db.Text)
    start_date = db.Column(db.Date)
    end_date = db.Column(db.Date)
    address = db.Column(db.String(256))
    link = db.Column(db.String(4096))

    id: int
    title: str
    text: str
    start_date: field(default=None)
    end_date: field(default=None)
    address: str
    link: str
    img_url: str


@dataclass
class Text(db.Model):
    id = db.Column(db.Integer, primary_key=True, index=True)
    title = db.Column(db.String(256))
    text = db.Column(db.Text)

    id: int
    title: str
    text: str


@dataclass
class AcademicPlan(db.Model, ImageFunctions):
    PATH = 'images/academic_plans/'

    id = db.Column(db.Integer, primary_key=True, index=True)
    course = db.Column(db.Integer)
    semester = db.Column(db.Integer)

    id: int
    course: int
    semester: int
