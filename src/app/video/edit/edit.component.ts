import { Component, OnInit, OnDestroy } from '@angular/core';
import {ModalService} from 'src/app/services/modal.service';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.scss']
})
export class EditComponent implements OnInit {

  constructor(private modal: ModalService) { }

  ngOnInit(): void {
    this.modal.register('editClip')
  }

  ngOnDestroy(){
    this.modal.unregister('editClip');
  }
}
