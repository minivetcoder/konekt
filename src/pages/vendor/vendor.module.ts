import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { VendorPage } from './vendor';
import { ScrollTabsComponentModule } from '../../components/scrolltabs/scrolltabs.module';
import { VOffersComponentModule } from '../../components/v-offers/v-offers.module';

@NgModule({
  declarations: [
    VendorPage ,
  ],
  imports: [
    ScrollTabsComponentModule,VOffersComponentModule,
    IonicPageModule.forChild(VendorPage),
  ],
})
export class VendorPageModule {}
