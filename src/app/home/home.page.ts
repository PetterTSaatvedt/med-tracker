import { Medication } from './../models/medication.model';
import { Component, ViewChild, ChangeDetectorRef } from '@angular/core';
import { IonHeader, IonToolbar, IonTitle, IonContent, IonLabel, IonItem, IonList, IonButton, IonIcon, IonModal, IonInput, IonButtons, IonAlert } from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { addOutline, removeCircleOutline } from 'ionicons/icons';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  imports: [IonHeader, IonToolbar, IonTitle, IonContent, IonLabel, IonItem, IonList, IonButton, IonIcon, IonModal, IonInput, IonButtons, FormsModule, IonAlert],
})
export class HomePage {

  medications: Medication[] = [
    { name: 'Aspirin', dosage: '100mg', time: '08:00', },
    { name: 'Vitamin D', dosage: '1000 IU', time: '09:00' },
    { name: 'Ibuprofen', dosage: '200mg', time: '20:00' }
  ];

  // Form properties
  newMedName: string = '';
  newMedDosage: string = '';
  newMedTime: string = '';

  // Delete properties
  medicationToDelete: number | null = null;
  deleteMedName: string = '';
  @ViewChild('deleteAlert') deleteAlert!: IonAlert;

  alertButtons = [
    {
      text: 'Cancel',
      role: 'cancel'
    },
    {
      text: 'Delete',
      role: 'confirm',
      handler: () => {
        if (this.medicationToDelete !== null) {
          this.deleteMedication(this.medicationToDelete);
          this.medicationToDelete = null;
          this.cdr.detectChanges(); // needed to immediately apply changes to the UI
        }
      }
    }
  ];

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

  confirmDelete(index: number, name: string) {
    this.medicationToDelete = index;
    this.deleteMedName = name;
    this.deleteAlert.present();
  }

  deleteMedication(index: number) {
    this.medications.splice(index, 1);
  }

  constructor(private cdr: ChangeDetectorRef) {
    addIcons({addOutline, removeCircleOutline})
  }
}