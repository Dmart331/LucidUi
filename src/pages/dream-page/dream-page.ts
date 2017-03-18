import {Component} from '@angular/core';
import {Http, Headers, Response, RequestOptions} from '@angular/http';
import {NavController, NavParams} from 'ionic-angular';
import { AuthService } from '../../providers/auth-service';
import { provideAuth } from 'angular2-jwt';
import { HomePage } from '../home/home';
import 'rxjs/add/operator/map';


@Component({
  selector: 'page-dream-page',
  templateUrl: 'dream-page.html',
	providers: [AuthService],
})
export class DreamPage {

  constructor(public nav: NavController, navParams: NavParams, private auth: AuthService,  private http:Http) {
  	// dinky = navParams.data.username;
  }

    dream = {
    dreamer: 'dmart',
    title: '',
    dream_type:'',
    description: '',
    rate:'',
  };


  logForm(){
    let headers = new Headers();
    this.auth.loadUserCredentials();
    headers.append('Authorization', 'Token ' +this.auth.AuthToken);
    headers.append('Content-Type', 'application/json');
    let options = new RequestOptions({headers: headers})
    let postParams = this.dream;
    
	if(this.dream.dream_type === "Horror"){
		this.dream.dream_type = "http://stark-castle-79494.herokuapp.com/dreamtypes/1/"
	}
	else if (this.dream.dream_type === "Fantasy"){
		this.dream.dream_type = "http://stark-castle-79494.herokuapp.com/dreamtypes/2/"
	}
	else if (this.dream.dream_type === "Simulation"){
		this.dream.dream_type = "http://stark-castle-79494.herokuapp.com/dreamtypes/3/"
	}

	if(this.dream.dreamer === "dmart"){
		this.dream.dreamer = "http://stark-castle-79494.herokuapp.com/dreamers/1/"
	}

	console.log('drew', this.dream),
    this.http.post('http://stark-castle-79494.herokuapp.com/dreams/', postParams, options).subscribe(data => { console.log(data['_body']);
}, error => {
	console.log(error);
});
}

  public goHome(){
  this.nav.pop(DreamPage)
}

	handleError(error) {
		console.log(error);
		return error.json().message || 'Server error, please try again later';
	}

	successCallback() {
		console.log('Success!');
		return console.log('Success!')
	}

}
