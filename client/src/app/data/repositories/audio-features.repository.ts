import { Injectable, signal, WritableSignal } from '@angular/core';
import { AudioFeatures } from '@entity/index';

@Injectable({providedIn: 'root'})
export class AudioFeaturesDataRepository {
  private audioFeaturesData: WritableSignal<AudioFeatures> = signal<any>(null)
  public getAudioFeaturesData() {
    return this.audioFeaturesData()
  }
  public setAudioFeaturesData(data: AudioFeatures) {
    this.audioFeaturesData.set(data)
  }
}
