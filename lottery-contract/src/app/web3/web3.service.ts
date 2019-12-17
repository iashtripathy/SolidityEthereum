import { Injectable } from '@angular/core';
const Web3 = require('web3');
//import Web3 from 'web3';
declare let window: any;
declare let require: any;
@Injectable({
  providedIn: 'root'
})
export class Web3Service {
  public web3: any;
  constructor() {
    if(typeof window.web3 !== 'undefined'){
      this.web3 = new Web3(window.web3.currentProvider);
      console.log("Metamask is found");
      console.log(this.web3.version);
    }
    console.log("web3 service called");

  }
}
