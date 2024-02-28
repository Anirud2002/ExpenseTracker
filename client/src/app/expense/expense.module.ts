import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ExpensePageRoutingModule } from './expense-routing.module';

import { ExpensePage } from './expense.page';
import { ExpenseDetailComponent } from './components/expense-detail/expense-detail.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ExpensePageRoutingModule
  ],
  declarations: [ExpensePage, ExpenseDetailComponent]
})
export class ExpensePageModule {}
