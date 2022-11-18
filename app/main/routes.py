from flask import render_template, flash, redirect, url_for,\
    request, jsonify, current_app
from app.main import bp



@bp.route('/', methods=['GET'])
@bp.route('/main', methods=['GET'])
def main():
    return render_template('about.html')
