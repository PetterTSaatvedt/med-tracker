import { Medication } from './../models/medication.model';
import { Component, ViewChild, ChangeDetectorRef, OnInit } from '@angular/core';
import { IonHeader, IonToolbar, IonTitle, IonContent, IonLabel, IonItem, IonList, IonButton, IonIcon, IonModal, IonInput, IonButtons, IonAlert } from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { addOutline, removeCircleOutline } from 'ionicons/icons';
import { FormsModule } from '@angular/forms';
import { Storage } from '../services/storage';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  imports: [IonHeader, IonToolbar, IonTitle, IonContent, IonLabel, IonItem, IonList, IonButton, IonIcon, IonModal, IonInput, IonButtons, FormsModule, IonAlert],
})
export class HomePage implements OnInit {

  medications: Medication[] = [];

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
          this.cdr.detectChanges();
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
    this.storage.saveMedications(this.medications);
  }

  deleteMedication(index: number) {
    this.medications.splice(index, 1);
    this.storage.saveMedications(this.medications);
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

  constructor(private cdr: ChangeDetectorRef, private storage: Storage) {
    addIcons({addOutline, removeCircleOutline});
  }

  async ngOnInit() {
    this.medications = await this.storage.loadMedications();
  }
}