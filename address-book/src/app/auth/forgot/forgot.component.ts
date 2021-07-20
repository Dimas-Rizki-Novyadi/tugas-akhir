import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-forgot',
  templateUrl: './forgot.component.html',
  styleUrls: ['./forgot.component.scss']
})
export class ForgotComponent implements OnInit {

  constructor(
    public api: ApiService,
    public router: Router,
    public auth: AngularFireAuth
  ) { }

  ngOnInit(): void {
  }

  user: any = {};
  hide: boolean = true;

  email = new FormControl('', [Validators.required, Validators.email]);

  loading: boolean | undefined;
  forgot(user: any) {
    this.loading = true;
    this.auth.sendPasswordResetEmail(this.user.email).then(res => {
      this.loading = false;
      alert('Reset password successfully!');
      this.router.navigate(['/login']);
    }).catch(err => {
      this.loading = false;
      alert('Cannot reset');
    });
  }

}
