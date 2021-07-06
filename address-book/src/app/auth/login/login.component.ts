import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  user: any = {};
  constructor(
    public api: ApiService,
    public router: Router,
    public auth: AngularFireAuth
  ) { }
  
  ngOnInit(): void {
  }
  loading: boolean | undefined;
  hide: boolean = true;
  email = new FormControl('', [Validators.required, Validators.email]);
  password = new FormControl('', [Validators.required]);
  login(user: any) {
    this.loading = true;
    this.auth.signInWithEmailAndPassword(this.user.email, this.user.password).then(res => {
      this.router.navigate(['admin/dashboard']);
      this.loading = false;
    }).catch(err => {
      this.loading = false;
      alert('Cannot login');
    })
  }
}
