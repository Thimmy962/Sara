from django.urls import path
from .views import *

urlpatterns = [
    path("getmajor/", getMajor),
    path("getitems/", getItems),
    path("getmajorcatdata/<str:name>/", getMajorCateData),
    path("getminoritems/<str:major>/<str:minor>/", getMinorCatItem),
    path("getitem/<str:id>/", getItem),
    path("getcart/<str:id>/", getCart),
    path("addtocart1/<str:item_id>/", addToCart),
    path("addtocart2/<str:item_id>/<str:cart_id>/", addToCart),
    path("getcart/<str:id>/", getCart),
    path("removefromcart/<str:item_id>/<str:cart_id>/", removeFromCart),
]