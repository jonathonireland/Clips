import { CommonModule } from '@angular/common';
import { ManageComponent } from './manage/manage.component';
import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { UploadComponent } from './upload/upload.component';
import { VideoRoutingModule } from './video-routing.module';

@NgModule({
  declarations: [
    ManageComponent,
    UploadComponent
  ],
  imports: [
    CommonModule,
    VideoRoutingModule,
    SharedModule
  ]
})
export class VideoModule { }
