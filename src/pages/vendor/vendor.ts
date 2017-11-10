import { Component, ViewChild } from '@angular/core';
import { IonicPage,MenuController,NavController } from 'ionic-angular';
import { IScrollTab, ScrollTabsComponent } from '../../components/scrolltabs';

@IonicPage()
@Component({
  selector: 'page-vendor',
  templateUrl: 'vendor.html',
})
export class VendorPage {
  tabs: IScrollTab[] = [
    {
      name: 'Offers'
    },
    {
      name: 'Persons'
    },
    {
      name: 'Department'
    },
    {
      name: 'Finance'
    },
    {
      name: 'Analysis'
    },
  
  ];
  selectedTab: IScrollTab;
  @ViewChild('scrollTab') scrollTab: ScrollTabsComponent;
  constructor( menu: MenuController, public navCtrl: NavController, ) {
    menu.enable(true);
}

  ionViewDidEnter() {
    this.scrollTab.go2Tab(0);
  }

  tabChange(data: any) {
    this.selectedTab = data.selectedTab;
  
  }
 /*
  Offer Form Page from fab button
  */ 
  add_offer() {
    this.navCtrl.push('VAddofferPage');
       // this.navCtrl.push(AddofferPage);
     }
  /** 
   * Control swipeEvent to make swipe between tabs
  */
  /*swipeEvent($e) {
    console.log('before', $e.direction);
    switch ($e.direction) {
      case 2: // left
        this.scrollTab.nextTab();
        break;
      case 4: // right
        this.scrollTab.prevTab();
        break;
    }
  }*/
}
