import os
from dotenv import load_dotenv
basedir = os.path.abspath(os.path.dirname(__file__))
load_dotenv(os.path.join(basedir, '.env'))


class Config(object):
    SECRET_KEY = os.environ.get('SECRET_KEY') or 'you-will-never-guess'
    SQLALCHEMY_DATABASE_URI = os.environ.get('DATABASE_URL') or 'sqlite:///' + os.path.join(basedir, 'IUK2.db')
    SQLALCHEMY_TRACK_MODIFICATIONS = False
    LOG_TO_STDOUT = os.environ.get('LOG_TO_STDOUT')
    MAIL_SERVER = 'smtp.yandex.ru'
    MAIL_PORT = 465
    MAIL_USE_TLS = 0
    MAIL_USE_SSL = 1
    MAIL_USERNAME = ''
    MAIL_PASSWORD = ''
    ADMINS = ['eternal-programmers@yandex.ru']
    USER_PER_PAGE = 15
    UPLOAD_FOLDER = '/app/static/images'
    ALLOWED_EXTENSIONS = {'png', 'jpg', 'jpeg'}
    FLASK_ADMIN_SWATCH = 'cerulean'

