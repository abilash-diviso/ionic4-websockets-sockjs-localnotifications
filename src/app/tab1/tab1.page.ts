import { Component } from '@angular/core';
import { NotificationServiceService } from '../services/notification-service.service';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {

  message;
  constructor(private notificationService: NotificationServiceService) {}

  sendMessage() {
    console.log('Message binded is ' +  this.message);
    this.notificationService.sendMessage(this.message);
  }

}
