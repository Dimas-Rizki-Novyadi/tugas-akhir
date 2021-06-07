import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ApiService } from 'src/app/services/api.service';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireAuth } from '@angular/fire/auth';

@Component({
  selector: 'app-address-detail',
  templateUrl: './address-detail.component.html',
  styleUrls: ['./address-detail.component.scss']
})
export class AddressDetailComponent implements OnInit {
  userData: any = {};
  constructor(
    public dialogRef: MatDialogRef<AddressDetailComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public api: ApiService,
    public db: AngularFirestore,
    public auth: AngularFireAuth
  ) { }

  ngOnInit(): void {
    this.auth.user.subscribe(res => {
      this.userData = res;
    });
  }
  loading: boolean | undefined;
  saveData() {
    this.loading = true;
    if (this.data.id == undefined) {
      let doc = new Date().getTime().toString();
      this.data.uid = this.userData.uid;
      this.db.collection('addresslist').doc(doc).set(this.data).then(res => {
        this.dialogRef.close(this.data);
        this.loading = false;
      }).catch(er => {
        console.log(er);
        this.loading = false;
        alert('Cannot save data');
      })
    } else {

      this.db.collection('addresslist').doc(this.data.id).update(this.data).then(res => {
        this.dialogRef.close(this.data);
        this.loading = false;
      }).catch(er => {
        console.log(er);
        this.loading = false;
        alert('Cannot save data');
      })
    }
  }
}
