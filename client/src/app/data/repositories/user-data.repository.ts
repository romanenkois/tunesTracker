import { Injectable, signal, WritableSignal } from '@angular/core';
import { Artist } from '@entity/artist.entity';
import { Track } from '@entity/track.entity';

@Injectable({providedIn: 'root'})
export class UserDataRepository {
  private readonly userCode: WritableSignal<string> = signal<string>('');
  public setUserCode(code: string): void {
    this.userCode.set(code);
    sessionStorage.setItem('userCode', code);
  }
  public getUserCode(): string {
    return this.userCode();
  }

  // for future use
  // private readonly userData: WritableSignal<any> = signal<any>(null);
  // public setUserData(data: any): void {
  //   this.userData.set(data);
  // }
  // public getUserData(): any {
  //   return this.userData();
  // }

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
}
