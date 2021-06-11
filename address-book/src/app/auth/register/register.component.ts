import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

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
  password = new FormControl('', [Validators.minLength(6), Validators.required]);

  loading: boolean | undefined;
  register(user: any) {
    this.loading = true;
    this.auth.createUserWithEmailAndPassword(this.user.email, this.user.password).then(res => {
      this.loading = false;
      alert('Register successfully!');
      this.router.navigate(['/login']);
    }).catch(err => {
      this.loading = false;
      alert('Cannot register');
    });
  }
}
