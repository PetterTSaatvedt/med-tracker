import { Component } from '@angular/core';
import { IonHeader, IonToolbar, IonTitle, IonContent, IonIcon, IonButton, IonList, IonItem, IonChip} from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { chevronBackOutline, chevronForwardOutline } from 'ionicons/icons';
import { Storage } from '../services/storage';
import { Medication } from '../models/medication.model';
import { MedicationLog } from '../models/medication-log.model';
import { LogStatus } from '../models/medication-log.model';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  imports: [IonHeader, IonToolbar, IonTitle, IonContent, IonIcon, IonButton, IonList, IonItem, IonChip],
})
export class HomePage {
  selectedDate: Date = new Date();
  get computedDate(): string {
    return this.selectedDate.toDateString();
  };

  previousDay() {
    const newDate = new Date(this.selectedDate);
    newDate.setDate(newDate.getDate() - 1);
    this.selectedDate = newDate;
    this.generateLogsForDate(this.selectedDate);
  }

  nextDay() {
    const newDate = new Date(this.selectedDate);
    newDate.setDate(newDate.getDate() + 1);
    this.selectedDate = newDate;
    this.generateLogsForDate(this.selectedDate);
  }

  medications: Medication[] = [];
  medicationLog: MedicationLog[] = [];
  sortedMedications: Medication[] = [];

  generateLogsForDate(date: Date) {
    const dateString = date.toISOString().split('T')[0];

    for (const med of this.medications) {
      const logExists = this.medicationLog.find((log) => log.medicationName == med.name && log.date == dateString);
      
      if (!logExists) {
        this.medicationLog.push(
          {
            medicationName: med.name,
            date: dateString,
            scheduledTime: med.time,
            status: LogStatus.PENDING
          }
        )
      }
    }

    this.storage.saveLogs(this.medicationLog);
  }

  getStatusForMedication(medicationName: string) {
    const dateString = this.selectedDate.toISOString().split('T')[0];
    const status = this.medicationLog.find((log) => log.medicationName == medicationName && log.date == dateString)?.status;
    
    if (!status) {
      return LogStatus.PENDING;
    }

    return status;
  }

  getColorForStatus(status: LogStatus): string {
    switch (status) {
      case LogStatus.TAKEN:
        return 'success';
      case LogStatus.PENDING:
        return 'warning';
      case LogStatus.MISSED:
        return 'danger';
      case LogStatus.SKIPPED:
        return 'medium';
      default:
        return 'medium';
    }
  }

  toggleMedicationStatus(medicationName: string) {
    const dateString = this.selectedDate.toISOString().split('T')[0];
    const medication = this.medicationLog.find((log) => log.medicationName == medicationName && log.date == dateString);

    if (medication) {
      const status = medication.status == LogStatus.PENDING ? LogStatus.TAKEN : LogStatus.PENDING;
      medication.status = status;
      this.storage.saveLogs(this.medicationLog);
    }
  }
  
  constructor(private storage: Storage) {
    addIcons({chevronBackOutline, chevronForwardOutline});
  }

  async ionViewWillEnter() {
    this.medications = await this.storage.loadMedications();
    this.medicationLog = await this.storage.loadLogs();
    this.sortedMedications = this.medications.sort((a, b) => a.time.localeCompare(b.time));

    this.generateLogsForDate(this.selectedDate);
  }
}