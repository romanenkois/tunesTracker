import { Album, AlbumSimplified } from '@entity/index';
import { AlbumDTO, AlbumSimpifiedDTO } from '@dto/index';
import { ArtistMapper } from '@mapper/index';

export class AlbumMapper {

  public static toEntity(dto: AlbumDTO): Album {
    return {
      id: dto.id,
      href: dto.href,
      uri: dto.uri,

      name: dto.name,
      images: dto.images,

      release_date: dto.release_date,
      album_type: dto.album_type,
      genres: dto.genres,
      popularity: dto.popularity,
      total_tracks: dto.total_tracks,

      artists: dto.artists.map(artist => ArtistMapper.toSimplifiedEntity(artist)),
      type: dto.type,
    };
  }

  public static toSimplifiedEntity(dto: AlbumSimpifiedDTO): AlbumSimplified {
    return {
      id: dto.id,
      href: dto.href,
      uri: dto.uri,

      name: dto.name,
      images: dto.images,

      release_date: dto.release_date,
      album_type: dto.album_type,
      total_tracks: dto.total_tracks,

      artists: dto.artists.map(artist => ArtistMapper.toSimplifiedEntity(artist)),
      type: dto.type,
    };
  }
}
