import { Component } from '@angular/core';
import { IonHeader, IonToolbar, IonTitle, IonContent, IonLabel, IonItem, IonList } from '@ionic/angular/standalone';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  imports: [IonHeader, IonToolbar, IonTitle, IonContent, IonLabel, IonItem, IonList],
})
export class HomePage {
  medications = [
    { name: 'Aspirin', dosage: '100mg', time: '08:00' },
    { name: 'Vitamin D', dosage: '1000 IU', time: '09:00' },
    { name: 'Ibuprofen', dosage: '200mg', time: '20:00' }
  ];

  constructor() {}
}
