import { Component } from '@angular/core';
import { IonicPage, ModalController, NavController } from 'ionic-angular';

import { Item } from '../../models/item';
import { Items } from '../../providers';
import { Storage } from '@ionic/storage';

@IonicPage()
@Component({
  selector: 'page-list-master',
  templateUrl: 'list-master.html'
})
export class ListMasterPage {
  currentItems: Item[];

  constructor(public navCtrl: NavController, public items: Items, public modalCtrl: ModalController,private storage: Storage) {
    this.currentItems = this.items.query();
  }

  /**
   * The view loaded, let's query our items for the list
   */
  ionViewDidLoad() {
  }

  /**
   * Prompt the user to add a new item. This shows our ItemCreatePage in a
   * modal and then adds the new item to our data source if the user created one.
   */
  // setValue(){
  //   this.storage.set("object",this.dataToStore).then((successData)=>{
  //     console.log("Data Stored");
  //     console.log(successData);
  //   })
  // }
  getValue(){
    this.storage.get("object").then((data)=>{
      console.log(data);
    })
  }
  defaultItem: any = {
    "name": "Burt Bear",
    "profilePic": "assets/img/speakers/bear.jpg",
    "about": "Burt is a Bear.",
  };
  loadData(){
    this.storage.set("object",this.defaultItem).then((successData)=>{
      console.log("Data Stored");
      console.log(successData);
    })

      this.storage.get("object").then((data)=>{
        console.log(data);
        let items = data;
      })
      //sthis.items.push(new Item(item));
   //   this.loadData();
  }
  addItem() {
    let addModal = this.modalCtrl.create('ItemCreatePage');
    addModal.onDidDismiss(item => {
      if (item) {
        this.items.add(item);
            this.storage.set("list",this.items.items).then((successData)=>{ })
      }
    })
    addModal.present();
  }

  /**
   * Delete an item from the list of items.
   */
  deleteItem(item) {
    this.items.delete(item);
    this.storage.set("list",this.items.items).then((successData)=>{ })
  }

  /**
   * Navigate to the detail page for this item.
   */
  openItem(item: Item) {
    this.navCtrl.push('ItemDetailPage', {
      item: item
    });
  }
}
