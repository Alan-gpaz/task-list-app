import { Component,inject,OnInit } from '@angular/core';
import { IonHeader, IonToolbar, IonTitle, IonContent, IonItem, IonInput,IonButton,IonIcon, } from '@ionic/angular';
import { addIcons } from 'ionicons';
import {addOutline} from 'ionicons/icons'
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonList, IonLabel } from "@ionic/angular";
import { Alert } from '../../services/alert';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  imports: [IonLabel, IonList, IonHeader, 
    IonToolbar,
     IonTitle,
      IonContent,
       IonItem,
       IonInput,
       IonButton,
       IonIcon,
      CommonModule,
    FormsModule],
})
export class HomePage  {
  private  alertService: Alert= inject(Alert);
  public tasks: string[]= [
  //"COMPRAR PAN",
 // "COMPRAR LECHE",
 // "COMPRAR HUEVOS"
  ]
  public task : string = ""
  constructor() {
    addIcons({
      addOutline
    })
  
  }

  addTask() {
    console.log('Variable:', this.task)
    if (!this.ifExistsTask(this.task)) {
    this.tasks.push(this.task);
    console.log('Array:' , this.tasks);
    this.task= '';
    this.alertService.alertMessage('Exito', 'La tarea se ha agregado correctamente');
  } else {
    console.log('La tarea ya existe en la lista');
    this.alertService.alertMessage('Error', 'La tarea ya existe en la lista');
  }
}

  private ifExistsTask(task: string) {
    //Utilizamos el metodo fin para buscar la tarea en el array de tareas
    //Comparamos la tarea que queremos agregar, con las tareas existentes:to
    //toUpperCase() Convierte el texto a mayusculas
    //trim() Elimina los espacios en blanco al inicio y al final de la cadena
    return this.tasks.find((item:string) => task.toUpperCase().trim() === item.toUpperCase().trim());
  }
}
