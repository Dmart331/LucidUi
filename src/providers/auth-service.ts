import { Injectable } from '@angular/core';
import { Component } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import { NavController } from 'ionic-angular';
import { ProductService } from '../../providers/product-service';
import { DreamPage} from '../dream-page/dream-page';
import { provideAuth } from 'angular2-jwt';
import { LoginPage } from '../pages/login/login';
import { HomePage } from '../pages/home/home';
import { DreamDetailPage} from '../dream-detail/dream-detail';
import { Storage } from '@ionic/storage'
import 'rxjs/add/operator/map';

//AuthService handles most of the HTTP requests used in the app
 
@Injectable()
export class AuthService {
   //Dream Id Stores the PK of the dream to get the detail later
    public dreamID;
   //Dream is the dream object which will need to be parsed when being used for detail. 
    public dream;
   //  Collection of Dreams. Returns all dreams for the user.
    public dreams;

    isLoggedin: boolean;
    AuthToken;
    
    constructor(public http: Http, storage: Storage, nav: NavController) {
        this.http = http;
        this.isLoggedin = false;
        this.AuthToken = null;
    }
    
    //Log in function handles authentication. Being clled by button.

    public login(usercreds){
        this.authenticate(usercreds);
    }



   //Utilizing the Local Storage of Ionic to share data between files.

    storeUserCredentials(token) {
        window.localStorage.setItem('raja', token);
        this.useCredentials(token);
        
    }
    
    //Used for Token Authentication.

    useCredentials(token) {
        this.isLoggedin = true;
        this.AuthToken = token;
    }
    

    //Use this function when making a request to the API to authenticate user. 

    loadUserCredentials() {
        var token = window.localStorage.getItem('raja');
        console.log('drew', token)
        this.useCredentials(token);

    }
    
    //Destory object user object stored (Token)

    destroyUserCredentials() {
        this.isLoggedin = false;
        this.AuthToken = null;
        window.localStorage.clear();
    }
    
    //Retrieve user token

    getUser(){
        var token = window.localStorage.getItem('raja');
        // this.useCredentials(token);
        return token
    }

    //function that handles authentication when logging in.

    authenticate(user) {
        var creds = "username=" + user.name + "&password=" + user.password;
        var headers = new Headers();
        headers.append('Content-Type', 'application/x-www-form-urlencoded');
        
        return new Promise(resolve => {
            this.http.post('http://stark-castle-79494.herokuapp.com/api-token-auth/', creds, {headers: headers}).subscribe(data => {
                if(data){
                    this.storeUserCredentials(data.json().token);
                    resolve(true);
                }
                else
                    console.log("else")
                    resolve(false);
            });
        });
    }
    
    //Used for signing a user up. 

    adduser(user) {
        var creds = "name=" + user.name + "&password=" + user.password;
        var headers = new Headers();
        headers.append('Content-Type', 'application/x-www-form-urlencoded');
        
        return new Promise(resolve => {
            this.http.post('http://stark-castle-79494.herokuapp.com/users/', creds, {headers: headers}).subscribe(data => {
                if(data.json().success){
                    resolve(true);
                }
                else
                    resolve(false);
            });
        });
    }

    //Function to retrieve Detail dream. Api call to detail page. 

    getDetail(id){
        let dreamData;
         return new Promise(resolve => {
            var headers = new Headers();
            this.loadUserCredentials();
            headers.append('Authorization', 'Token ' +this.AuthToken);
            this.http.get(`http://stark-castle-79494.herokuapp.com/dreams/${id}/`, {headers: headers}).map((res:Response) => res.json()).subscribe(data =>{dreamData = data, this.storeDream(dreamData)
            })
            
    })
}
    //Again using ionic's local storage to store the dream and retrieve on another page. Note the JSON stringify..
    storeDream(dream){
      window.localStorage.setItem("frank", JSON.stringify(dream))
    }

    //Retrieve from local storage. Note the Parse. 

    useDream(){
      this.dream = window.localStorage.getItem("frank")
      console.log("using dream", JSON.parse(this.dream))
      return this.dream
    }

    //remove dream
    clearDream(){
        window.localStorage.removeItem("frank");
    }
    // Store dream ID 
    storeId(id){
        window.localStorage.setItem('dreamId', id);
        console.log("here? 140");
        this.getDetail(id);
        console.log("dreamin", window.localStorage.getItem('dreamId'))
    }
    //Use dream ID

    useId(){
     var id = window.localStorage.getItem('dreamId');
     console.log("itll work", id);
     return id;

        }
    //Logs user out.
    
    logout() {
        this.destroyUserCredentials();
    }
}