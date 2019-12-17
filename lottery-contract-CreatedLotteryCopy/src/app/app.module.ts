import { LocalcopyService } from './lotterylocalcopy/localcopy.service';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { Web3Service } from './web3/web3.service';
import { MainPageComponent } from './contractUX/main-page/main-page.component';

@NgModule({
  declarations: [
    AppComponent,
    MainPageComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [
    Web3Service,
    LocalcopyService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
