import datetime as dt
from math import ceil
from sqlalchemy import or_
from flask import jsonify, make_response
from flask_restful import Resource, reqparse
from app.models import News, Event, AcademicPlan, Article, Course, Text


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
    SORT_KEY: str = None
    PAGE_SIZE: int = 10
    ONLY_ACTUAL = False
    PARSER = reqparse.RequestParser()

    def get(self):
        try:
            self.PARSER.add_argument('page_number', type=int,
                                     default=1, location='args')
            try:
                args = self.PARSER.parse_args()
                page_number = args['page_number']
            except:
                page_number = 1

            rows = self.MODEL.query
            if self.ONLY_ACTUAL:
                rows = self.get_actual(rows)
            if self.SORT_KEY:
                rows = rows.order_by(self.MODEL.__dict__[f'{self.SORT_KEY}'])

            number_pages = self.get_number_pages(rows)
            rows = rows.limit(self.PAGE_SIZE)[(page_number - 1)
                                              * self.PAGE_SIZE:]

            return jsonify(dict(number_pages=number_pages,
                                array=rows))
        except:
            return make_response(jsonify({'message': 'server error'}), 500)

    def get_actual(self, rows):
        pass

    def get_number_pages(self, rows):
        return ceil(rows.count() / 6)


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
    ONLY_ACTUAL = True

    def get_actual(self, events):
        return events.filter(or_(self.MODEL.start_date >= dt.datetime.now(),
                                 self.MODEL.end_date >= dt.datetime.now()))


class ArticleResource(TemplateResource):
    MODEL = Article


class PlanListResource(TemplateListResource):
    MODEL = Course
    SORT_KEY = 'id'
    PAGE_SIZE = 6


class ArticleListResource(TemplateListResource):
    MODEL = Article
    SORT_KEY = 'id'
    PAGE_SIZE = 4


class TextResource(Resource):
    def get(self, name):
        row = Text.query.filter_by(invisible_title=name).first_or_404()
        return jsonify(row)
