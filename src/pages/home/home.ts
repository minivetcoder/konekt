import { Component, ViewChild } from '@angular/core';
import { IonicPage,NavController, Slides,ToastController  } from 'ionic-angular';
// import { Network } from '@ionic-native/network';
import { Subscription } from 'rxjs/Subscription'
@IonicPage()
@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
  providers: [Slides]
})
export class HomePage {
  logo: String;
  disconnectSubscription:Subscription;
  @ViewChild(Slides) slides: Slides;

  // constructor(public navCtrl: NavController, private network: Network, public toastCtrl: ToastController) {
    constructor(public navCtrl: NavController,  public toastCtrl: ToastController) {
    this.logo = 'assets/imgs/logo-big.png';
          // // watch network for a connection
      // let connectSubscription = this.network.onConnect().subscribe(() => {
      //   console.log('network connected!');
      //   // We just got a connection but we need to wait briefly
      //   // before we determine the connection type. Might need to wait.
      //   // prior to doing any api requests as well.
      //   setTimeout(() => {
      //     if (this.network.type === 'wifi') {
      //       console.log('we got a wifi connection, woohoo!');
      //     }
      //   }, 3000);
      // });

      // // stop connect watch
      // connectSubscription.unsubscribe();

  }
 ionViewWillLeave(){
   // stop disconnect watch
  // this.disconnectSubscription.unsubscribe();
 }
  goToSlide() {
    this.slides.slideTo(2, 500);
  }
  ionViewDidEnter() {
   // watch network for a disconnect
  //  this.disconnectSubscription = this.network.onDisconnect().subscribe(()=>{
  //         this.presentToast();
  //   });
   }

  showLoginPage() {
    //validate user if already logged in 
    // localStorage.getItem('token');
    // localStorage.getItem('user_id');   
    //temporary code must redo with  promise
    var token: string = localStorage.getItem('token');
    // var user_id: string = localStorage.getItem('user_id');
    var role_id: number = parseInt(localStorage.getItem('role_id'));
    if (token === null || typeof token === "undefined" || token === "undefined") {
      this.navCtrl.push("LoginPage");
    } else {
      role_id == 3 ? this.navCtrl.setRoot('VendorPage') : this.navCtrl.setRoot('CustomerPage');
    }


  }
  presentToast() {
    const toast = this.toastCtrl.create({
      message: 'Your internet connection appears to be offline. Data integrity is not guaranteed.',
      duration: 3000,
      position: 'middle',
      showCloseButton: true,
      closeButtonText: 'Ok'
    });
  
    toast.onDidDismiss(() => {
      console.log('Dismissed toast');
    });
  
    toast.present();
  }
}
