import { Medication } from './../models/medication.model';
import { Component } from '@angular/core';
import { IonHeader, IonToolbar, IonTitle, IonContent, IonLabel, IonItem, IonList, IonButton, IonIcon } from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { addOutline } from 'ionicons/icons';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  imports: [IonHeader, IonToolbar, IonTitle, IonContent, IonLabel, IonItem, IonList, IonButton, IonIcon],
})
export class HomePage {

  medications: Medication[] = [
    { name: 'Aspirin', dosage: '100mg', time: '08:00', },
    { name: 'Vitamin D', dosage: '1000 IU', time: '09:00' },
    { name: 'Ibuprofen', dosage: '200mg', time: '20:00' }
  ];

  addMedication() {
      this.medications.push(
        { name: 'New Medicine', dosage: '50mg', time: '12:00'}
      );
  }

  constructor() {
    addIcons({addOutline})
  }
}
