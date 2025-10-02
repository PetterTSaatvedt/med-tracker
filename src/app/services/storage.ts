import { Injectable } from '@angular/core';
import { Medication } from '../models/medication.model';
import { Preferences } from '@capacitor/preferences';

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
}
