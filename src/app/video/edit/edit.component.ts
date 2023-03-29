import { Component, OnInit, OnDestroy, Input, OnChanges } from '@angular/core';
import {ModalService} from 'src/app/services/modal.service';
import IClip from 'src/app/models/clip.model';
import {FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.scss']
})
export class EditComponent implements OnInit, OnDestroy, OnChanges {

@Input() activeClip: IClip | null = null;

clipID = new FormControl('', {
  nonNullable: true
})
title = new FormControl('', {
  validators: [
    Validators.required,
    Validators.minLength(3)
  ],
  nonNullable: true
})
editForm = new FormGroup({
  title: this.title,
  id: this.clipID
})

  constructor(private modal: ModalService) { }

  ngOnInit(): void {
    this.modal.register('editClip')
  }

  ngOnDestroy(){
    this.modal.unregister('editClip');
  }

  ngOnChanges(){
    if(!this.activeClip || !this.activeClip.docID){
      return
    }

    this.clipID.setValue(this.activeClip.docID)
    this.title.setValue(this.activeClip.title)
  }
}
