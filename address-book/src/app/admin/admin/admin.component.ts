import { trigger, state, style, transition, animate } from '@angular/animations';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss'],
  animations: [
    trigger('flyInOut', [
      state('in', style({
        width: 120,
        transform: 'translateX(0)', opacity: 1
      })),
      transition('void => *', [
        style({ width: 10, transform: 'translateX(50px)', opacity: 0 })
      ]),
      transition('* => void', [])
    ])
  ]
})
export class AdminComponent implements OnInit {
  mode: string = 'side';
  constructor(
    public api: ApiService,
    public router: Router
  ) { }

  ngOnInit(): void {
    //this.checkLogin();
  }

  checkLogin() {
    this.api.get('addresswithauth/status').subscribe(res => {
      return;
    }, err => {
      this.router.navigate(['/login']);
    })
  }

  logout() {
    let conf = confirm('Are you sure you want to exit the application ?');
    if (conf) {
      localStorage.removeItem('appToken');
      window.location.reload();
    }
  }

  menu = [
    {
      name: 'Dashboard',
      icon: 'dashboard',
      url: '/admin/dashboard'
    }
  ];

}
