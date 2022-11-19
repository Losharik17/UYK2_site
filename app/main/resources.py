from os import getcwd
from werkzeug.datastructures import FileStorage
from flask import jsonify, make_response, current_app
from flask_restful import Resource, reqparse
from flask_jwt_extended import jwt_required, get_jwt_identity
from app.models import News, Event
from app import db


class TemplateResource(Resource):
    MODEL: type[db.Model] = News  # какая-нибудь таблица из бд
    PARSER = reqparse.RequestParser()

    def get(self):
        self.PARSER.add_argument('id', type=int, required=True)
        args = self.PARSER.parse_args()
        id = args['id']

        row = self.MODEL.query.filter_by(id=id).first()
        return jsonify(row)


class TemplateListResource(Resource):
    MODEL: type[db.Model] = News  # какая-нибудь таблица из бд
    SORT_KEY: str = 'id'
    PAGE_SIZE: int = 10

    def __init__(self):
        self.parser = reqparse.RequestParser()

    def get(self):
        try:
            self.parser.add_argument('page_number', type=int, default=1)
            args = self.parser.parse_args()
            page_number = args['page_number']
            print(page_number)

            rows = self.MODEL.query.order_by(
                self.MODEL.__dict__[f'{self.SORT_KEY}']).limit(
                page_number * self.PAGE_SIZE)
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
