import { Web3Service } from './../../../../../lottery-contract/src/app/web3/web3.service';
import { LocalcopyService } from './../../lotterylocalcopy/localcopy.service';
import { Component, OnInit } from '@angular/core';
import { onErrorResumeNext } from 'rxjs';

let accounts=[
  '0x3957060545b51ABF16B981a6f2D418110Ce13A4d',
  '0xfb750a2537Ae4a6DCabB152a2973d6Ce804615e5',//correct
  '0x299199dD916fADCe4B5A3922f0c372a26fd79b42',
  '0x52A3E85Bc6370616ad8d9A9d4BBDEF66679Ae6CA',
  '0x35f818228F8e41d267B553347cBd2CA8dDD0754c',
  '0x8fb7c9f27c2580D4775ec337781a013748Ee3756',
  '0xAD9B3c9787b7afdfE169e19ca49495669a5Ee239',
  '0x388a0ADccAA0719969456656069a1A799d26BE28',
  '0xbDFdf4226E48E66f5B25c1E30ee73f6aA2439419',
  '0x986450598F278FA4749A780D6e5805d815fe93b4',
  '0x4Cc9F6Af545952D922F0bf3A5814e58faf884DaC',
  '0x93a585B390Fd84D3dC28F7cD379c608626c74a2c',
  '0x7E2719E739b24727a5faA4E16B44ABC0920C57CD'
]
declare let window:any;
@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.css']
})
export class MainPageComponent implements OnInit {
  private manager:any;
  private players: [];
  private playersLength:any;
  private balance:any;
  private web3:any;
  private amount:any;
  public lottery: any;
  private error:any;

  //private accounts:any;
  constructor(private lotteryContactCopy:LocalcopyService,private web3service:Web3Service) {
    this.web3 = this.web3service.getweb3Instance();
    //this.web3 = this.lotteryContactCopy.web3;
    console.log("this.web3");
    console.log(this.web3);//undefined
    this.lottery = this.lotteryContactCopy.getContractInstance();
    this.calling();
  }

/*ngOnInit function is called after a component is
  fully initialized ie:after MainPageComponent class
  object is created and all the variables above
  constructor are defined
*/
/*   ngOnInit() {
    console.log("Next");
    console.log(this.web3.eth);
    this.calling();
  } */
  ngOnInit(){
    //this.calling();
  }
  async calling(){
    this.manager = await this.lottery.methods.manager().call();
    this.players = await this.lottery.methods.getPlayers().call();
    this.balance = this.web3.utils.fromWei(await this.web3.eth.getBalance(this.lottery.options.address),'ether');
    //console.log(await this.web3.eth.getAccounts());
    //this.accounts = await this.web3.eth.getAccounts();
    /* for(let x= 0){

    } */
    //this.web3service.window
    //window.ethereum.enable();
    /* console.log(await this.lottery.methods.enter().send({
      from: accounts[1],
      value: this.web3.utils.toWei('0.02','ether')
    })); */

    console.log(accounts);
    this.playersLength = this.players.length;
    console.log(this.manager===accounts[0])
    console.log(this.manager);
    console.log(this.playersLength);
    console.log(accounts[1]);
    /* console.log("Balance");
    console.log(this.balance); */
    //console.log(this.players.length);
    //console.log(this.accounts.length);
    //console.log(this.amount);

    /* for(var x=0;x<this.accounts.length;x++){
      console.log(this.accounts[x]);
    } */
    if(this.playersLength === 3){
      await this.lottery.methods.pickWinner().send({
        from: accounts[0]
      });
    }

    //this.pickWinner();
  }
  //c = "hello";

  public called(value:number){
    this.submit(value);
    console.log("Players Length");
    console.log(this.playersLength);
    //console.log(this.amount);
    console.log(value);
  }
  //public y = setTimeout(this.submit,0);
  public async submit(val:number){
    this.amount = val;
    try{
      await this.lottery.methods.enter().send({
        from: accounts[2],
        value: this.web3.utils.toWei(this.amount,'ether')
      })
      this.players = await this.lottery.methods.getPlayers().call();
      this.playersLength = this.players.length;


    }
    catch(e){
      /* setTimeout(function(){
        console.log(e);
      },5000); */
      this.error = e;
      console.log(e);
    }

  }
  /* public pick(){
    this.pickWinner();
  } */
  //public pick = setTimeout(this.pickingWinner,2000);
  /* public async pickingWinner(){
    console.log("Inside");
    try{
      await this.lottery.methods.pickWinner().send({
        from: accounts[0]
      });
    }
    catch(e){
      console.log(e);
      //document.write(e);
    }


  } */
}

