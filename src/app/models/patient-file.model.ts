import { MedicalType } from "./document.model";

export interface PatientFile {
  name: string;
  size: number;
  extension: string;
  documentDate: Date;
  type: MedicalType;
  url?: string;
  file?: File;
}