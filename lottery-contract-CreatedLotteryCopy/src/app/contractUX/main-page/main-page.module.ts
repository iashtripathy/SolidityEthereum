import { MainPageComponent } from './main-page.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    RouterModule.forChild([
      {
        path: '',
        component: MainPageComponent
      }
    ])
  ],
  declarations: [MainPageComponent]
})
export class MainPageModule {}
