/* eslint-disable @typescript-eslint/no-explicit-any */
import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-chat-box',
  templateUrl: './chat-box.component.html',
  styleUrls: ['./chat-box.component.scss'],
})
export class ChatBoxComponent implements OnInit {

  @Input() chat!: any;
  @Input() current_user_id!: any;

  constructor() {
    // do nothing.
  }

  ngOnInit() {
    console.log('');
  }

}
