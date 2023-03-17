import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-upload',
  templateUrl: './upload.component.html',
  styleUrls: ['./upload.component.scss']
})
export class UploadComponent implements OnInit {
  isDragOver = false
  nextStep = false
  file: File | null = null

  constructor() { }

  ngOnInit(): void {
  }

  storeFile($event: Event){
    this.isDragOver = false
    this.file = ($event as DragEvent).dataTransfer?.files.item(0) ?? null

    if(!this.file || this.file.type !== 'video/mp4'){
      return
    }
    console.log(this.file)

    this.nextStep = true
  }

}
