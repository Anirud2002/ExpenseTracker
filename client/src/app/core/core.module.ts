import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { SideNavComponent } from './components/side-nav/side-nav.component';
import { YearComponent } from './components/year/year.component';
import { LogoComponent } from './components/logo/logo.component';



@NgModule({
  declarations: [SideNavComponent, YearComponent, LogoComponent],
  imports: [
    CommonModule,
    IonicModule,
  ],
  exports: [SideNavComponent]
})
export class CoreModule { }
