from .models import *
from rest_framework import status, response
from rest_framework.decorators import api_view

# Create your views here.
@api_view(["GET"])
def getMajor(request):

    majors = Major.objects.all().order_by("-id")
    return response.Response([major.serialize() for major in majors], status=status.HTTP_200_OK)

@api_view(["GET"])
def getItems(request):

    items = Item.objects.all()
    return response.Response([item.serialize() for item in items], status=status.HTTP_200_OK)


@api_view(["GET"])
def getMajorCateData(request, name):
    try:

        major = Major.objects.get(name = name.title())
        return response.Response({"category":[minor.serialize() for minor in major.minor_set.all()],
                                  "items": [item.serialize() for item in major.item_set.all()]}, status=status.HTTP_200_OK)
    except Major.DoesNotExist:
        return response.Response("Category Not available", status=status.HTTP_404_NOT_FOUND)

@api_view(["GET"])
def getMinorCatItem(request, major, minor):
    try:
        major = Major.objects.get(name = major.title())
        minor = Minor.objects.get(name = minor.title(), category = major)

        items = Item.objects.filter(major = major, minor = minor)
        return response.Response([item.serialize() for item in items], status=status.HTTP_200_OK)
    except:
        return response.Response("Query Not available", status=status.HTTP_404_NOT_FOUND)

@api_view(["GET"])
def getItem(requeat, id):
    try:
        item = Item.objects.get(id = id)
        return response.Response(item.serialize(), status=status.HTTP_200_OK)
    
    except Item.DoesNotExist:
        return response.Response("Item Not available", status=status.HTTP_404_NOT_FOUND)
    
    except:
        return response.Response("Item Not available", status=status.HTTP_404_NOT_FOUND)

@api_view(["GET"])
def getCart(request, id):
    try:
        cart = Cart.objects.get(id = id)

        return response.Response(cart.serialize(), status=status.HTTP_200_OK)
    
    except Cart.DoesNotExist:
        return response.Response("Query Not available", status=status.HTTP_404_NOT_FOUND)


@api_view(["POST"])
def addToCart(request, item_id, cart_id=None):
    try:
        # Check if the item exists
        item = Item.objects.get(id=item_id)

        # Create an order item
        order_item = OrderItem.objects.create(item=item)

    except Item.DoesNotExist:
        return response.Response("Item not found", status=status.HTTP_404_NOT_FOUND)

    # Check if cart_id is provided
    if cart_id:
        try:
            # Try to get the existing cart
            cart = Cart.objects.get(id=cart_id)
        except Cart.DoesNotExist:
            # If cart_id is provided but does not exist, return an error response
            return response.Response("Cart not found", status=status.HTTP_404_NOT_FOUND)

    else:
        # If cart_id is not provided, create a new cart
        cart = Cart.objects.create()

    # Add the order item to the cart
    cart.orderitem_set.add(order_item)

    response_data = {
            "cart": cart.serialize(),
            "orderitems": [item.serialize() for item in cart.orderitem_set.all()],
            "itemId": [item.item.id for item in cart.orderitem_set.all()]
        }

    return response.Response(response_data, status=status.HTTP_201_CREATED)



@api_view(["GET"])
def getCart(request, id):
    try:
        cart = Cart.objects.get(pk = id)
        orderitems = cart.orderitem_set.all()

        response_data = {
            "cart": cart.serialize(),
            "orderitems": [item.serialize() for item in orderitems],
            "itemId": [item.item.id for item in orderitems]
        }

        return response.Response(response_data, status=status.HTTP_200_OK)

    except Cart.DoesNotExist:
        return response.Response("Cart not found", status=status.HTTP_404_NOT_FOUND)

@api_view(["POST"])
def removeFromCart(request, item_id, cart_id):
    try:
        cart = Cart.objects.get(id = cart_id)
        item = Item.objects.get(id = item_id)
        cart.orderitem_set.filter(item = item).delete()
        if cart.total() == 0:
            cart.delete()
            return response.Response("Cart deleted", status=status.HTTP_200_OK)
        response_data = {
            "cart": cart.serialize(),
            "orderitems": [item.serialize() for item in cart.orderitem_set.all()],
            "itemId": [item.item.id for item in cart.orderitem_set.all()]
        }
        return response.Response(response_data, status=status.HTTP_202_ACCEPTED)
        
    except Cart.DoesNotExist:
        return response.Response("Query Not Found", status=status.HTTP_404_NOT_FOUND)
    except Item.DoesNotExist:
        return response.Response("Query Not Found", status=status.HTTP_404_NOT_FOUND)