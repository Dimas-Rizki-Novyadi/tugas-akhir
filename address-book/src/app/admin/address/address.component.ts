import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import { MatDialog } from '@angular/material/dialog';
import * as FileSaver from 'file-saver';
import { ApiService } from 'src/app/services/api.service';
import { AddressDetailComponent } from '../address-detail/address-detail.component';
import { UploadComponent } from '../upload/upload.component';

@Component({
  selector: 'app-address',
  templateUrl: './address.component.html',
  styleUrls: ['./address.component.scss']
})
export class AddressComponent implements OnInit {
  title: any;
  addressdata: any = {};
  addresslist: any = [];
  userData: any = {};

  constructor(
    public dialog: MatDialog,
    public api: ApiService,
    public db: AngularFirestore,
    public auth: AngularFireAuth
  ) { }

  ngOnInit(): void {
    this.title = 'Address List';
    this.auth.user.subscribe(user => {
      this.userData = user;
      this.getAddress();
    });
  }
  loading: boolean | undefined;
  getAddress() {
    this.loading = true;
    this.db.collection('addresslist', ref => {
      return ref.where('uid', '==', this.userData.uid);
    }).valueChanges({idField : 'id'}).subscribe(res => {
      console.log(res);
      this.addresslist = res;
      this.loading = false;
    }, err => {
      this.loading = false;
    })
  }
  addressDetail(data: any, idx: number) {
    let dialog = this.dialog.open(AddressDetailComponent, {
      width: '400px',
      data: data
    });
    dialog.afterClosed().subscribe(res => {
      return;
    })
  }
  loadingDelete: any = {};
  deleteAddress(id: any, idx: number) {
    var conf = confirm('Do you want to delete this address ?');
    if (conf) {
      this.db.collection('addresslist').doc(id).delete().then(res => {
        this.addresslist.splice(idx, 1);
        this.loadingDelete[idx] = false;
      }).catch(err => {
        this.loadingDelete[idx] = false;
        alert('Cannot delete data');
      });
    }
  }
  uploadFile(data: any, idx: any) {
    let dialog = this.dialog.open(UploadComponent, {
      width: '400px',
      data: data
    });
    dialog.afterClosed().subscribe(res => {
      return;
    })
  }
  downloadFile(data:any) {
    FileSaver.saveAs('(link/tautan API disini)' /*Contoh link/tautan API yaitu http://api.sunhouse.co.id/bookstore/*/ +data.url);
  }
}
