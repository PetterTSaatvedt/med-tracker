import { Component, OnInit } from '@angular/core';
import { IonHeader, IonToolbar, IonTitle, IonContent, IonIcon, IonButton, IonList, IonItem, IonChip} from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { chevronBackOutline, chevronForwardOutline } from 'ionicons/icons';
import { Storage } from '../services/storage';
import { Medication } from '../models/medication.model';
import { MedicationLog } from '../models/medication-log.model';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  imports: [IonHeader, IonToolbar, IonTitle, IonContent, IonIcon, IonButton, IonList, IonItem, IonChip],
})
export class HomePage implements OnInit {
  selectedDate: Date = new Date();
  get computedDate(): string {
    return this.selectedDate.toDateString();
  };

  previousDay() {
    const newDate = new Date(this.selectedDate);
    newDate.setDate(newDate.getDate() - 1);
    this.selectedDate = newDate;
  }

  nextDay() {
    const newDate = new Date(this.selectedDate);
    newDate.setDate(newDate.getDate() + 1);
    this.selectedDate = newDate;
  }

  medications: Medication[] = [];
  medicationLog: MedicationLog[] = [];
  sortedMedications: Medication[] = [];

  logAdherence() {
    this.storage.saveLogs(this.medicationLog)
    // TODO: find solution to updating logs upon change to adherence status
  }
  
  constructor(private storage: Storage) {
    addIcons({chevronBackOutline, chevronForwardOutline});
  }

  async ngOnInit() {
    this.medications = await this.storage.loadMedications();
    this.medicationLog = await this.storage.loadLogs();
    this.sortedMedications = this.medications.sort((a, b) => a.time.localeCompare(b.time));
  }
}