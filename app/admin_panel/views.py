from flask_admin.contrib.sqla import ModelView
from flask_admin import expose, BaseView, AdminIndexView
from wtforms import validators


class NewsView(ModelView):
    column_labels = {
        'id': 'ID',
        'title': 'Заголовок',
        'text': 'Содержание',
        'date': 'Дата',
        'link': 'Ссылка',
        'author': 'Автор',
    }

    column_list = ['title', 'text', 'date', 'author', 'link']
    column_editable_list = ['title', 'text', 'date', 'author', 'link']
    column_default_sort = ('date', True)
    column_descriptions = dict(link='Ссылка на сторонний ресурс')
    column_filters = ['date']

    create_modal = True
    edit_modal = True

    can_create = True
    can_edit = True
    can_delete = True
    can_export = True
    export_max_rows = 500
    export_types = ['csv']

    # form_args = {
    #     'username': dict(label='ЮЗЕР', validators=[validators.DataRequired()]),
    #     'email': dict(label='МЫЛО', validators=[validators.Email()]),
    #     'password': dict(label='ПАРОЛЬ', validators=[validators.DataRequired()]),
    # }
