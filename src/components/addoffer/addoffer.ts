import { Component } from '@angular/core';
import { NavController, ActionSheetController, ToastController, Platform, LoadingController, Loading, NavParams } from 'ionic-angular';
import { File } from '@ionic-native/file';
import { Transfer, TransferObject } from '@ionic-native/transfer';
import { FilePath } from '@ionic-native/file-path';
import { Camera } from '@ionic-native/camera';
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
  constructor(public navCtrl: NavController, private camera: Camera, private transfer: Transfer, private file: File, private filePath: FilePath, public actionSheetCtrl: ActionSheetController, public toastCtrl: ToastController, public platform: Platform, public loadingCtrl: LoadingController, public navParams: NavParams) {
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

  public uploadImage() {
    // Destination URL
    var url = "http://yoururl/upload.php";

    // File for Upload
    var targetPath = this.pathForImage(this.lastImage);

    // File name only
    var filename = this.lastImage;

    var options = {
      fileKey: "file",
      fileName: filename,
      chunkedMode: false,
      mimeType: "multipart/form-data",
      params: { 'fileName': filename }
    };

    const fileTransfer: TransferObject = this.transfer.create();

    this.loading = this.loadingCtrl.create({
      content: 'Uploading...',
    });
    this.loading.present();

    // Use the FileTransfer to upload the image
    fileTransfer.upload(targetPath, url, options).then(data => {
      this.loading.dismissAll()
      this.presentToast('Image succesful uploaded.');
    }, err => {
      this.loading.dismissAll()
      this.presentToast('Error while uploading file.');
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
}