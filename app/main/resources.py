from os import getcwd
import datetime as dt
from werkzeug.datastructures import FileStorage
from flask import jsonify, make_response, current_app
from flask_restful import Resource, reqparse
from flask_jwt_extended import jwt_required, get_jwt_identity
from app.models import News, Event
from app import db


class TemplateResource(Resource):
    MODEL = None  # какая-нибудь таблица из бд
    PARSER = reqparse.RequestParser()

    def get(self):
        self.PARSER.add_argument('id', type=int, required=True,
                                 location='args')
        try:
            args = self.PARSER.parse_args()
            id = args['id']
        except:
            return make_response(
                jsonify({'message': 'the `id` argument is not specified'}),
                406)

        row = self.MODEL.query.filter_by(id=id).first()
        return jsonify(row)


class TemplateListResource(Resource):
    MODEL = None  # какая-нибудь таблица из бд
    SORT_KEY: str = 'id'
    PAGE_SIZE: int = 10

    def __init__(self):
        self.parser = reqparse.RequestParser()

    def get(self):
        try:
            self.parser.add_argument('page_number', type=int,
                                     default=1, location='args')
            try:
                args = self.parser.parse_args()
                page_number = args['page_number']
            except:
                page_number = 1

            rows = self.MODEL.query
            if self.SORT_KEY:
                rows = rows.order_by(self.MODEL.__dict__[f'{self.SORT_KEY}'])
            rows = rows.limit(page_number * self.PAGE_SIZE)

            return jsonify(rows[(page_number - 1) * self.PAGE_SIZE:])
        except:
            return make_response(jsonify({'message': 'server error'}), 500)


class NewsResource(TemplateResource):
    MODEL = News


class NewsListResource(TemplateListResource):
    MODEL = News
    SORT_KEY = 'date'
    PAGE_SIZE = 6


class EventResource(TemplateResource):
    MODEL = Event


class EventListResource(TemplateListResource):
    MODEL = Event
    SORT_KEY = 'start_date'
    PAGE_SIZE = 8
