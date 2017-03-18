import { Component } from '@angular/core';
import { RegisterPage} from '../register/register'
import { NavController } from 'ionic-angular';
import { provideAuth } from 'angular2-jwt';
import {AuthService} from '../../providers/auth-service';
import {HomePage} from '../home/home';

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
 
usercreds = {
     name: '',
     password: ''
};
 
  constructor(public authservice: AuthService, public navCtrl: NavController, public Register: RegisterPage) {  
  }
  
  login(usercreds) {
          console.log(usercreds);
        this.authservice.authenticate(usercreds).then(() => this.navCtrl.setRoot(HomePage, usercreds));
            
}
     signup() {
        this.navCtrl.push(RegisterPage);
    }
 
}