import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Headers, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/map';

// let apiUrl = 'http://192.168.0.4/konekt/api/v1/';
let apiUrl = 'http://demo.minivetsystem.com/konekt/api/v1/';
@Injectable()
export class CountryProvider {

  constructor(public http: Http) {
    // console.log('Hello CountryProvider Provider');
  }
  // getPorts1(countryname) {

  //    return new Promise((resolve, reject) => {
  //        let headers = new Headers();
  //        headers.append('Content-Type', 'application/json');
  //        headers.append('Authorization', 'Basic ' +  btoa('admin:123456')); 
  //        let url = apiUrl+'countries';
  //        let data  = countryname;        

  //        this.http.get(url, data)
  //          .subscribe(res => {
  //            resolve(res.arrayBuffer());
  //          }, (err) => {
  //            reject(err);
  //            console.log(err);
  //          });
  //    });
  //  }

  allcountries() {
    return new Promise((resolve, reject) => {
      let headers = new Headers();
      headers.append('Content-Type', 'application/json');
      headers.append('Authorization', 'Basic ' + btoa('admin:123456'));
      let url = apiUrl + 'countries';
      // let data  = countryname;        
      let options = new RequestOptions({ headers: headers });
      this.http.get(url, options)
        .subscribe(res => {
          resolve(res.json().countries);
          //console.log("000",res.json().message);
        }, (err) => {
          reject(err);
          console.log(err);
        });
    });
  }

  allstates(cid) {
    return new Promise((resolve, reject) => {
      let headers = new Headers();
      headers.append('Content-Type', 'application/json');
      headers.append('Authorization', 'Basic ' + btoa('admin:123456'));
      let url = apiUrl + 'country/' + cid + '/states';
      // let data  = countryname;    

      let options = new RequestOptions({ headers: headers });
      this.http.get(url, options)
        .subscribe(res => {
          resolve(res.json().states);
          console.log("000-  ", cid);
        }, (err) => {
          reject(err);
          console.log("fromcountryService", err);
        });
    });
  }
  allcities(sid) {
    return new Promise((resolve, reject) => {
      let headers = new Headers();
      headers.append('Content-Type', 'application/json');
      headers.append('Authorization', 'Basic ' + btoa('admin:123456'));
      let url = apiUrl + 'state/' + sid + '/cities';
      // let data  = countryname;    

      let options = new RequestOptions({ headers: headers });
      this.http.get(url, options)
        .subscribe(res => {
          resolve(res.json().cities);
          // console.log("000-  ",cid);
        }, (err) => {
          reject(err);
          console.log("fromcountryService", err);
        });
    });
  }
}