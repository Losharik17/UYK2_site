import logging
from logging.handlers import SMTPHandler, RotatingFileHandler
import os

import flask_admin
from flask import Flask, request, current_app
from flask_json import FlaskJSON
from flask_sqlalchemy import SQLAlchemy
from flask_migrate import Migrate
from flask_mail import Mail
from flask_moment import Moment
from config import Config
from flask_login import LoginManager, login_required
from flask_ckeditor import CKEditor
from flask_principal import Principal
from flask_admin import Admin

db = SQLAlchemy()
migrate = Migrate()
mail = Mail()
moment = Moment()
json = FlaskJSON()
ckeditor = CKEditor()
login = LoginManager()
principal = Principal()
admin = Admin()
# login.login_view = 'auth.login'
# login.login_message = 'Пожалуйста, авторизируйтесь для доступа к данной странице.'
# login.login_message_category = 'warning'

def create_app(config_class=Config):
    app = Flask(__name__, static_url_path='/app/static',
                template_folder='templates',
                static_folder='static')

    app.config.from_object(config_class)
    db.init_app(app)
    migrate.init_app(app, db, render_as_batch=True)
    mail.init_app(app)
    moment.init_app(app)
    json.init_app(app)
    ckeditor.init_app(app)
    login.init_app(app)
    principal.init_app(app)
    admin.init_app(app, index_view=MyView())

    from app.errors import bp as errors_bp
    app.register_blueprint(errors_bp)

    from app.main import bp as main_bp
    app.register_blueprint(main_bp)

    from app.admin_panel import bp as admin_panel_bp
    app.register_blueprint(admin_panel_bp, url_prefix='/admin_panel')

    from app.auth import bp as auth_bp
    app.register_blueprint(auth_bp, url_prefix='/auth')

    if not app.debug and not app.testing:
        if app.config['MAIL_SERVER']:
            auth = None
            if app.config['MAIL_USERNAME'] or app.config['MAIL_PASSWORD']:
                auth = (app.config['MAIL_USERNAME'],
                        app.config['MAIL_PASSWORD'])
            secure = None
            if app.config['MAIL_USE_TLS']:
                secure = ()
            mail_handler = SMTPHandler(
                mailhost=(app.config['MAIL_SERVER'], app.config['MAIL_PORT']),
                fromaddr='no-reply@' + app.config['MAIL_SERVER'],
                toaddrs=app.config['ADMINS'], subject='NSPT Rating Failure',
                credentials=auth, secure=secure)
            mail_handler.setLevel(logging.ERROR)
            app.logger.addHandler(mail_handler)

        if not os.path.exists('logs'):
            os.mkdir('logs')
        file_handler = RotatingFileHandler('logs/main.log',
                                           maxBytes=10240, backupCount=10)
        file_handler.setFormatter(logging.Formatter(
            '\n%(asctime)s %(levelname)s: %(message)s '
            '[in %(pathname)s:%(lineno)d]'))
        file_handler.setLevel(logging.INFO)
        app.logger.addHandler(file_handler)

        app.logger.setLevel(logging.INFO)
        app.logger.info('UYK2_site started')

    return app


from app import models
from app.admin_panel.routes import MyView