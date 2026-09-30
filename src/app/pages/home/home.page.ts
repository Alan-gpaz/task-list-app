import { Component,OnInit } from '@angular/core';
import { IonHeader, IonToolbar, IonTitle, IonContent, IonItem, IonInput,IonButton,IonIcon, } from '@ionic/angular';
import { addIcons } from 'ionicons';
import {addOutline} from 'ionicons/icons'
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  imports: [IonHeader, 
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
  public tasks: string[]= []
  public task : string = ""
  constructor() {
    addIcons({
      addOutline
    })
  
  }

  addTask() {
    console.log(this.task)
    this.tasks.push(this.task);
    console.log(this.tasks)
    this.task= '';
  }
}
