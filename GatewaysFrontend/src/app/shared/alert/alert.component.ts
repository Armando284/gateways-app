import { Component, OnInit, Input } from '@angular/core';
import { faExclamationTriangle } from '@fortawesome/free-solid-svg-icons';


@Component({
  selector: 'app-alert',
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.scss']
})
export class AlertComponent implements OnInit {

  @Input('errorMsg') errorMsg: string = '';
  errorIcon = faExclamationTriangle;

  constructor() { }

  ngOnInit(): void {
  }

}
