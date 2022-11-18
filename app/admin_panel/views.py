import os
from flask_admin.contrib.sqla import ModelView
from flask_admin import form
from flask import Markup
from app.models import News
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

    create_template = 'admin/news.html'
    edit_template = 'admin/news.html'
