import { Web3Service } from './../web3/web3.service';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LocalcopyService {
  public  address: any;
  public abi: any;
  constructor(private web3service:Web3Service) {
    this.address = '0x3957060545b51ABF16B981a6f2D418110Ce13A4d';
    this.abi = [{"constant":true,"inputs":[],"name":"manager","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[],"name":"pickWinner","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"getPlayers","outputs":[{"name":"","type":"address[]"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[],"name":"enter","outputs":[],"payable":true,"stateMutability":"payable","type":"function"},{"constant":true,"inputs":[{"name":"","type":"uint256"}],"name":"players","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"inputs":[],"payable":false,"stateMutability":"nonpayable","type":"constructor"}];
  }
  getContractInstance(){
    const web3 = this.web3service.getweb3Instance();
    return new web3.eth.Contract(this.abi,this.address);
  }
}
