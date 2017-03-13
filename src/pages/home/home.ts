import {Component} from '@angular/core';
import {Http, Headers, Response} from '@angular/http';
import {NavController} from 'ionic-angular';
import { AuthService } from '../../providers/auth-service';
import { ProductService} from '../../providers/product-service';
import { provideAuth } from 'angular2-jwt';
import 'rxjs/add/operator/map';
 
@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
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
export class HomePage {
	public products;
  username = '';
  email = '';
  constructor(private nav: NavController, public auth: AuthService, public productService: ProductService, private http:Http) {
    // let info = this.auth.getinfo();
    // console.log("info", info)
    // let stuff = this.listProducts();
    // console.log(stuff);
  }

  // public listProducts() {
  //   return this.getProducts()
  // }

public getProducts() {
  return new Promise(resolve => {
    var headers = new Headers();
    this.auth.loadUserCredentials();
    // console.log("loading", auth.AuthToken)
    headers.append('Authorization', 'Token ' +this.auth.AuthToken);
   this.http.get('http://localhost:8000/dreams/', {headers: headers}).map((res:Response) => res.json()).subscribe(data =>{this.products = data, console.log(this.products)}
)
   
})
}





}