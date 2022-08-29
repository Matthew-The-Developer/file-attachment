import { Component, OnInit } from '@angular/core';
import { MedicalType, VirtualDocument } from '../models/document.model';

@Component({
  selector: 'app-tabs',
  templateUrl: './tabs.component.html',
  styleUrls: ['./tabs.component.scss']
})
export class TabsComponent implements OnInit {
  documents: VirtualDocument[] = [
    {
      url: 'https://www.cs.cmu.edu/~dst/Adobe/Gallery/PDFsecurity.pdf',
      name: "pdf-test.pdf",
      size: 2534446,
      extension: '.pdf',
      type: 'application/pdf',
      lastModified: new Date(1659762822100),
      medicalType: MedicalType.ApprovalFromMother,
    },
    {
      url: 'https://www.thecoderpedia.com/wp-content/uploads/2020/06/Programming-Memes-Programmer-while-sleeping.jpg?x34900',
      name: "Programming-Memes-Programmer-while-sleeping.jpg",
      size: 59868,
      extension: '.jpg',
      type: 'image/jpeg',
      lastModified: new Date(1661779977375),
      medicalType: MedicalType.KidneyStoneImplant,
    },
    {
      url: './assets/example03.docx',
      name: "example03.docx",
      size: 108816,
      extension: '.docx',
      type: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
      lastModified: new Date(1659672717869),
      medicalType: MedicalType.BlackMarketTransplant,
    }
  ];

  constructor() { }

  ngOnInit(): void {
  }

}
