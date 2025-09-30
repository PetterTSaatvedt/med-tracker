import { Medication } from './../models/medication.model';
import { Component, ViewChild } from '@angular/core';
import { IonHeader, IonToolbar, IonTitle, IonContent, IonLabel, IonItem, IonList, IonButton, IonIcon, IonModal, IonInput, IonButtons } from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { addOutline } from 'ionicons/icons';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  imports: [IonHeader, IonToolbar, IonTitle, IonContent, IonLabel, IonItem, IonList, IonButton, IonIcon, IonModal, IonInput, IonButtons, FormsModule],
})
export class HomePage {

  medications: Medication[] = [
    { name: 'Aspirin', dosage: '100mg', time: '08:00', },
    { name: 'Vitamin D', dosage: '1000 IU', time: '09:00' },
    { name: 'Ibuprofen', dosage: '200mg', time: '20:00' }
  ];

  newMedName: string = '';
  newMedDosage: string = '';
  newMedTime: string = '';

  @ViewChild('modal') modal!: IonModal;

  saveMedication() {
    if (!this.newMedName || !this.newMedDosage || !this.newMedTime) {
      alert("To save your medication, please fill all sections.")
      return;
    }

    this.addMedication();
    this.modal.dismiss();
    this.clearForm();
  }

  addMedication() {
    this.medications.push(
      { name: this.newMedName, dosage: this.newMedDosage, time: this.newMedTime}
    );
  }

  clearForm() {
    this.newMedName = '';
    this.newMedDosage = '';
    this.newMedTime = '';
  }

  constructor() {
    addIcons({addOutline})
  }
}