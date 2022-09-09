interface VirtualDocument {
  url: string;
  name: string;
  size: number;
  extension: string;
  type: string;
  lastModified: Date;
  medicalType: MedicalType;
}

type MedicalDocument = File & {
  medicalType: MedicalType;
  extension: string;
};

enum MedicalType {
  activation = 'Activation',
  declination = 'Declination',
  deactivation = 'Deactivation',
}

interface ExtensionType {
  mimeType: string;
  fullDescription: string;
  application?: string;
}

const ImageExtensions = new Map<string, ExtensionType>([
  ['.bmp', { mimeType: 'image/bmp', fullDescription: 'Standard Windows Bitmap image' }],
  ['.gif', { mimeType: 'image/gif', fullDescription: 'Graphics interchange file format' }],
  ['.jpeg', { mimeType: 'image/jpeg', fullDescription: 'JPEG bitmap image format file' }],
  ['.jpg', { mimeType: 'image/jpeg', fullDescription: 'JPEG bitmap image format file' }],
]);

const PDFExtensions = new Map<string, ExtensionType>([
  ['.pdf', { mimeType: 'application/pdf', fullDescription: 'Adobe Portable document format' }],
]);

const DocumentExtensions = new Map<string, ExtensionType>([
  ['.csv', { mimeType: 'application/vnd.ms-excel', fullDescription: 'Comma Separated Value file', application: 'ms-excel' }],
  ['.doc', { mimeType: 'application/msword', fullDescription: 'Microsoft Word 97 to 2003 document file', application: 'ms-word:ofv|u|' }],
  ['.docx', { mimeType: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document', fullDescription: 'Microsoft Word 2007/2010 Open XML document file', application: 'ms-word:ofv|u|' }],
]);

export { VirtualDocument, MedicalDocument, MedicalType, ExtensionType, ImageExtensions, PDFExtensions, DocumentExtensions };