import { Component, inject, ChangeDetectorRef } from '@angular/core';
import {
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonItem,
  IonInput,
  IonButton,
  IonIcon,
  IonItemSliding,
  IonItemOption,
  IonItemOptions,
  IonList,
  IonLabel,
  IonReorder,
  IonReorderGroup
} from '@ionic/angular';
import type { ItemReorderEventDetail } from '@ionic/angular';
import { addIcons } from 'ionicons';
import { addOutline, trashOutline } from 'ionicons/icons';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Alert } from '../../services/alert';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  imports: [
    IonLabel,
    IonList,
    IonHeader,
    IonToolbar,
    IonTitle,
    IonContent,
    IonItem,
    IonInput,
    IonButton,
    IonIcon,
    CommonModule,
    FormsModule,
    IonItemSliding,
    IonItemOptions,
    IonItemOption,
    IonReorder,
    IonReorderGroup
  ],
})
export class HomePage {
  private alertService: Alert = inject(Alert);
  private cdr = inject(ChangeDetectorRef);

  public tasks: string[] = [
    'COMPRAR PAN',
    'COMPRAR LECHE',
    'COMPRAR HUEVOS'
  ];

  public task: string = '';

  constructor() {
    addIcons({
      addOutline,
      trashOutline
    });
  }

  ngOnInit() {
    const savedTasks = localStorage.getItem('tasks');

    if (savedTasks !== null) {
      this.tasks = JSON.parse(savedTasks);
    }
  }

  addTask() {
    console.log('Variable:', this.task);

    if (!this.ifExistsTask(this.task)) {
      this.tasks.push(this.task);
      this.saveTasks();

      console.log('Array:', this.tasks);

      this.task = '';

      this.alertService.alertMessage(
        'Exito',
        'La tarea se ha agregado correctamente'
      );
    } else {
      console.log('La tarea ya existe en la lista');

      this.alertService.alertMessage(
        'Error',
        'La tarea ya existe en la lista'
      );
    }
  }

  private ifExistsTask(task: string) {
    //Utilizamos el metodo fin para buscar la tarea en el array de tareas
    //Comparamos la tarea que queremos agregar, con las tareas existentes:to
    //toUpperCase() Convierte el texto a mayusculas
    //trim() Elimina los espacios en blanco al inicio y al final de la cadena
    return this.tasks.find(
      (item: string) =>
        task.toUpperCase().trim() === item.toUpperCase().trim()
    );
  }

  confirmDeleteTask(task: string) {
    this.alertService.alertConfirm(
      'Confirmar eliminación',
      'Eliminar tarea',
      '¿Estás seguro de que deseas eliminar esta tarea?',
      'Eliminar',
      () => this.deleteTask(task)
    );
  }

  private deleteTask(task: string) {
    console.log('La tarea a eliminar es:', task);

    const index = this.tasks.findIndex(
      (item: string) =>
        item.toLowerCase().trim() === task.toLowerCase().trim()
    );

    console.log(
      task,
      'La tarea a eliminar esta en el indice:',
      index
    );

    if (index != -1) {
      this.tasks.splice(index, 1);
      this.saveTasks();
      this.cdr.markForCheck();
    }
  }

  orderTasks(event: CustomEvent<ItemReorderEventDetail>) {
    console.log(event);
    console.log('Antes de Ordenar: ', this.tasks);

    this.tasks = event.detail.complete(this.tasks);

    console.log('Despues de Ordenar: ', this.tasks);
    this.saveTasks();
  }

  saveTasks() {
    localStorage.setItem('tasks', JSON.stringify(this.tasks));
  }
}