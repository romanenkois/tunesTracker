import { Injectable, signal, WritableSignal } from '@angular/core';
import { Album, Track, Artist, TimeFrame } from '@entity/index';

@Injectable({ providedIn: 'root' })
export class UserTopItemsDataRepository {
  // user top tracks
  private readonly userTopTracks: WritableSignal<{
    [term in TimeFrame]? : Array<Track>
  }> = signal({});
  public setUserTopTracks(tracks: Array<Track>, term: TimeFrame): void {
    this.userTopTracks.set({
      ...this.userTopTracks(),
      [term]: tracks,
    });
  }
  public appendUserTopTracks(tracks: Array<Track>, term: TimeFrame): void {
    this.userTopTracks.set({
      ...this.userTopTracks(),
      [term]: [...(this.userTopTracks()[term] || []), ...tracks]
    });
  }
  public getUserTopTracks(term: TimeFrame): Array<Track> {
    return this.userTopTracks()[term] || [];
  }

  // user top artists
  private readonly userTopArtists: WritableSignal<{
    [term in TimeFrame]? : Array<Artist>}> = signal({});
  public setUserTopArtists(artists: Array<Artist>, term: TimeFrame): void {
    this.userTopArtists.set({
      ...this.userTopArtists(),
      [term]: artists,
    });
  }
  public appendUserTopArtists(artists: Array<Artist>, term: TimeFrame): void {
    this.userTopArtists.set({
      ...this.userTopArtists(),
      [term]: [...(this.userTopArtists()[term] || []), artists]
    });
  }
  public getUserTopArtists(term: TimeFrame): Array<Artist> {
    return this.userTopArtists()[term] || [];
  }

  // user top albums
  private readonly userTopAlbums: WritableSignal<{
    [term in TimeFrame]?: Array<Album>;
  }> = signal({});
  public setUserTopAlbums(albums: Array<Album>, term: TimeFrame): void {
    this.userTopAlbums.set({
      ...this.userTopAlbums(),
      [term]: albums,
    });
  }
  public getUserTopAlbums(term: TimeFrame): Array<Album> {
    return this.userTopAlbums()[term] || [];
  }

  // user top genres
  private readonly userTopGenres: WritableSignal<{
    [term in TimeFrame]?: Array<any>;
  }> = signal({});
  public setUserTopGenres(data: Array<any>, term: TimeFrame) {
    this.userTopGenres.set({
      ...this.userTopGenres(),
      [term]: data,
    });
    console.log(this.userTopGenres());
  }
  public getUserTopGenres(term: TimeFrame): Array<any> {
    if ((this.userTopGenres()[term] || []).length > 0) {
      return this.userTopGenres()[term] || [];
    }
    return [];
  }
}
