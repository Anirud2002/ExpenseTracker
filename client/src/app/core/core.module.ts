import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { SideNavComponent } from './components/side-nav/side-nav.component';
import { YearComponent } from './components/year/year.component';
import { LogoComponent } from './components/logo/logo.component';
import { RouterModule } from '@angular/router';



@NgModule({
  declarations: [SideNavComponent, YearComponent, LogoComponent],
  imports: [
    CommonModule,
    IonicModule,
    RouterModule
  ],
  exports: [SideNavComponent, LogoComponent]
})
export class CoreModule { }
