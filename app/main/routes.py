from app.main import api
from app.main import resources

api.add_resource(resources.NewsResource, '/news')
api.add_resource(resources.NewsListResource, '/all_news')
api.add_resource(resources.EventResource, '/event')
api.add_resource(resources.EventListResource, '/events')
api.add_resource(resources.PlanListResource, '/plans')
