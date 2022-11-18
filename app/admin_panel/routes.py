from app.admin_panel.views import NewsView
from app import admin, db
from app.models import News


admin.add_view(NewsView(News, db.session, name='Новости'))
# admin.add_view(NewsPageView(name='Новости', endpoint='news'))
