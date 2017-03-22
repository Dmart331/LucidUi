import {Component} from '@angular/core';
import {Http, Headers, Response} from '@angular/http';
import {NavController, LoadingController} from 'ionic-angular';
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
  providers: [AuthService]
})
export class HomePage {
  //Insure that page loads every time it is brought up. No caching.
  public searchTerm: string = '';

  ionViewWillEnter(){
    console.log("this executes second");
    this.listDreams();  

  }
  
  constructor(private nav: NavController, public auth: AuthService, public productService: ProductService, private http:Http) {
      
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
   headers.append('Authorization', 'Token ' +this.auth.AuthToken);
   this.http.get('http://stark-castle-79494.herokuapp.com/dreams/', {headers: headers}).map((res:Response) => res.json()).subscribe(data =>{this.dreams = data, console.log("proooood",this.dreams)
     })  
  })
}
  //*----------Search Functions-----------*
    setFilteredItems() {
        this.dreams = this.filterItems(this.searchTerm);
    }

    filterItems(searchTerm){
    return this.dreams.filter((dream) => {
        return dream.title.toLowerCase().indexOf(searchTerm.toLowerCase()) > -1;
    });     
  }

  //Add a dream, bring dream page to front.
   public addDream(){
     this.nav.push(DreamPage);
   }

   //TODO Remove dream from dom
  public removeItem(dream){
     console.log("doing it!")
    return new Promise(resolve => {
     var headers = new Headers();
     this.auth.loadUserCredentials();
      // console.log("loading", auth.AuthToken)
     headers.append('Authorization', 'Token ' +this.auth.AuthToken);
     this.http.delete(`http://stark-castle-79494.herokuapp.com/dreams/${dream}`, {headers: headers}).map((res:Response) => res.json())
    })
    }


    //Clears out Auth token. 

  public logOut(){
    this.auth.logout();
    this.nav.setRoot(LoginPage);
  }

  //Stores ID on auth page.
  public logit(id){
  this.auth.storeId(id);
   console.log("lkjasdflkjasfd");
  }
  //Bring dream details page to front.
  public goToDetails(dream){
    this.nav.push(DreamDetailPage, dream)
  }
  //Return dream id
  public getId(){
    return this.dreamID
  }

}