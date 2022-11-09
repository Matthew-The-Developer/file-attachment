import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FileGroupType, FileTypeGroup } from 'src/app/models/file-group-type.model';

@Component({
  selector: 'app-dynamic-menu',
  templateUrl: './dynamic-menu.component.html',
  styleUrls: ['./dynamic-menu.component.scss']
})
export class DynamicMenuComponent implements OnInit {
  @Input() group!: FileTypeGroup;
  @Output() typeSelected: EventEmitter<FileGroupType> = new EventEmitter<FileGroupType>();
  
  constructor() { }

  ngOnInit(): void {
  }

  selected(type: FileGroupType): void {
    this.typeSelected.emit(type);
  }
}
