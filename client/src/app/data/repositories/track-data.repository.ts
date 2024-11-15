import { Injectable, signal, WritableSignal } from '@angular/core';
import { Track } from '@entity/index';

@Injectable({providedIn: 'root'})
export class TrackDataRepository {
  private trackData: WritableSignal<Track> = signal<any>(null)
  public getTrackData() {
    return this.trackData()
  }
  public setTrackData(data: Track) {
    this.trackData.set(data)
  }
}
