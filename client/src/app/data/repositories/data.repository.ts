import { Injectable, signal, WritableSignal } from '@angular/core';
import { TrackDTO } from '@dto/track';

// to be deprecated later on in dev
@Injectable({providedIn: 'root'})
export class DataRepository {
  private trackData: WritableSignal<TrackDTO> = signal<any>(null)
  public getTrackData() {
    return this.trackData()
  }
  public setTrackData(data: TrackDTO) {
    this.trackData.set(data)
  }
}
