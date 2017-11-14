import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import 'rxjs/add/operator/map';

let apiUrl = 'http://demo.minivetsystem.com/konekt/api/v1/';

@Injectable()
export class AuthService {

  constructor(public http: Http) { }

  login(credentials) {
    return new Promise((resolve, reject) => {
      let headers = new Headers();
      headers.append('Content-Type', 'application/json');
      headers.append('Authorization', 'Basic ' + btoa('admin:123456'));
      let url = apiUrl + 'user/login';
      let data = credentials;

      this.http.post(url, data, { headers: headers })
        .subscribe(res => {
          resolve(res.json());
        }, (err) => {
          reject(err);
          console.log(err);
        });
    });
  }

  register(credentials) {
    return new Promise((resolve, reject) => {
      let headers = new Headers();
      headers.append('Content-Type', 'application/json');
      headers.append('Authorization', 'Basic ' + btoa('admin:123456'));
      let userRegData = {
        first_name: credentials.first_name,
        last_name: credentials.last_name,
        email: credentials.email,
        phone: credentials.phone,
        date_of_birth: credentials.date_of_birth,
        password: credentials.password,
        confirm_password: credentials.confirm_password,
        user_house_nubmer: credentials.user_house_nubmer,
        user_country: credentials.user_country.id,
        user_city: credentials.user_city.id,
        user_state: credentials.user_state.id,
        user_street: credentials.user_street,
        user_zip: credentials.user_zip,
        user_bank: credentials.user_bank,
        user_bank_accout: credentials.user_bank_accout,
        user_tax_number: credentials.user_tax_number,
        gender: credentials.gender,
        is_vendor: credentials.is_vendor,
        company_name: credentials.company_name,
        company_email: credentials.company_email
      };
      let url = apiUrl + 'user/register';
      let data = userRegData;
      console.log('promise', data);
      this.http.post(url, data, { headers: headers })
        .subscribe(res => {
          resolve(res.json());
        }, (err) => {
          reject(err);
        });
    });
  }

  logout(credentials) {
    return new Promise((resolve, reject) => {
      let headers = new Headers();
      headers.append('Content-Type', 'application/json');
      headers.append('Authorization', 'Basic ' + btoa('admin:123456'));

      let url = apiUrl + 'user/logout';
      let data = credentials;
      this.http.post(url, data, { headers: headers })
        .subscribe(res => {
          localStorage.clear();
          resolve(res.json());
        }, (err) => {  reject(err);
        });
    });
  }

  // validateLoggedInUser(credentials) {

  //    return new Promise((resolve, reject) => {
  //        let headers = new Headers();
  //        headers.append('Content-Type', 'application/json');
  //        headers.append('Authorization', 'Basic ' +  btoa('admin:123456')); 
  //        let url = apiUrl+'user/login';
  //        let data  = credentials;        

  //        this.http.post(url, data, {headers:headers})
  //          .subscribe(res => {
  //            resolve(res.json());
  //          }, (err) => {
  //            reject(err);
  //            console.log(err);
  //          });
  //    });
  //  }
}