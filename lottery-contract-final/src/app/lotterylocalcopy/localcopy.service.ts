import { Web3Service } from './../web3/web3.service';
import { Injectable } from '@angular/core';

//declare const web3:any;
@Injectable({
  providedIn: 'root'
})
export class LocalcopyService {
  public  address: any;
  public abi: any;
  public web3:any;
  constructor(private web3service:Web3Service) {
    this.address = '0x1f5c11577c7A7B16Cd90b3299e3DaF35360eB627';
    this.abi = [{"constant":true,"inputs":[],"name":"manager","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[],"name":"pickWinner","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"getPlayers","outputs":[{"name":"","type":"address[]"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[],"name":"enter","outputs":[],"payable":true,"stateMutability":"payable","type":"function"},{"constant":true,"inputs":[{"name":"","type":"uint256"}],"name":"players","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"inputs":[],"payable":false,"stateMutability":"nonpayable","type":"constructor"}];
  }
  getContractInstance(){
    this.web3 = this.web3service.getweb3Instance();
    console.log(this.web3.eth);
    return new this.web3.eth.Contract(this.abi,this.address);
  }
}
