import os
from flask_admin.contrib.sqla import ModelView
from flask_admin import form
from flask import Markup
from app.models import News, Event, AcademicPlan, Article
from flask_ckeditor import CKEditorField
from wtforms.fields.html5 import DateField

file_path = os.path.abspath(os.path.dirname(__name__))


def name_gen_image(model, file_data):
    hash_name = f'{model.id}'
    return hash_name


class NewsView(ModelView):
    column_labels = {
        'id': 'ID',
        'title': 'Заголовок',
        'text': 'Содержание',
        'date': 'Дата',
        'link': 'Ссылка',
        'author': 'Автор',
        'img': 'Фото',
    }

    # поля формы создания и редактирования
    form_columns = ('title', 'text', 'date', 'author', 'link', 'img_load')

    # поля вывода
    column_list = ('title', 'text', 'date', 'author', 'link', 'img')

    column_editable_list = ('title', 'date', 'author')
    column_default_sort = ('date', True)
    column_descriptions = dict(link='Ссылка на сторонний ресурс')
    column_filters = ['date']
    column_searchable_list = ['title', 'author']

    export_max_rows = 500
    export_types = ['csv']
    form_widget_args = {
        'date': {
            'style': 'max-width: 200px;'
        },
    }

    # дополнительная настройка полей
    form_extra_fields = {
        'text': CKEditorField('Текст'),
        'date': DateField('Дата'),
        "img_load": form.ImageUploadField(
            'Фото',
            base_path=os.path.join(
                file_path,
                f'app/static/{News.PATH}'),
            url_relative_path=News.PATH,
            namegen=name_gen_image,
            allowed_extensions=['jpg', 'bmp', 'gif'],
            max_size=(1200, 780, True),
        )
    }

    def _list_thumbnail(self, context, model, name):
        return Markup(f'<img src="{model.img_url}" width="100">')

    column_formatters = {
        'img': _list_thumbnail
    }

    create_template = 'admin/news_create.html'
    edit_template = 'admin/news_edit.html'


class EventView(ModelView):
    column_labels = {
        'id': 'ID',
        'title': 'Заголовок',
        'text': 'Содержание',
        'start_date': 'Дата начала',
        'end_date': 'Дата окончания',
        'address': 'Адрес',
        'link': 'Ссылка',
        'img': 'Фото',
    }

    # поля формы создания и редактирования
    form_columns = ('title', 'text', 'start_date', 'end_date', 'address',
                    'link', 'img_load')

    # поля вывода
    column_list = ('title', 'text', 'start_date', 'end_date', 'address',
                   'link', 'img')

    column_editable_list = ('title', 'start_date', 'end_date', 'address')
    column_default_sort = ('start_date', True)
    column_descriptions = dict(link='Ссылка на сторонний ресурс')
    column_filters = ['start_date', 'end_date']
    column_searchable_list = ['title']

    export_max_rows = 500
    export_types = ['csv']
    form_widget_args = {
        'start_date': {
            'style': 'max-width: 200px;'
        },
        'end_date': {
            'style': 'max-width: 200px;'
        },
    }

    # дополнительная настройка полей
    form_extra_fields = {
        'text': CKEditorField('Текст'),
        'start_date': DateField('Дата'),
        'end_date': DateField('Дата'),
        "img_load": form.ImageUploadField(
            'Фото',
            base_path=os.path.join(
                file_path,
                f'app/static/{Event.PATH}'),
            url_relative_path=Event.PATH,
            namegen=name_gen_image,
            allowed_extensions=['jpg', 'bmp', 'gif'],
            max_size=(1200, 780, True),
        )
    }

    def _list_thumbnail(self, context, model, name):
        return Markup(f'<img src="{model.img_url}" width="100">')

    column_formatters = {
        'img': _list_thumbnail
    }

    create_template = 'admin/event_create.html'
    edit_template = 'admin/event_edit.html'


class TextView(ModelView):
    column_labels = {
        'id': 'ID',
        'title': 'Заголовок',
        'text': 'Содержание',
    }

    # поля формы создания и редактирования
    form_columns = ('title', 'text')

    # поля вывода
    column_list = ('title', 'text')

    column_editable_list = ['title']
    column_filters = ['title']
    column_searchable_list = ['title']

    export_max_rows = 500
    export_types = ['csv']

    # дополнительная настройка полей
    form_extra_fields = {
        'text': CKEditorField('Текст'),
    }

    create_template = 'admin/text_create.html'
    edit_template = 'admin/text_edit.html'


class PlanView(ModelView):
    column_labels = {
        'id': 'ID',
        'course_id': 'Курс',
        'semester': 'Семестр',
        'img': 'Фото',
    }

    # поля формы создания и редактирования
    form_columns = ('course_id', 'semester', 'img_load')

    # поля вывода
    column_list = ('course_id', 'semester', 'img')
    column_default_sort = ('course_id', False)
    column_filters = ['course_id', 'semester']
    column_searchable_list = ['course_id']

    can_create = False
    export_max_rows = 500
    export_types = ['csv']

    # дополнительная настройка полей
    form_extra_fields = {
        "img_load": form.ImageUploadField(
            'Фото',
            base_path=os.path.join(
                file_path,
                f'app/static/{AcademicPlan.PATH}'),
            url_relative_path=AcademicPlan.PATH,
            namegen=name_gen_image,
            allowed_extensions=['jpg', 'bmp', 'gif'],
            max_size=(1200, 780, True),
        )
    }

    form_widget_args = {
        'course_id': {
            'readonly': True
        },
        'semester': {
            'readonly': True
        },
    }

    def _list_thumbnail(self, context, model, name):
        return Markup(f'<img src="{model.img_url}" width="100">')

    column_formatters = {
        'img': _list_thumbnail
    }

    create_template = 'admin/plan.html'
    edit_template = 'admin/plan.html'


class ArticleView(ModelView):
    column_labels = {
        'id': 'ID',
        'title': 'Заголовок',
        'text': 'Содержание',
        'link': 'Ссылка',
        'author': 'Автор',
        'img': 'Фото',
    }

    # поля формы создания и редактирования
    form_columns = ('title', 'text', 'author', 'link', 'img_load')

    # поля вывода
    column_list = ('title', 'text', 'author', 'link', 'img')

    column_editable_list = ('title', 'author')
    column_descriptions = dict(link='Ссылка на сторонний ресурс')
    column_searchable_list = ['title', 'author']

    export_max_rows = 500
    export_types = ['csv']

    # дополнительная настройка полей
    form_extra_fields = {
        'text': CKEditorField('Текст'),
        "img_load": form.ImageUploadField(
            'Фото',
            base_path=os.path.join(
                file_path,
                f'app/static/{Article.PATH}'),
            url_relative_path=Article.PATH,
            namegen=name_gen_image,
            allowed_extensions=['jpg', 'bmp', 'gif'],
            max_size=(1200, 780, True),
        )
    }

    def _list_thumbnail(self, context, model, name):
        return Markup(f'<img src="{model.img_url}" width="100">')

    column_formatters = {
        'img': _list_thumbnail
    }

    create_template = 'admin/article_create.html'
    edit_template = 'admin/article_edit.html'
