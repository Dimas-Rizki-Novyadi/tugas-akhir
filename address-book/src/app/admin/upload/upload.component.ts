import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-upload',
  templateUrl: './upload.component.html',
  styleUrls: ['./upload.component.scss']
})
export class UploadComponent implements OnInit {

  constructor(
    public api: ApiService,
    public dialogRef: MatDialogRef<UploadComponent>,
    @Inject(MAT_DIALOG_DATA) public dialogData:any
  ) { }

  ngOnInit(): void {
    console.log(this.dialogData);
  }

  selectedFile: any;
  onFileChange(event: any) {
    if (event.target.files.length > 0) {
      this.selectedFile = event.target.files[0];
      console.log(this.selectedFile);
    }
  }

  loadingUpload: boolean | undefined;
  uploadFile() {
    let input = new FormData();
    input.append('file', this.selectedFile);
    this.loadingUpload = true;
    this.api.upload(input).subscribe(data => {
      this.updateAddress(data);
      console.log(data);
    }, error => {
      this.loadingUpload = false;
      alert('Upload file failed');
    });
  }

  updateAddress(data:any) {
    if (data.status == true) {
      this.updateAddresslist(data);
      alert('Upload file successfully');
      this.loadingUpload = false;
      this.dialogRef.close();
    } else {
      alert(data.message);
    }
  }

  updateAddresslist(data:any) {
    this.api.put("addresslist/"+this.dialogData.id, {url: data.url}).subscribe(res=>{
      console.log(res);
    })
  }

}
