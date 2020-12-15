import time

from django.db import connections
from django.db.utils import OperationalError
from django.core.management.base import BaseCommand

class Command(BaseCommand):
    """
    Django command to pause the execution until db is available
    """
    def handle(self, *args, **options):
        db_conn = None
        while not db_conn:
            try:
                db_conn = connections['default']
            except OperationalError:
                time.sleep(1)
