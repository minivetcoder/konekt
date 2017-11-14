import { NgModule, CUSTOM_ELEMENTS_SCHEMA,NO_ERRORS_SCHEMA } from '@angular/core';
import { IonicModule } from 'ionic-angular';
import { AddofferComponent } from './addoffer';
import { File } from '@ionic-native/file';
import { Transfer, TransferObject } from '@ionic-native/transfer';
import { FilePath } from '@ionic-native/file-path';
import { Camera } from '@ionic-native/camera';
import { ReactiveFormsModule } from '@angular/forms';
// import { CompanyProvider } from '../../providers/company/company';
@NgModule({
	imports: [
		IonicModule,ReactiveFormsModule
	],
	declarations: [
		AddofferComponent
	],
	exports: [
		AddofferComponent
    ],
	providers:[AddofferComponent,File,Transfer,TransferObject,FilePath,Camera],
	schemas:[CUSTOM_ELEMENTS_SCHEMA,NO_ERRORS_SCHEMA ]
})
export class AddofferComponentModule {}