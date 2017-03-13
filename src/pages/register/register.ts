import { Component } from '@angular/core';
import { NavController, AlertController } from 'ionic-angular';
import { AuthService } from '../../providers/auth-service';
import {provideAuth } from 'angular2-jwt'; 


@Component({
  selector: 'page-register',
  templateUrl: 'register.html',
        providers: [[AuthService, 
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
export class RegisterPage {

  newcreds = {
            name: '',
            password: ''
  };
  constructor(public navCtrl: NavController, public authservice: AuthService, public alertCtrl: AlertController) {}

  ionViewDidLoad() {
    console.log('Hello Signup Page');
  }
  
  register(user) {
        this.authservice.adduser(user).then(data => {
            if(data) {
                var alert = this.alertCtrl.create({
                    title: 'Success',
                    subTitle: 'User Created',
                    buttons: ['ok']
                });
                alert.present();
            }
    });
}

}
