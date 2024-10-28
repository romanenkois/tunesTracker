import { Injectable, signal, WritableSignal } from '@angular/core';
import { Album } from '@entity/album.entity';

@Injectable({providedIn: 'root'})
export class AlbumDataRepository {
  private albumData: WritableSignal<Album> = signal<any>(null)
  public getAlbumData() {
    return this.albumData()
  }
  public setAlbumData(data: Album) {
    this.albumData.set(data)
  }
}
