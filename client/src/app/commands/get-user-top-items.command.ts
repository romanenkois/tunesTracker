import { inject, Injectable } from "@angular/core";
import { ArtistDTO } from "@dto/artist.dto";
import { NestedReponce, UserTopItemsResponse } from "@dto/response.dto";
import { TrackDTO } from "@dto/track.dto";
import { ArtistMapper } from "@mapper/artist.mapper";
import { TrackMapper } from "@mapper/track.mapper";
import { UserDataRepository } from "@repository/user-data.repository";
import { ApiService } from "@service/api.service";
import { environment } from "enviroments/environment.development";

@Injectable({ providedIn: 'root' })
export class GetUserTopItemsCommand {
  private apiService: ApiService = inject(ApiService);
  private userDataRepository: UserDataRepository = inject(UserDataRepository);

  public getUserTopItems(type: 'artists'| 'tracks', timeRange: 'short_term' | 'medium_term' | 'long_term') {
    this.apiService.getUserTopItems(this.userDataRepository.getUserCode(), type, timeRange).subscribe((response: UserTopItemsResponse) => {
      if (response && (response as NestedReponce).items !== undefined) {
        if (type === 'artists') {
          const artists = (response as NestedReponce).items.map((item: ArtistDTO) => ArtistMapper.toEntity(item));
          this.userDataRepository.setUserTopArtists(artists);
        } if (type === 'tracks') {
          const tracks = (response as NestedReponce).items.map((item: TrackDTO) => TrackMapper.toEntity(item));
          this.userDataRepository.setUserTopTracks(tracks);
        }
      } else {
        console.error('Error retrieving user top items:', response);
      }
    });
  }

  public getMoreUserTopItems(type: 'artists'| 'tracks', timeRange: 'short_term' | 'medium_term' | 'long_term', offset: number) {
    this.apiService.getUserTopItems(this.userDataRepository.getUserCode(), type, timeRange, environment.ITEMS_LIMIT_PER_REQUEST, offset ).subscribe((response: UserTopItemsResponse) => {
      if (response && (response as NestedReponce).items !== undefined) {
        if (type === 'artists') {
          const artists = (response as NestedReponce).items.map((item: ArtistDTO) => ArtistMapper.toEntity(item));
          this.userDataRepository.appendUserTopArtists(artists);
        } if (type === 'tracks') {
          const tracks = (response as NestedReponce).items.map((item: TrackDTO) => TrackMapper.toEntity(item));
          this.userDataRepository.appendUserTopTracks(tracks);
        }
      } else {
        console.error('Error retrieving user top items:', response);
      }
    });
  }
}
