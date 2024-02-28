import { AfterViewInit, Component, Input, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'app-expense-detail',
  templateUrl: './expense-detail.component.html',
  styleUrls: ['./expense-detail.component.scss'],
})
export class ExpenseDetailComponent  implements OnInit {
  @ViewChild("nameInput") nameInput: HTMLIonInputElement;
  @ViewChild("amountInput") amountInput: HTMLIonInputElement;
  @ViewChild("commentInput") commentInput: HTMLIonInputElement;
  @ViewChild('popover') popover;

  nameInputHidden: boolean = false;
  amountInputHidden: boolean = false;
  commentInputHidden: boolean = false;
  datetimeHidden: boolean = true;

  constructor(
  ) { }

  ngOnInit() {
    
  }

  showNameInput() {
    this.nameInputHidden = true;
    setTimeout(() => {
      this.nameInput.setFocus(); 
    },100)
  }

  hideNameInput() {
    this.nameInputHidden= false;
  }

  showAmountInput() {
    this.amountInputHidden = true;
    setTimeout(() => {
      this.amountInput.setFocus(); 
    },100)
  }

  hideAmountInput() {
    this.amountInputHidden= false;
  }

  showCommentInput() {
    this.commentInputHidden = true;
    setTimeout(() => {
      this.commentInput.setFocus(); 
    },100)
  }

  hideCommentInput() {
    this.commentInputHidden= false;
  }

  showDatetimePopover(e) {
    this.popover.event = e;
    this.datetimeHidden = false;
  }

  hideDatetimePopover() {
    this.datetimeHidden = true;
  }

}
