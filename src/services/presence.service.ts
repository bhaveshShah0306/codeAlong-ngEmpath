import { inject, Injectable, signal } from '@angular/core';
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
  onlineUsers = signal<string[]>([]);
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

    this.hubConnection.on('UserOnline', (userId) => {
      this.onlineUsers.update((users) => [...users, userId]);
    });
    this.hubConnection.on('UserOffline', (userId) => {
      this.onlineUsers.update((users) => users.filter((u) => u !== userId));
    });
    this.hubConnection.on('GetOnlineUsers', (userIds) => {
      this.onlineUsers.set(userIds);
    });
  }

  stopHubConnection() {
    if (this.hubConnection?.state === HubConnectionState.Connected) {
      this.hubConnection.stop().catch((error) => console.log(error));
    }
    this.hubConnection = undefined; // Clear the instance
  }
}
