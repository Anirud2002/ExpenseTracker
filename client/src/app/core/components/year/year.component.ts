import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'app-year',
  templateUrl: './year.component.html',
  styleUrls: ['./year.component.scss'],
})
export class YearComponent  implements OnInit {
  @Input() year: string;
  @ViewChild("renameInput") renameInput: HTMLIonInputElement;
  isRenaming: boolean = false;
  showMonths: boolean = false;

  constructor() { }

  ngOnInit() {

    // sets the isRenaming to false, it clicked on anywhere on the DOM except the INPUT OR ION-INPUT tag
    document.addEventListener('click', (e) => {
      if((e.target['nodeName'] !== 'INPUT' && e.target['nodeName'] !== 'ION-INPUT') && this.isRenaming) {
        this.isRenaming = false;
      }
    })

  }
  
  handleDoubleClick() { 
    this.isRenaming = true;
    // need timeout so that input is rendered on the template first
    setTimeout(() => {
      this.renameInput.setFocus(); 
    },100)
  }

  toggleMonths() {
    this.showMonths = !this.showMonths;
  }

}
