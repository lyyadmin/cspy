"""cspy URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/1.11/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  url(r'^$', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  url(r'^$', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.conf.urls import url, include
    2. Add a URL to urlpatterns:  url(r'^blog/', include('blog.urls'))
"""
from django.conf.urls import url,include
from cs import views
urlpatterns = [
    url(r'^$', views.index),
    url(r'^admin/', include('cs.adminurl')),
    url(r'^hello/', views.hello),
    url(r'^getdatas$',views.getdatas),
    url(r'^history', views.history),
    url(r'^cache$', views.getCache),
    url(r'^set$', views.setValue),
    url(r'^get$', views.getValue),
    url(r'^collectdatas$', views.collectdatas),
    url(r'^savedatas?', views.save),
    url(r'^test$', views.test),
]
