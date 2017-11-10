import { NgModule } from '@angular/core';
import { IonicModule } from 'ionic-angular';
import { VOffersComponent } from './v-offers';
import { CompanyProvider } from '../../providers/company/company';
@NgModule({
	imports: [
		IonicModule
	],
	declarations: [
		VOffersComponent
	],
	exports: [
		VOffersComponent
    ],
    providers:[CompanyProvider]
})
export class VOffersComponentModule {}