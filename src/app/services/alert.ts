import { inject, Service } from '@angular/core';
import { AlertController } from '@ionic/angular';
// El decorador Service() marca la clase como un servicio que puede ser inyectado  en otros componentes o servicios
@Service()
export class Alert {
    // AllerController: Servicio propio de ionic que permite crear y controlar alertas
    private alertController: AlertController= inject(AlertController);
     async alertMessage(
    header: string, // Titulo de la alerta
    message: string, // Mensaje de la alerta
) {
    // Hace un await para crear 
    // la alerta con el header y el message
    const alert = await this.alertController.create({
      header,
      message,
      buttons: ['OK'],
    });
    // present() es un método que 
    // muestra la alerta en pantalla
    await alert.present();
  }}

