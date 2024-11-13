import { inject, Injectable } from '@angular/core';
import { ArtistDTO } from '@dto/artist.dto';
import { ArtistResponse } from '@dto/response.dto';
import { Artist } from '@entity/artist.entity';
import { ArtistMapper } from '@mapper/artist.mapper';
import { ArtistDataRepository } from '@repository/artist-data.repository';
import { ApiService } from '@service/api.service';

@Injectable({
  providedIn: 'root'
})
export class GetArtistCommand {
  private apiService: ApiService = inject(ApiService);
  private artistRepository: ArtistDataRepository = inject(ArtistDataRepository);

  public getArtist(id: string) {
    this.apiService.getArtist(id).subscribe((response: ArtistResponse) => {
      if (response && (response as ArtistDTO).id !== undefined) {
        this.artistRepository.setArtistData(ArtistMapper.toEntity(response as ArtistDTO));
      }
    });
  }

  public returnArtists(ids: Array<string>): Promise<Array<Artist>> {
    let res: Array<Artist> = [];
    return new Promise((resolve, reject) => {
      this.apiService.getArtists(ids).subscribe(
        (response: any) => {
          for (let item of response.artists) {
            res.push(ArtistMapper.toEntity(item));
          }
          resolve(res);
        },
        (error) => reject(error)
      );
    });
  }
}
