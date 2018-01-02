import { Component } from '@angular/core';
import { Http, Response, Headers } from '@angular/http';
import 'rxjs/add/operator/map';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app';
  // recuperation des valeures utilises (email,passs,position.longitude,position.latitude)
  latUser: number;
  lonUser: number;
  coordMap: string;
  email: string;
  pass: string;
  userId: string;
  userName: string;
  userEmail: string;
  // les différents liens pour récuperer les data.
  urlNearByShops: string;
  urlLikedShops: string;
  // gestion de l'affichage des pages !
  isConnectionPage: boolean;
  isNearByShopsPage: boolean;
  isLikedShopsPage: boolean;
  isUserPage: boolean;
  // déclaration des tableaux pour recevoir les différents shops
  nearByShops: any= [];
  likedShops: any= [];
  shop: any= {};
  data: any = null;
 // le constructeur
constructor(private _http: Http) {
    console.log('debut du progammme');
  this.isConnectionPage = true;
  this.isNearByShopsPage = false;
  this.isLikedShopsPage = false;
  this.isUserPage = false;
}

public findNearbyShops()  {
 if (  navigator.geolocation) {
    console.log('geo  accord obtenue');
  navigator.geolocation.getCurrentPosition(position => {
  console.log('determination par inscrption');
  this.latUser = position.coords.latitude;
  this.lonUser = position.coords.longitude;
  this.urlNearByShops = '/user/connectionUser/' + this.email + '/' + this.pass + '/' + this.latUser + '/' + this.lonUser + '/';
  this._http.get( this.urlNearByShops ).map((res: Response) => res.json()).subscribe(data => {
                                                                                     this.data = data;
                                                                                     this.nearByShops = data.shop;
                                                                                     this.userEmail = data.userEmail;
                                                                                     this.userId = data.userId;
                                                                                     this.userName = data.userName;
                                                                                              });
this.isUserPage = true;
this.isNearByShopsPage = true;
this.isLikedShopsPage = false;
this.isConnectionPage = false;
// raffraichissement
this.refresh();
// positionnement du map sur la bonne position de l'utilisateur
this.coordMap = this.latUser + ',' + this.lonUser;
console.log(' coordmap = ' + this.coordMap);
document.getElementById('map').setAttribute('src', 'https://maps.google.co.uk?q=' + this.coordMap + '&z=60&output=embed');

});
 }else {
  this.latUser = -6.81134;
  this.lonUser = 33.95564;
  this.urlNearByShops = '/user/connectionUser/' + this.email + '/' + this.pass + '/' + this.latUser + '/' + this.lonUser + '/';
  this._http.get( this.urlNearByShops ).map((res: Response) => res.json()).subscribe(data => {
                                                                                              this.data = data;
                                                                                              this.nearByShops = data.shop;
                                                                                              this.userEmail = data.userEmail;
                                                                                              this.userId = data.userId;
                                                                                              this.userName = data.userName;
                                                                                              });
this.isUserPage = true;
this.isNearByShopsPage = true;
this.isLikedShopsPage = false;
this.isConnectionPage = false;
// raffraichissement
this.refresh();
}
}
public getMyLikedShops() {
this.urlLikedShops = 'user/likedShops/' + this.userId + '/';
this._http.get( this.urlLikedShops ).map((res: Response) => res.json()).subscribe(data => {
                                                                                           this.data = data;
                                                                                           this.likedShops = data.shop;
                                                                                          });
this.isConnectionPage = false;
this.isNearByShopsPage = false;
this.isLikedShopsPage = true;
this.isUserPage = true;
// rafraichissement
this.refresh();
}
public likeShop(url) {
// this.likedShops = this.getData(url);
this._http.get( url ).map((res: Response) => res.json()).subscribe(data => {
                                                                            this.data = data;
                                                                            this.likedShops = data.shop;
                                                                            });
    this.isConnectionPage = false;
    this.isNearByShopsPage = false;
    this.isLikedShopsPage = true;
    // rafraichissement
    this.refresh();
}
public disLikeShop(url) {
    this._http.get( url ).map((res: Response) => res.json()).subscribe(data => {
                                                                                this.data = data;
                                                                                this.likedShops = data.shop;
                                                                               });
    this.isConnectionPage = false;
    this.isNearByShopsPage = false;
    this.isLikedShopsPage = true;
    // raffraichissement
    this.refresh();
}

public connection() {
if (  navigator.geolocation) {
  console.log(' geolocalisation navigator');
  navigator.geolocation.getCurrentPosition(position => {
    this.latUser = position.coords.latitude;
    this.lonUser = position.coords.longitude;
    this.urlNearByShops = '/user/connectionUser/' + this.email + '/' + this.pass + '/' + this.latUser + '/' + this.lonUser + '/';

    this._http.get( this.urlNearByShops ).map((res: Response) => res.json()).subscribe(data => {
                                                                                                console.log('subscribe data');
                                                                                                this.data = data;
                                                                                                this.nearByShops = data.shop;
                                                                                                this.userEmail = data.userEmail;
                                                                                                this.userId = data.userId;
                                                                                                this.userName = data.userName;

                                                                                                this.isUserPage = true;
                                                                                                this.isNearByShopsPage = true;
                                                                                                this.isLikedShopsPage = false;
                                                                                                this.isConnectionPage = false;
                                                                                                this.refresh();
                                                                                               });

                                                           });
  }else {
    this.lonUser = -6.81134;
    this.latUser = 33.95564;
    this.urlNearByShops = '/user/connectionUser/' + this.email + '/' + this.pass + '/' + this.latUser + '/' + this.lonUser + '/';
    this._http.get( this.urlNearByShops ).map((res: Response) => res.json()).subscribe(data => {
                                                                                                this.data = data;
                                                                                                this.nearByShops = data.shop;
                                                                                                this.userEmail = data.userEmail;
                                                                                                this.userId = data.userId;
                                                                                                this.userName = data.userName;

                                                                                                this.isUserPage = true;
                                                                                                this.isNearByShopsPage = true;
                                                                                                this.isLikedShopsPage = false;
                                                                                                this.isConnectionPage = false;

                                                                                                this.refresh();
                                                                                               });

        }
}
// the function to set position is there , but never use because javascript is not good for call back function !!
private setPosition() {
    if (navigator.geolocation) {
       navigator.geolocation.getCurrentPosition(position => {
       this.latUser = position.coords.latitude;
       this.lonUser = position.coords.longitude;
       this.refresh();
                                                            });
}else {
  this.latUser = -6.81134;
  this.lonUser = 33.95564;
      }
}
public deconnection() {

    this.email = '';
    this.pass = '';
    this.userId = '';
    this.userName = '';
    this.userEmail = '';

    this.lonUser = -6.81134;
    this.latUser = 33.95564;
    this.coordMap = '';

    this.urlNearByShops = '';
    this.urlLikedShops = '';

    this.isConnectionPage = true;
    this.isNearByShopsPage = false;
    this.isLikedShopsPage = false;
    this.isUserPage = false;

    this.nearByShops = null;
    this.likedShops = null;
    this.shop = null;

    this.data = null;

    // rafraichissement
    this.refresh();
    this.constructor(this._http);
}
  /*
  we realise that angular doesnt take changement immediatly
  he need to reed values before apply in the views
  we create this function,only to reread values
  So this function is used to say to angular :" don't forget to remember the new values"
  */
private refresh() {
console.log('debut refresh');
 this.latUser = this.latUser;
 this.lonUser = this.lonUser;
 this.coordMap = this.coordMap;
 this.email = this.email;
 this.pass = this.pass;
 this.userId = this.userId;
 this.userName = this.userName;
 this.userEmail = this.userEmail;
 // les différents liens pour récuperer les data.
 this.urlNearByShops = this.urlNearByShops;
 this.urlLikedShops = this.urlLikedShops;
 // gestion de l'affichage des pages !
 this.isConnectionPage = this.isConnectionPage;
 this.isNearByShopsPage = this.isNearByShopsPage;
 this.isLikedShopsPage = this.isLikedShopsPage;
 // déclaration des tableaux pour recevoir les différents shops
 this.nearByShops = this.nearByShops;
 this.likedShops = this.likedShops;

 this.data = this.data;
 console.log('fin de reffresh');
  }
 }




