from django.core.management.base import BaseCommand
from predicciones.ml.predictor import train_model

class Command(BaseCommand):
    help = 'Entrena el modelo de machine learning con los datos actuales.'

    def handle(self, *args, **options):
        result = train_model()
        if result:
            acc, val_acc = result
            self.stdout.write(self.style.SUCCESS(
                f'Modelo entrenado con éxito. Precisión: {acc:.2f} / Validación: {val_acc:.2f}'
            ))
        else:
            self.stdout.write(self.style.WARNING('No se pudo entrenar el modelo.'))
