import {Component} from '@angular/core';
import {Http, Headers, Response} from '@angular/http';
import {NavController} from 'ionic-angular';
import { AuthService } from '../../providers/auth-service';
import { ProductService} from '../../providers/product-service';
import { DreamPage} from '../dream-page/dream-page';
import { provideAuth } from 'angular2-jwt';
import { LoginPage } from '../login/login';
import {HomePage} from '../home/home';
import 'rxjs/add/operator/map';

@Component({
  selector: 'page-dream-detail',
  templateUrl: 'dream-detail.html'
})

export class DreamDetailPage {
  public dreamId;
  public dream;
  public parsedDream;
  ngOnInit(){
    //do any lines of code to init the child
    console.log("this executes second");
    //then finally,
    this.getId();
    this.callDream(this.dreamId);
    this.setDream();
   this.parsedDream = JSON.parse(this.dream)
  }
  constructor(public navCtrl: NavController, public auth: AuthService, public http: Http) {}

getId(){
this.dreamId = this.auth.useId();
console.log(this.dreamId);
}


callDream(id) {
         return new Promise(resolve => {
            var headers = new Headers();
            this.auth.loadUserCredentials();
            headers.append('Authorization', 'Token ' +this.auth.AuthToken);
            this.http.get(`http://localhost:8000/dreams/${id}/`, {headers: headers}).map(res => res.json()).subscribe(data =>{this.auth.storeDream(data)} )
    })
}

setDream(){
	this.dream = this.auth.useDream()
	// this.auth.clearDream()

	return this.dream
}

clearDream(){
this.auth.clearDream()
}
  

}
