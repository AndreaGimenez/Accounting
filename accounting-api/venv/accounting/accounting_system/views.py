from django.shortcuts import render
from django.http import JsonResponse
from rest_framework import status
from rest_framework.views import APIView
from django.core.exceptions import ObjectDoesNotExist
import json
from functools import reduce
from .serializers import TransactionSerializer
from .models import Transaction
from .exceptions import InvalidOperation
# Create your views here.

class TransactionView(APIView):
    def get(self, request):
        transactions = Transaction.objects.order_by('-id').all()
        serializer = TransactionSerializer(transactions, many=True)
        return JsonResponse({'transactions' : serializer.data}, safe=False, status=status.HTTP_200_OK)

    def post(self, request):
        payload = json.loads(request.body)
        try:
            _validate_transaction(payload['amount'])
            transaction = Transaction.objects.create(
                amount = payload['amount']
            )
            serializer = TransactionSerializer(transaction)
            return JsonResponse({'transaction': serializer.data}, safe=False, status=status.HTTP_201_CREATED)
        except InvalidOperation as e:
            return JsonResponse({'error': str(e)}, safe=False, status=status.HTTP_400_BAD_REQUEST)
        except Exception as e:
            print(e)
            return JsonResponse({'error': 'Something went wrong'}, safe=False, status=status.HTTP_500_INTERNAL_SERVER_ERROR)



def _calculate_balance(historical_transactions):
    balance = 0
    for t in historical_transactions:
        balance  += t.amount
    return balance

def _validate_transaction(amount):
    historical_transactions = Transaction.objects.all()
    balance = _calculate_balance(historical_transactions)
    if (balance + amount) < 0 :
        raise InvalidOperation("INVALID_AMOUNT")
