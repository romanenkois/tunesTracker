import { Injectable, signal, WritableSignal } from '@angular/core';

// to be deprecated later on in dev
@Injectable({providedIn: 'root'})
export class DataRepository {
  private secretToken: WritableSignal<string> = signal(''); // put ST in here to work on current stage
  public getSecretToken() {
    return this.secretToken()
  }
  public setSecretToken(token: any) {
    this.secretToken.set(token)
  }

  private trackData: WritableSignal<any> = signal<any>(null)
  public getTrackData() {
    return this.trackData()
  }
  public setTrackData(data: any) {
    this.trackData.set(data)
  }
}
