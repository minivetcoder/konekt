import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { IonicPage,NavController, LoadingController, ToastController, AlertController } from 'ionic-angular';
import { AuthService } from '../../providers/auth-service/auth-service';

import { Subscription } from 'rxjs/Subscription'
@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html'
})
export class LoginPage implements OnInit {
  loginlogo: String;
  loading: any;
  disconnectSubscription:Subscription;
  loginData = { email: '', password: '' };
  data: any;
  loginform: FormGroup;
  useremail: FormControl;
  userpass: FormControl;
  constructor(public navCtrl: NavController, public authService: AuthService, public loadingCtrl: LoadingController, private toastCtrl: ToastController, public alertCtrl: AlertController) { this.loginlogo = 'assets/imgs/logo.png'; }
  ngOnInit() {
    this.useremail = new FormControl('', [Validators.required, Validators.email]),
      this.userpass = new FormControl('', Validators.required)
    this.loginform = new FormGroup({
      useremail: this.useremail,
      userpass: this.userpass
    });
  }

  onSubmit = function (userdata) {
    if (this.loginform.valid) {
      this.showLoader();
      this.authService.login(this.loginData).then((result) => {
        this.loading.dismiss();
        this.data = result;
        console.log(result);
        if (!this.data.status) {
          this.showAlert(result);
        } else {
          localStorage.setItem("user_id", this.data.user.id);
          localStorage.setItem("token", this.data.token);
          localStorage.setItem("state_id", this.data.user.profile.state_id);
          if (this.data.user.company) {
            localStorage.setItem("company_id", this.data.user.company.id);
            if (this.data.user.company.employee) {
              localStorage.setItem("company_role_id", this.data.user.company.employee.company_role_id);
            }
          }
          localStorage.setItem("role_id", this.data.user.role_id);
          this.data.user.role.id == 3 ? this.navCtrl.setRoot('VendorPage') : this.navCtrl.setRoot('CustomerPage');
        }
      }, (err) => {
        this.loading.dismiss();
        this.presentToast(err);
      });
    } else {
      this.validateAllFormFields(this.loginform); //{7}
    }
  }
  showAlert(msg) {
    const alert = this.alertCtrl.create({
      title: msg.message,
      subTitle: msg.errors.email === undefined ? msg.errors.password : msg.errors.email,
      buttons: [{
        text: 'Ok',
        handler: () => {
          alert.dismiss();
          // this.navCtrl.pop();
          return false;
        }
      }]
    });

    alert.present();
  }
  //recursive form validator
  validateAllFormFields(formGroup: FormGroup) {       //{1}
    Object.keys(formGroup.controls).forEach(field => {  //{2}
      const control = formGroup.get(field);             //{3}
      if (control instanceof FormControl) {             //{4}
        control.markAsTouched({ onlySelf: true });
      } else if (control instanceof FormGroup) {        //{5}
        this.validateAllFormFields(control);            //{6} 
      }
    });
  }

  register() {
    this.navCtrl.push('RegisterPage');
  }

  showLoader() {
    this.loading = this.loadingCtrl.create({
      content: 'Authenticating...'
    });

    this.loading.present();
  }

  presentToast(msg) {
    let toast = this.toastCtrl.create({
      message: msg,
      duration: 3000,
      position: 'bottom',
      dismissOnPageChange: true
    });

    toast.onDidDismiss(() => {
      console.log('Dismissed toast');
    });

    toast.present();
  }
  ionViewDidEnter() {
    // watch network for a disconnect
    // this.disconnectSubscription = this.network.onDisconnect().subscribe(()=>{
    //        this.ConnectpresentToast();
    //  });
    }
    ionViewWillLeave(){
      // stop disconnect watch
    //  this.disconnectSubscription.unsubscribe();
    }
    ConnectpresentToast() {
      const toast = this.toastCtrl.create({
        message: 'Your internet connection appears to be offline. Data integrity is not guaranteed.',
        duration: 3000,
        position: 'middle',
        showCloseButton: true,
        closeButtonText: 'Ok'
      });
    
      toast.onDidDismiss(() => {
        // console.log('Dismissed toast');
        this.navCtrl.push('HomePage');
      });
    
      toast.present();
    }
}