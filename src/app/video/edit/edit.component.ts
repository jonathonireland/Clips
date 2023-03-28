import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import {ModalService} from 'src/app/services/modal.service';
import IClip from 'src/app/models/clip.model';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.scss']
})
export class EditComponent implements OnInit {

@Input() activeClip: IClip | null = null;

  constructor(private modal: ModalService) { }

  ngOnInit(): void {
    this.modal.register('editClip')
  }

  ngOnDestroy(){
    this.modal.unregister('editClip');
  }
}
