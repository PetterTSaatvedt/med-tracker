export interface MedicationLog {
    medicationName: string;
    date: string;
    scheduledTime: string;
    status: LogStatus;
}

export enum LogStatus {
    PENDING = 'pending',
    TAKEN = 'taken',
    SKIPPED = 'skipped',
    MISSED = 'missed'
}