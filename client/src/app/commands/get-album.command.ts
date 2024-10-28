import { inject, Injectable } from '@angular/core';
import { AlbumDTO } from '@dto/album.dto';
import { AlbumResponse } from '@dto/response.dto';
import { AlbumMapper } from '@mapper/album.mapper';
import { AlbumDataRepository } from '@repository/album-data.repository';
import { ApiService } from '@service/api.service';

@Injectable({
  providedIn: 'root'
})
export class GetAlbumCommand {
  private apiService: ApiService = inject(ApiService);
  private albumRepository: AlbumDataRepository = inject(AlbumDataRepository);

  public getAlbum(id: string, market?: string) {
    this.apiService.getAlbum(id, market).subscribe((response: AlbumResponse) => {
      if (response && (response as AlbumDTO).id !== undefined) {
        this.albumRepository.setAlbumData(AlbumMapper.toEntity(response as AlbumDTO));
      }
    });
  }
}
