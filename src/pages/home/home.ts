import {Component} from '@angular/core';
import {Http, Headers, Response} from '@angular/http';
import {NavController} from 'ionic-angular';
import { AuthService } from '../../providers/auth-service';
import { ProductService} from '../../providers/product-service';
import { DreamPage} from '../dream-page/dream-page';
import { provideAuth } from 'angular2-jwt';
import { LoginPage } from '../login/login';
import { DreamDetailPage} from '../dream-detail/dream-detail';
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
  ionViewWillEnter(){
    //do any lines of code to init the child
    console.log("this executes second");
    //then finally,
    this.listDreams();  

  }
  constructor(private nav: NavController, public auth: AuthService, public productService: ProductService, private http:Http) {
    // let info = this.auth.getinfo();
    // console.log("info", info)
    // let stuff = this.listProducts();
    // console.log(stuff);
  }
  public dreams;
  public dreamID;
  public dreamData;

  public listDreams() {
    return this.getDreams()
  }

public getDreams() {
  return new Promise(resolve => {
   var headers = new Headers();
   this.auth.loadUserCredentials();
    // console.log("loading", auth.AuthToken)
   headers.append('Authorization', 'Token ' +this.auth.AuthToken);
   this.http.get('http://localhost:8000/dreams/', {headers: headers}).map((res:Response) => res.json()).subscribe(data =>{this.dreams = data, console.log("proooood",this.dreams)
     })  
  })
}

 public addDream(){
   this.nav.push(DreamPage);
 }



public removeItem(item){
   console.log("doing it!")
    for(let i = 0; i < this.dreams.length; i++) {
 
      if(this.dreams[i] == item){
        this.dreams.pop(i);
      }
 
    }
  }

 public clearDream(){
// this.auth.clearDream()
}

public logOut(){
  this.auth.logout();
  this.nav.setRoot(LoginPage);
}

  public logit(id){
  this.auth.storeId(id);
   console.log("lkjasdflkjasfd");
  }

  public goToDetails(dream){
    this.nav.push(DreamDetailPage, dream)
  }

  public getId(){
    return this.dreamID
  }

}