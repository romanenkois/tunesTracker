import { Injectable, signal, WritableSignal } from '@angular/core';
import { Artist } from '@entity/artist.entity';

@Injectable({providedIn: 'root'})
export class ArtistDataRepository {
  private artistData: WritableSignal<Artist> = signal<any>(null)
  public getArtistData() {
    return this.artistData()
  }
  public setArtistData(data: Artist) {
    this.artistData.set(data)
  }
}

