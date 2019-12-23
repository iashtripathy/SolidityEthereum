import { Web3Service } from './web3/web3.service';
import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  constructor(/* private web3:Web3Service */){

  }
  title = 'lottery-contract';
}
