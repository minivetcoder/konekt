import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Headers, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/map';

// let apiUrl = 'http://192.168.0.4/konekt/api/v1/';
let apiUrl = 'http://demo.minivetsystem.com/konekt/api/v1/';
@Injectable()
export class CompanyProvider {

  constructor(public http: Http) {
    // console.log('Company Provider');
    //http://demo.minivetsystem.com/konekt/api/v1/company/1/department/7/offers?token=ANKQYVFOQK68CZOS
  }
  company_dept(cid, token) {
    return new Promise((resolve, reject) => {
      let headers = new Headers();
      headers.append('Content-Type', 'application/json');
      headers.append('Authorization', 'Basic ' + btoa('admin:123456'));
      let url = apiUrl + 'company/' + cid + '/departments?token=' + token;
      // let data  = countryname;        
      let options = new RequestOptions({ headers: headers });
      this.http.get(url, options)
        .subscribe(res => {
          resolve(res.json().departments);
          //console.log("000",res.json().message);
        }, (err) => {
          reject(err);
          console.log(err);
        });
    });
  }

  company_dept_offers(cid, deptid, token) {
    return new Promise((resolve, reject) => {
      let headers = new Headers();
      headers.append('Content-Type', 'application/json');
      headers.append('Authorization', 'Basic ' + btoa('admin:123456'));
      let url = apiUrl + 'company/' + cid + '/department/' + deptid + '/offers?token=' + token;        
      let options = new RequestOptions({ headers: headers });
      this.http.get(url, options)
        .subscribe(res => {
          resolve(res.json().offers);
          //console.log("000",res.json().message);
        }, (err) => {
          reject(err);
          console.log(err);
        });
    });
  }
}