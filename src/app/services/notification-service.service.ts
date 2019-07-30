import { Platform } from '@ionic/angular';
import { Injectable } from '@angular/core';
import * as SockJS from 'sockjs-client';
import * as Stomp from 'stompjs';
import { LocalNotifications } from '@ionic-native/local-notifications/ngx';

@Injectable({
  providedIn: 'root'
})
export class NotificationServiceService {
  private serverUrl = 'http://35.237.4.7:8888/socket';
  private title = 'WebSockets chat';
  private stompClient;

  constructor(
    private localNotifications: LocalNotifications,
    private platForm: Platform
  ) {
    this.initializeWebSocketConnection();
  }

  initializeWebSocketConnection() {
    const ws = new SockJS(this.serverUrl);
    this.stompClient = Stomp.over(ws);
    const that = this;
    // tslint:disable-next-line: only-arrow-functions
    this.stompClient.connect({}, function(frame) {
      that.stompClient.subscribe('/chat', message => {
        console.log('Message is subscribing..........');
        if (message.body) {
          that.platForm.ready().then(() => {
            console.log(message.body);
            that.localNotifications.schedule({
              title: 'Graeshoppe',
              text: message.body,
              foreground: true,
              wakeup: true,
              lockscreen: true,
              sound: 'file://assets/sounds/beep.mp3'
              // data: { secret: key }
            });
          });
          console.log(message.body);
        }
      });
    });
  }

  sendMessage(message) {
    console.log('Message is sending .......' + message);
    this.stompClient.send('/app/send/message', {}, message);
    // $('#input').val('');
  }
}
