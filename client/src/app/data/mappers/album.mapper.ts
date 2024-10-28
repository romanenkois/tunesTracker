import { Album, AlbumSimplified } from '@entity/album.entity';
import { AlbumDTO, AlbumSimpifiedDTO } from '@dto/album.dto';
import { ArtistMapper } from '@mapper/artist.mapper';

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

      artists: dto.artists.map(artist => ArtistMapper.toSimplifiedEntity(artist))
    };
  }
}
