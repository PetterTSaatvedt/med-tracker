import { Injectable } from '@angular/core';
import { Medication } from '../models/medication.model';
import { Preferences } from '@capacitor/preferences';
import { MedicationLog } from '../models/medication-log.model';

@Injectable({
  providedIn: 'root'
})
export class Storage {

  async saveMedications(medications: Medication[]) {
    await Preferences.set({ key: 'medication-list', value: JSON.stringify(medications) });
  }

  async loadMedications() {
    const result = await Preferences.get({ key: 'medication-list' });

    if (!result.value) {
      return [];
    }

    const medications: Medication[] = JSON.parse(result.value);
    return medications;
  }

  async saveLogs(logs: MedicationLog[]) {
    await Preferences.set({ key: 'medication-logs', value: JSON.stringify(logs) });
  }

  async loadLogs() {
    const result = await Preferences.get({ key: 'medication-logs' });

    if (!result.value) {
      return [];
    }

    const logs: MedicationLog[] = JSON.parse(result.value);
    return logs;
  }
}
