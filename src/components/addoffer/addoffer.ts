import { Component } from '@angular/core';
import { NavController, ActionSheetController, ToastController, Platform, LoadingController, Loading, NavParams } from 'ionic-angular';
import { File } from '@ionic-native/file';
import { Transfer, TransferObject } from '@ionic-native/transfer';
import { FilePath } from '@ionic-native/file-path';
import { Camera } from '@ionic-native/camera';
import { FormBuilder, Validators } from '@angular/forms';
// import { ValidationService } from '../../providers/validation/validation';
declare var cordova: any;
@Component({
  selector: 'addoffer',
  templateUrl: 'addoffer.html'
})
export class AddofferComponent {
  lastImage: string = null;
  first_Image: string = null;
  second_Image: string = null;
  third_Image: string = null;
  fourth_Image: string = null;
  cur_first_Image: string = null;
  cur_second_Image: string = null;
  cur_third_Image: string = null;
  cur_fourth_Image: string = null;
  loading: Loading;
  addofferForm: any;
  fieldArray: Array<any> = [];
  tempfieldArray: any = {};
  newAttribute: any = {};
  bonusby: any;
  // 'email': ['', [Validators.required, ValidationService.emailValidator]],
  //'bonus': ['', [Validators.required, Validators.minLength(10)]]
  constructor(public navCtrl: NavController, private camera: Camera, private transfer: Transfer, private file: File, private filePath: FilePath, public actionSheetCtrl: ActionSheetController, public toastCtrl: ToastController, public platform: Platform, public loadingCtrl: LoadingController, public navParams: NavParams, private formBuilder: FormBuilder) {
    this.bonusby = "dynamic";
    this.addofferForm = this.formBuilder.group({
      'offertitle': ['', Validators.required],
      'productname': ['', Validators.required],
      'internalcode': ['', Validators.required],
      'bonus': ['', Validators.required],
      'bonusby': ['', Validators.required],
      'mcategory': ['', Validators.required],
      'category': ['', Validators.required],
      'subcategory': ['', Validators.required],
      'brand': ['', Validators.required],
      'department': ['', Validators.required],
      'offerstartdate': ['', Validators.required],
      'offerenddate': ['', Validators.required],
      'offerdesc': ['', Validators.required],
      'delwarranty': ['', Validators.required],
      'offerspecs': ['', Validators.required],
      'offeraddinfo': ['', Validators.required],
      'newAttribute': ['']
    });
  }


  ionViewDidLoad() { console.log('ionViewDidLoad AddofferPage'); }
  public presentActionSheet(imgorder) {
    let actionSheet = this.actionSheetCtrl.create({
      title: 'Select Image Source',
      buttons: [
        {
          text: 'Load from Library',
          handler: () => {
            this.takePicture(this.camera.PictureSourceType.PHOTOLIBRARY, imgorder);
          }
        },
        {
          text: 'Use Camera',
          handler: () => {
            this.takePicture(this.camera.PictureSourceType.CAMERA, imgorder);
          }
        },
        {
          text: 'Cancel',
          role: 'cancel'
        }
      ]
    });
    actionSheet.present();
  }

  public takePicture(sourceType, imgorder) {
    // Create options for the Camera Dialog
    var options = {
      quality: 100,
      sourceType: sourceType,
      saveToPhotoAlbum: false,
      correctOrientation: true
    };

    // Get the data of an image
    this.camera.getPicture(options).then((imagePath) => {
      // Special handling for Android library
      if (this.platform.is('android') && sourceType === this.camera.PictureSourceType.PHOTOLIBRARY) {
        this.filePath.resolveNativePath(imagePath)
          .then(filePath => {
            let correctPath = filePath.substr(0, filePath.lastIndexOf('/') + 1);
            let currentName = imagePath.substring(imagePath.lastIndexOf('/') + 1, imagePath.lastIndexOf('?'));
            this.copyFileToLocalDir(correctPath, currentName, this.createFileName(), imgorder);
          });
      } else {
        var currentName = imagePath.substr(imagePath.lastIndexOf('/') + 1);
        var correctPath = imagePath.substr(0, imagePath.lastIndexOf('/') + 1);
        this.copyFileToLocalDir(correctPath, currentName, this.createFileName(), imgorder);
      }
    }, (err) => {
      this.presentToast('Error while selecting image.');
    });
  }

  // Create a new name for the image
  private createFileName() {
    var d = new Date(),
      n = d.getTime(),
      newFileName = n + ".jpg";
    return newFileName;
  }

  // Copy the image to a local folder
  private copyFileToLocalDir(namePath, currentName, newFileName, imgorder) {
    this.file.copyFile(namePath, currentName, cordova.file.dataDirectory, newFileName).then(success => {

      switch (imgorder) {
        case 1: {
          this.first_Image = newFileName;
          this.cur_first_Image = currentName;
          break;
        }

        case 2: {
          this.second_Image = newFileName;
          this.cur_second_Image = currentName;
          break;
        }

        case 3: {
          this.third_Image = newFileName;
          this.cur_third_Image = currentName;
          break;
        }

        case 4: {
          this.fourth_Image = newFileName;
          this.cur_fourth_Image = currentName;
          break;
        }

        default: {
          console.log("Invalid choice");
          break;
        }
      }
      this.lastImage = newFileName;
    }, error => {
      this.presentToast('Error while storing file.');
    });
  }

  private presentToast(text) {
    let toast = this.toastCtrl.create({
      message: text,
      duration: 3000,
      position: 'top'
    });
    toast.present();
  }

  // Always get the accurate path to your apps folder
  public pathForImage(img) {
    if (img === null) {
      return '';
    } else {
      return cordova.file.dataDirectory + img;
    }
  }

  public uploadImage(imgorder) {
    // select image upload on click
    var ccimg: string;
    switch (imgorder) {
      case 1: {
        ccimg = this.first_Image;
        break;
      }
      case 2: {
        ccimg = this.second_Image;
        break;
      }
      case 3: {
        ccimg = this.third_Image;
        break;
      }
      case 4: {
        ccimg = this.fourth_Image;
        break;
      }
      default: {
        console.log("Invalid choice");
        break;
      }
    }
    // Destination URL
    var url = "http://demo.minivetsystem.com/konekt/api/v1/offer/temp_image/upload?token=" + localStorage.getItem('token');
    var uri = encodeURI(url);
    // File for Upload
    var targetPath = this.pathForImage(ccimg);

    // File name only
    var filename = ccimg;
    var options = {
      fileKey: "image",
      fileName: filename,
      chunkedMode: false,
      mimeType: "multipart/form-data",
      headers: { 'Authorization': 'Basic YWRtaW46MTIzNDU2' },
      params: { 'fileName': filename  }
    };

    const fileTransfer: TransferObject = this.transfer.create();

    this.loading = this.loadingCtrl.create({
      content: 'Uploading...',
    });
    this.loading.present();
    // Use the FileTransfer to upload the image
    fileTransfer.upload(targetPath, uri, options).then(data => {
      this.loading.dismissAll()
      this.presentToast('Image succesful uploaded.');
    }, err => {
      this.loading.dismissAll()
      this.presentToast('Error while uploading file.' + err);
    });
  }
  delete(imgorder) {
    switch (imgorder) {
      case 1: {
        this.first_Image = null;
        this.cur_first_Image = null;
        break;
      }

      case 2: {
        this.second_Image = null;
        this.cur_second_Image = null;
        break;
      }

      case 3: {
        this.third_Image = null;
        this.cur_third_Image = null;
        break;
      }

      case 4: {
        this.fourth_Image = null;
        this.cur_fourth_Image = null;
        break;
      }

      default: {
        console.log("Invalid choice");
        break;
      }
    }
  }
  addFieldValue() {
    console.log(this.newAttribute);
    if (typeof this.newAttribute.chartics !== 'undefined' && this.newAttribute.chartics !== '') {
      this.fieldArray.push(this.newAttribute)
      this.newAttribute = {};
      this.newAttribute.chartics = "";
    } else {
      console.log(this.newAttribute.chartics);
    }

  }

  deleteFieldValue(index) {
    this.fieldArray.splice(index, 1);
  }

  saveOfferDetails() {
    if (this.addofferForm.dirty && this.addofferForm.valid) {
      if (this.addofferForm.value.newAttribute !== '') {
        this.fieldArray.push(this.addofferForm.value.newAttribute);
      }
      var i = 0;
      for (i = 0; i < this.fieldArray.length; i++) {
        this.tempfieldArray[i] = this.fieldArray[i]['chartics'];
      }
      var offerData = {
        offer_title: this.addofferForm.value.offertitle,
        product_name: this.addofferForm.value.productname,
        internal_code: this.addofferForm.value.internalcode,
        offer_bonus: this.addofferForm.value.bonus,
        offer_bonus_type: this.addofferForm.value.bonusby,
        offer_main_category: this.addofferForm.value.mcategory,
        offer_category: this.addofferForm.value.category,
        category_id: this.addofferForm.value.subcategory,
        brand_id: this.addofferForm.value.brand,
        department_id: this.addofferForm.value.department,
        start_date: this.addofferForm.value.offerstartdate,
        end_date: this.addofferForm.value.offerenddate,
        characteristics: JSON.stringify(this.tempfieldArray),
        offer_description: this.addofferForm.value.offerdesc,
        delivery_warranty: this.addofferForm.value.delwarranty,
        specification: this.addofferForm.value.offerspecs,
        additional_info: this.addofferForm.value.offeraddinfo,

      };
// send data to service
    }
  }
}