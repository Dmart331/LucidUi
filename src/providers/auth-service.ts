import {Injectable} from '@angular/core';
import {Component} from '@angular/core';
import {Http, Headers, Response} from '@angular/http';
import {NavController} from 'ionic-angular';
import { ProductService} from '../../providers/product-service';
import { DreamPage} from '../dream-page/dream-page';
import { provideAuth } from 'angular2-jwt';
import { LoginPage } from '../pages/login/login';
import { HomePage } from '../pages/home/home';
import { DreamDetailPage} from '../dream-detail/dream-detail';
import { Storage } from '@ionic/storage'
import 'rxjs/add/operator/map';

 
@Injectable()
export class AuthService {
    public dreamID;
    isLoggedin: boolean;
    AuthToken;
    
    constructor(public http: Http, storage: Storage) {
        this.http = http;
        this.isLoggedin = false;
        this.AuthToken = null;
    }
    
    storeUserCredentials(token) {
        window.localStorage.setItem('raja', token);
        this.useCredentials(token);
        
    }
    
    useCredentials(token) {
        this.isLoggedin = true;
        this.AuthToken = token;
    }
    
    loadUserCredentials() {
        var token = window.localStorage.getItem('raja');
        console.log('drew', token)
        this.useCredentials(token);

    }
    
    destroyUserCredentials() {
        this.isLoggedin = false;
        this.AuthToken = null;
        window.localStorage.clear();
    }
    
    getUser(){
        var token = window.localStorage.getItem('raja');
        // this.useCredentials(token);
        return token
    }

    authenticate(user) {
        var creds = "username=" + user.name + "&password=" + user.password;
        var headers = new Headers();
        headers.append('Content-Type', 'application/x-www-form-urlencoded');
        
        return new Promise(resolve => {
            this.http.post('http://localhost:8000/api-token-auth/', creds, {headers: headers}).subscribe(data => {
                if(data){
                    console.log("log", data.json().token)
                    this.storeUserCredentials(data.json().token);
                    resolve(true);
                }
                else
                    console.log("else")
                    resolve(false);
            });
        });
    }
    adduser(user) {
        var creds = "name=" + user.name + "&password=" + user.password;
        var headers = new Headers();
        headers.append('Content-Type', 'application/x-www-form-urlencoded');
        
        return new Promise(resolve => {
            this.http.post('http://localhost:8000/users/', creds, {headers: headers}).subscribe(data => {
                if(data.json().success){
                    resolve(true);
                }
                else
                    resolve(false);
            });
        });
    }
    
    getinfo() {
        console.log("we are here")
        return new Promise(resolve => {
            var headers = new Headers();
            this.loadUserCredentials();
            console.log("loading", this.AuthToken)
            headers.append('Authorization', 'Token ' +this.AuthToken);
            this.http.get('http://localhost:8000/dreams/', {headers: headers}).subscribe(data => {
                if(data)

                    resolve(data.json());
                else
                    resolve(false);
            });
        })
    }



    getDetail(id){
        let dreamData;
         return new Promise(resolve => {
            var headers = new Headers();
            this.loadUserCredentials();
            headers.append('Authorization', 'Token ' +this.AuthToken);
            this.http.get(`http://localhost:8000/dreams/${id}/`, {headers: headers}).map((res:Response) => res.json()).subscribe(data =>{dreamData = data, this.storeDream(dreamData)
            })
            this.storeId(id);
    })
}

    storeDream(dream){
      window.localStorage.setItem("frank", JSON.stringify(dream))
    }

    useDream(){
      var dream = window.localStorage.getItem("frank")
      console.log("using dream", JSON.parse(dream))
      return dream
    }

    clearDream(){
        window.localStorage.clear();
    }

    storeId(id){
        window.localStorage.setItem('dreamId', id);
        console.log("dreamin", window.localStorage.getItem('dreamId'))
    }

    useId(){
     var id = window.localStorage.getItem('dreamId');
     console.log("itll work", id);
     return id;

        }
    
    logout() {
        this.destroyUserCredentials();
    }
}