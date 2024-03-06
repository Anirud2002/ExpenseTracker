import { AfterViewInit, Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'app-logo',
  templateUrl: './logo.component.html',
  styleUrls: ['./logo.component.scss'],
})
export class LogoComponent  implements OnInit, AfterViewInit {
  @Input() height: string = '';
  @Input() width: string = '';
  @ViewChild("logo") logo: ElementRef;
  constructor() { }

  ngOnInit() {
  }

  ngAfterViewInit(): void {
    this.logo.nativeElement.style.height = this.height;
  }

}
