import {Component} from '@angular/core';
import {Http, Headers, Response, RequestOptions} from '@angular/http';
import {NavController} from 'ionic-angular';
import { AuthService } from '../../providers/auth-service';
import { provideAuth } from 'angular2-jwt';
import 'rxjs/add/operator/map';


@Component({
  selector: 'page-dream-page',
  templateUrl: 'dream-page.html',
	providers: [AuthService
	    // provideAuth({
	    //     headerName: 'Authorization',
	    //     headerPrefix: 'bearer',
	    //     tokenName: 'token',
	    //     tokenGetter: (() => localStorage.getItem('raja')),
	    //     globalHeaders: [{ 'Content-Type': 'application/json' }],
	    //     noJwtError: true
	    // })]
	  ],
})
export class DreamPage {

  constructor(public navCtrl: NavController, private auth: AuthService,  private http:Http) {}

    product = {
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
    let postParams = this.product;
    
	if(this.product.dream_type === "Horror"){
		this.product.dream_type = "http://localhost:8000/dreamtypes/1/"
	}
	else if (this.product.dream_type === "Fantasy"){
		this.product.dream_type = "http://localhost:8000/dreamtypes/2/"
	}
	else if (this.product.dream_type === "Simulation"){
		this.product.dream_type = "http://localhost:8000/dreamtypes/3/"
	}

	if(this.product.dreamer === "dmart"){
		this.product.dreamer = "http://localhost:8000/dreamers/1/"
	}

	console.log('drew', this.product),
    this.http.post('http://localhost:8000/dreams/', postParams, options).subscribe(data => { console.log(data['_body']);
}, error => {
	console.log(error);
});
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
