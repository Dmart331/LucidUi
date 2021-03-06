import { Component } from '@angular/core';
import { RegisterPage} from '../register/register'
import { NavController, NavParams } from 'ionic-angular';
import { provideAuth } from 'angular2-jwt';
import {AuthService} from '../../providers/auth-service';
import {HomePage} from '../home/home';
import 'rxjs/add/operator/map';


@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
    providers: [[AuthService, RegisterPage,
        provideAuth({
            headerName: 'Authorization',
            headerPrefix: 'bearer',
            tokenName: 'token',
            tokenGetter: (() => localStorage.getItem('raja')),
            globalHeaders: [{ 'Content-Type': 'application/json' }],
            noJwtError: true
        })]
      ]
  
})
export class LoginPage {
  public dreams;

 //User creds stores the name and password infor and sends it with login function

usercreds = {
     name: '',
     password: ''
};
 
  constructor(public authservice: AuthService, public navCtrl: NavController, public Register: RegisterPage) {  
  }
  
  //Uses the auth service login function.

  login(usercreds) {
    this.authservice.login(usercreds);
    this.navCtrl.push(HomePage)
}
  //pushes the sign up page to top layer.
  
     signup() {
        this.navCtrl.push(RegisterPage);
    }
 
}