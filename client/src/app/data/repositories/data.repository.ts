import { Injectable, signal, WritableSignal } from '@angular/core';
import { Track } from '@entity/track.entity';

// to be deprecated later on in dev
@Injectable({providedIn: 'root'})
export class DataRepository {
  private trackData: WritableSignal<Track> = signal<any>(null)
  public getTrackData() {
    return this.trackData()
  }
  public setTrackData(data: Track) {
    this.trackData.set(data)
  }
}
