import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { VAddofferPage } from './v-addoffer';
import {AddofferComponentModule} from '../../components/addoffer/addoffer.module';
@NgModule({
  declarations: [
    VAddofferPage,
  ],
  imports: [
    IonicPageModule.forChild(VAddofferPage),AddofferComponentModule
  ],
})
export class VAddofferPageModule {}
