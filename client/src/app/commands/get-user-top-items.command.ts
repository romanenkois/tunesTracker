import { inject, Injectable } from "@angular/core";
import { config } from "@config/config";
import { ArtistDTO, TrackDTO, NestedReponce, UserTopItemsResponse, AlbumDTO } from "@dto/index";
import { Album, TimeFrame } from "@entity/index";
import { AlbumMapper, ArtistMapper, TrackMapper } from "@mapper/index";
import { UserDataRepository, UserTopItemsDataRepository } from "@repository/index";
import { ApiService } from "@service/api.service";

@Injectable({ providedIn: 'root' })
export class GetUserTopItemsCommand {
  private apiService: ApiService = inject(ApiService);
  private userDataRepository: UserDataRepository = inject(UserDataRepository);
  private userTopItemsDataRepository: UserTopItemsDataRepository = inject(UserTopItemsDataRepository);

  /**
   * Function gets the user's top items (artists or tracks) and SETS it in repository
   * Artists and tracks uses same end point, so its the same function
   */
  public getUserTopItems(type: 'artists'| 'tracks', timeRange: TimeFrame) {
    this.apiService.getUserTopItems(
      this.userDataRepository.getUserCode(),
      type,
      timeRange,
      config.ITEMS_LIMIT_PER_REQUEST
    ).subscribe((response: UserTopItemsResponse) => {
      // After responce we check if its the correct one
      if (response && (response as NestedReponce).items !== undefined) {
        // Function handels both albums and tracks, so we check type of it
        if (type === 'artists') {
          // Before setting data, its mapped to entity
          const artists = (response as NestedReponce).items.map((item: ArtistDTO) => ArtistMapper.toEntity(item));
          this.userTopItemsDataRepository.setUserTopArtists(artists);
        } if (type === 'tracks') {
          const tracks = (response as NestedReponce).items.map((item: TrackDTO) => TrackMapper.toEntity(item));
          this.userTopItemsDataRepository.setUserTopTracks(tracks);
        }
      } else {
        console.error('Error retrieving user top items:', response);
      }
    });
  }

  /**
   * Mostly the same function as above, but it has offset and it is APPENDS to repository
   */
  public getMoreUserTopItems(type: 'artists'| 'tracks', timeRange: TimeFrame, offset: number) {
    this.apiService.getUserTopItems(
      this.userDataRepository.getUserCode(),
      type,
      timeRange,
      config.ITEMS_LIMIT_PER_REQUEST,
      offset
    ).subscribe((response: UserTopItemsResponse) => {
      if (response && (response as NestedReponce).items !== undefined) {
        if (type === 'artists') {
          const artists = (response as NestedReponce).items.map((item: ArtistDTO) => ArtistMapper.toEntity(item));
          this.userTopItemsDataRepository.appendUserTopArtists(artists);
        } if (type === 'tracks') {
          const tracks = (response as NestedReponce).items.map((item: TrackDTO) => TrackMapper.toEntity(item));
          this.userTopItemsDataRepository.appendUserTopTracks(tracks);
        }
      } else {
        console.error('Error retrieving user top items:', response);
      }
    });
  }

  public getUserTopAlbums(timeRange: TimeFrame, limit: number) {
    this.apiService.getUserTopAlbums(
      this.userDataRepository.getUserCode(),
      timeRange,
      limit
    ).subscribe((response: any) => {
      if (response) {
        console.log(response);
        const albums = (response as Array<AlbumDTO>).map((item: AlbumDTO) => AlbumMapper.toEntity(item));
        this.userTopItemsDataRepository.setUserTopAlbums(albums);
      }
    })
  }
}
