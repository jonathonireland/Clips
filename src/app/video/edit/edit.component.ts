import { 
  Component, OnInit, OnDestroy, Input, OnChanges, Output, EventEmitter
} from '@angular/core';
import {ModalService} from 'src/app/services/modal.service';
import IClip from 'src/app/models/clip.model';
import {FormControl, FormGroup, Validators } from '@angular/forms';
import { ClipService } from 'src/app/services/clip.service';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.scss']
})
export class EditComponent implements OnInit, OnDestroy, OnChanges {

@Input() activeClip: IClip | null = null;
@Output() update = new EventEmitter()
//predefined alert variables
defaultColor = 'blue'
defaultAlert = 'Please Wait! Updating clip.'
errorColor = 'red'
errorAlert = 'Something went wrong. Try again later.'
successColor = 'green'
successAlert = 'Success!'
//default values
inSubmission = false
showAlert = false
alertColor = this.defaultColor
alertMsg = this.defaultAlert


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

  constructor(
    private modal: ModalService,
    private clipService: ClipService
  ) { }

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
    this.inSubmission = false
    this.showAlert = false

    this.clipID.setValue(this.activeClip.docID)
    this.title.setValue(this.activeClip.title)
  }

  async submit(){
    if(!this.activeClip){
      return
    }

    this.inSubmission = true
    this.showAlert = true
    this.alertColor = this.defaultColor
    this.alertMsg = this.defaultAlert

    try {
      await this.clipService.updateClip(
        this.clipID.value, 
        this.title.value
      )
    }
    catch(e){
      this.inSubmission = false
      this.alertColor = this.errorColor
      this.alertMsg = this.errorAlert
      return
    }
    this.update.emit(this.activeClip)

    this.inSubmission = false
    this.alertColor = this.successColor
    this.alertMsg = this.successAlert
  }
}
