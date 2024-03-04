import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ExpensePageRoutingModule } from './expense-routing.module';

import { ExpensePage } from './expense.page';
import { ExpenseDetailComponent } from './components/expense-detail/expense-detail.component';
import { PickerComponent } from '@ctrl/ngx-emoji-mart';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ExpensePageRoutingModule,
    PickerComponent
  ],
  declarations: [ExpensePage, ExpenseDetailComponent]
})
export class ExpensePageModule {}
