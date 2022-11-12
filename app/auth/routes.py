from flask import render_template, redirect, url_for, flash, request, Flask, g, current_app
from werkzeug.urls import url_parse
# from flask_login import login_user, logout_user, current_user
# from flask_principal import Principal, Permission, RoleNeed, Identity, identity_changed, identity_loaded, AnonymousIdentity, ActionNeed
# from app import db, login
from app.auth import bp
# from app.models import Administrator
import app

#
# @bp.route('/', methods=['GET', 'POST'])
# @bp.route('/login', methods=['GET', 'POST'])
# def login():
#     if current_user.is_authenticated:
#         return redirect(url_for('main.main'))
#
#     if request.method == 'POST':
#         form = request.form
#         user = Administrator.query.filter_by(email=form.get('email').lower()).first()
#
#         if user is None or not user.check_password(int(form.get('password'))):
#             flash('Неверный пароль или пароль', 'warning')
#             return redirect(url_for('auth.login'))
#
#         identity_changed.send(current_app._get_current_object(), identity=Identity(user.email))
#         login_user(user)
#         next_page = request.args.get('next')
#         if not next_page or url_parse(next_page).netloc != '':
#             next_page = url_for('main.main')
#         return redirect(next_page)
#     return render_template('auth/login.html', title='Авторизация')
#
#
# @bp.route('/logout')
# def logout():
#     logout_user()
#     identity_changed.send(current_app._get_current_object(), identity=AnonymousIdentity())
#     return redirect(url_for('main.main'))
