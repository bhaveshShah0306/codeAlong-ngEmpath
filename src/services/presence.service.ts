import { inject, Injectable } from '@angular/core';
import {
  HttpTransportType,
  HubConnection,
  HubConnectionBuilder,
  HubConnectionState,
} from '@microsoft/signalr';
import { UserDto } from 'src/core/userdto';
import { ToastService } from './toast.service';

@Injectable({
  providedIn: 'root',
})
export class PresenceService {
  private hubUrl = 'https://localhost:5001/hubs/';
  private toast = inject(ToastService);
  hubConnection?: HubConnection;
  constructor() {}

  createHubConnection(user: UserDto) {
    const fullUrl = `${this.hubUrl}presence`;
    console.log('hubUrl from environment:', this.hubUrl);
    console.log('Full URL will be:', this.hubUrl + 'presence');

    this.hubConnection = new HubConnectionBuilder()
      .withUrl(fullUrl, {
        accessTokenFactory: () => user.token, // This captures the NEW token
      })
      .withAutomaticReconnect()
      .build();

    this.hubConnection
      .start()
      .catch((error) => console.log('Error establishing connection: ', error));

    this.hubConnection.on('UserOnline', (email) => {
      console.log('✅ User online:', email);
    });

    this.hubConnection.on('UserOffline', (email) => {
      console.log('❌ User offline:', email);
    });
  }

  stopHubConnection() {
    if (this.hubConnection?.state === HubConnectionState.Connected) {
      this.hubConnection.stop().catch((error) => console.log(error));
    }
    this.hubConnection = undefined; // Clear the instance
  }
}
