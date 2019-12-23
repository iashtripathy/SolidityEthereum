import { Injectable } from '@angular/core';
import { callbackify } from 'util';
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
      window.ethereum.enable();
      console.log("Metamask is found");
      console.log(this.web3.version);
      console.log(this.web3.eth);

    }
    console.log("web3 service called");
    this.call();
  }

  async call(){
    console.log("Inside call");
    //console.log(msg.sender)
    //console.log(await this.web3.eth.getAccounts());
  }
  getweb3Instance(){
    return this.web3;
  }
}
