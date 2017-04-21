import { Component } from '@angular/core';
import { NavController, NavParams} from 'ionic-angular';
import { AuthService } from '../../providers/auth-service';
import { provideAuth } from 'angular2-jwt';
import {HomePage} from '../home/home';
import 'rxjs/add/operator/map';

@Component({
  selector: 'page-dream-detail',
  templateUrl: 'dream-detail.html',
      providers: [AuthService]
})

export class DreamDetailPage {

  //dream object
  public dream;

  constructor(public nav: NavController, navParams: NavParams, public auth: AuthService) {
  	this.dream = navParams.data;
  }
  //Go back to home page. Reload all objects.
  public goHome(){
    this.nav.push(HomePage);
  }
}
