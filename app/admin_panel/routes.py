from app.admin_panel.views import NewsView, EventView, TextView, PlanView, ArticleView
from app import admin, db
from app.models import News, Event, Text, AcademicPlan, Article


admin.add_view(NewsView(News, db.session, name='Новости'))
admin.add_view(EventView(Event, db.session, name='События'))
admin.add_view(TextView(Text, db.session, name='Текста'))
admin.add_view(PlanView(AcademicPlan, db.session, name='Отрезки'))
admin.add_view(ArticleView(Article, db.session, name='Статьи'))
