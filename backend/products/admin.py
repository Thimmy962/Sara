from django.contrib import admin
from .models import *
# Register your models here.
@admin.register(Major)
class MajorAdmin(admin.ModelAdmin):
    list_display = ("id", "name")
    search_fields = ("name",)


@admin.register(Minor)
class MinorAdmin(admin.ModelAdmin):
    list_display = ("id", "name", "category")
    search_fields = ("name", "category")

@admin.register(Item)
class ItemAdmin(admin.ModelAdmin):
    list_display = ("id", "name", "major", "minor", "price")
    search_fields = ("name", "price", "major", "minor", "name")

@admin.register(Cart)
class CartAdmin(admin.ModelAdmin):
    list_display = ("id","display_total")
    search_fields = ("name",)


    def display_total(self, obj):
        return obj.total()

    display_total.short_description = "Total"  # Set a short description for the column
    search_fields = ("id",)

admin.site.register(OrderItem)