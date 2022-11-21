import os
from dataclasses import dataclass
from app import db
from flask import url_for


@dataclass
class ImageFunctions:
    ADDRESS_URL = 'http://185.87.50.137:8080'
    PATH = None  # путь из папки static
    id = None  # id записи
    img_url: str  # относительный url
    full_img_url: str  # полный url

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
    def img_url(self) -> str:
        """Возвращает url для изображения"""
        relative_path = os.path.join(self.PATH, f'{self.id}.jpg')
        url_path = url_for('static', filename=relative_path)

        if os.path.isfile(os.path.join(os.getcwd(), 'app/', url_path[1:])):
            return url_path
        return url_for('static', filename=f'{self.PATH}0.jpg')

    @property
    def full_img_url(self) -> str:
        return f'{self.ADDRESS_URL}{self.img_url}'


@dataclass
class News(db.Model, ImageFunctions):
    PATH = 'images/news/'

    id: int = db.Column(db.Integer, primary_key=True, index=True)
    title: str = db.Column(db.String(256))
    text: str = db.Column(db.Text)
    date: str = db.Column(db.Date)
    link: str = db.Column(db.String(4096))
    author: str = db.Column(db.String(128))


@dataclass
class Event(db.Model, ImageFunctions):
    PATH = 'images/events/'

    id: int = db.Column(db.Integer, primary_key=True, index=True)
    title: str = db.Column(db.String(256))
    text: str = db.Column(db.Text)
    start_date: str = db.Column(db.Date)
    end_date: str = db.Column(db.Date)
    address: str = db.Column(db.String(256))
    link: str = db.Column(db.String(4096))


@dataclass
class Text(db.Model):
    id: int = db.Column(db.Integer, primary_key=True, index=True)
    title: str = db.Column(db.String(256))
    text: str = db.Column(db.Text)


@dataclass
class AcademicPlan(db.Model, ImageFunctions):
    PATH = 'images/academic_plans/'

    id: int = db.Column(db.Integer, primary_key=True, index=True)
    course: int = db.Column(db.Integer)
    semester: int = db.Column(db.Integer)


@dataclass
class Article(db.Model, ImageFunctions):
    PATH = 'images/articles/'

    id: int = db.Column(db.Integer, primary_key=True, index=True)
    title: str = db.Column(db.String(256))
    text: str = db.Column(db.Text)
    author: str = db.Column(db.String(128))
    link: str = db.Column(db.String(4096))
