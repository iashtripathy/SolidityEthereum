import { Web3Service } from './../../../../../lottery-contract/src/app/web3/web3.service';
import { LocalcopyService } from './../../lotterylocalcopy/localcopy.service';
import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.css']
})
export class MainPageComponent implements OnInit {
  private manager:any;
  private players:any;
  private balance:any;
  private web3:any;
  //public lottery: any;
  constructor(private lotteryContactCopy:LocalcopyService,private web3service:Web3Service) {
    this.web3 = this.web3service.getweb3Instance();
  }
  lottery = this.lotteryContactCopy.getContractInstance();

  ngOnInit() {
    this.calling();
  }
  async calling(){
    this.manager = await this.lottery.methods.manager().call();
    this.players = await this.lottery.methods.getPlayers().call();
    this.balance = await this.web3.eth.getBalance(this.lottery.options.address);
    console.log(this.manager);
  }
  //c = "hello";


}
