import { MainPageComponent } from './contractUX/main-page/main-page.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


const routes: Routes = [
  /* {
    path:'',
    redirectTo: 'contractUX/main-page',
    pathMatch: 'full'
  },
  {
    path:'contractUX/main-page',
    loadChildren: () => import('./contractUX/main-page/main-page.module').then(m => m.MainPageModule)
  } */
  {
    path: '', component: MainPageComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
