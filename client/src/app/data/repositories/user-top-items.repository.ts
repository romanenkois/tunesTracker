import { Injectable, signal, WritableSignal } from '@angular/core';
import { Album, Track, Artist } from '@entity/index';

@Injectable({providedIn: 'root'})
export class UserTopItemsDataRepository {
  private readonly userTopTracks: WritableSignal<Array<Track>> = signal<Array<Track>>([]);
  public setUserTopTracks(tracks: Array<Track>): void {
    this.userTopTracks.set(tracks);
  }
  public appendUserTopTracks(tracks: Array<Track>): void {
    this.userTopTracks.set([...this.userTopTracks(), ...tracks]);
  }
  public getUserTopTracks(): Array<Track> {
    return this.userTopTracks();
  }

  private readonly userTopArtists: WritableSignal<Array<Artist>> = signal<Array<Artist>>([]);
  public setUserTopArtists(artists: Array<Artist>): void {
    this.userTopArtists.set(artists);
  }
  public appendUserTopArtists(artists: Array<Artist>): void {
    this.userTopArtists.set([...this.userTopArtists(), ...artists]);
  }
  public getUserTopArtists(): Array<Artist> {
    return this.userTopArtists();
  }

  private readonly userTopAlbums: WritableSignal<Array<Album>> = signal<Array<Album>>([]);
  public setUserTopAlbums(albums: Array<Album>): void {
    this.userTopAlbums.set(albums);
  }
  public getUserTopAlbums(): Array<Album> {
    return this.userTopAlbums();
  }

  private readonly userTopGenres: WritableSignal<Array<string>> = signal<Array<string>>([]);
  public setUserTopGenres(genres: Array<string>): void {
    this.userTopGenres.set(genres);
  }
  public getUserTopGenres(): Array<string> {
    console.log(this.userTopGenres());
    return this.userTopGenres();
  }
}
