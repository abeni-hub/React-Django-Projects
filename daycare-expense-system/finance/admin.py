from django.contrib import admin
from .models import Account, Category, Invoice, ExpenseItem, Income


class ExpenseItemInline(admin.TabularInline):
    model = ExpenseItem
    extra = 1


class InvoiceAdmin(admin.ModelAdmin):
    inlines = [ExpenseItemInline]


admin.site.register(Account)
admin.site.register(Category)
admin.site.register(Income)
admin.site.register(Invoice, InvoiceAdmin)
