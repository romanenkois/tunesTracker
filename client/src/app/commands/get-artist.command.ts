import { inject, Injectable } from '@angular/core';
import { AlbumDTO } from '@dto/album.dto';
import { ArtistDTO } from '@dto/artist.dto';
import { AlbumResponse, ArtistResponse } from '@dto/response.dto';
import { AlbumMapper } from '@mapper/album.mapper';
import { ArtistMapper } from '@mapper/artist.mapper';
import { AlbumDataRepository } from '@repository/album-data.repository';
import { ArtistDataRepository } from '@repository/artist-data.repository';
import { ApiService } from '@service/api.service';

@Injectable({
  providedIn: 'root'
})
export class GetAlbumCommand {
  private apiService: ApiService = inject(ApiService);
  private artistRepository: ArtistDataRepository = inject(ArtistDataRepository);

  public getArtist(id: string) {
    this.apiService.getArtist(id).subscribe((response: ArtistResponse) => {
      if (response && (response as ArtistDTO).id !== undefined) {
        this.artistRepository.setArtistData(ArtistMapper.toEntity(response as ArtistDTO));
      }
    });
  }
}
