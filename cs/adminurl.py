from django.conf.urls import url
from cs import views
urlpatterns = [
    url(r'^$', views.admin),
    url(r'.*?', views.admin_html),
]