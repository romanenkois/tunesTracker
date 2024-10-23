import { Injectable, signal, WritableSignal } from '@angular/core';
import { Track } from '@dto/track';

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

  private trackData: WritableSignal<Track> = signal<any>(null)
  public getTrackData() {
    return this.trackData()
  }
  public setTrackData(data: Track) {
    this.trackData.set(data)
  }
}
