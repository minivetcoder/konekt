import { Component } from '@angular/core';
import { NavController, NavParams, LoadingController } from 'ionic-angular';
import { CompanyProvider } from '../../providers/company/company';

/**
 * Generated class for the VOffersComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'v-offers',
  templateUrl: 'v-offers.html'
})
export class VOffersComponent {

  information: any;
  loading: any;
  alreadyLoaded: boolean = false;
  constructor(public navCtrl: NavController, public navParams: NavParams, public companyprovider: CompanyProvider, public loadingCtrl: LoadingController) {
    // let localData = http.get('assets/information.json').map(res => res.json().items);
    // localData.subscribe(data => {
    //   this.information = data;
    // })
    this.showLoader();
    this.companyprovider.company_dept(localStorage.getItem('company_id'), localStorage.getItem('token')).then((result) => {
      this.loading.dismiss();
      this.information = result;
    }, (err) => {
      this.loading.dismiss();
      console.log("Observable Instance error :", err)
    });
  }
  toggleSection(i) {
    //console.log(this.information[i]);
    // console.log('toggle'+ this.information[i].department_name);
    this.information[i].open = !this.information[i].open;
    if(this.information[i].open){this.showLoader();}
     //  this.information[i].mydata = "jasbirsingh"+this.information[i].department_name;
    //  console.log(this.things);
    this.companyprovider.company_dept_offers(this.information[i].company_id, this.information[i].id, localStorage.getItem('token')).then((result) => {
      // this.information = result;
      this.information[i].offers = result;
      this.information[i].cofferlength = isset(() => Object.keys(this.information[i].offers.length)) ? 1 : 0;
      this.loading.dismiss();
    }, (err) => {
      console.log("Observable Instance error :", err)
    });
  }

  // if there are further children toggle data
  toggleItem(i, j) {
    this.information[i].children[j].open = !this.information[i].children[j].open;
  }

  ionViewDidLoad() { }
  ionViewWillLeave() { this.loading.dismiss(); }
  ionViewWillEnter() {
    if (!this.alreadyLoaded) {
      this.showLoader();
      this.alreadyLoaded = true;
    } else {
      this.loading.dismiss();
    }

  }
  showLoader() {
    this.loading = this.loadingCtrl.create({
      content: 'Loading...'
    });

    this.loading.present();
  }

 

}
/*
UDF : Check Object has property
*/
function isset(fn: () => any) {
  let result;

  try {
    result = fn();
  } catch (ex) {
    result = undefined;
  } finally {
    return result !== undefined;
  }

}
