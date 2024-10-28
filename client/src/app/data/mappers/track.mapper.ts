import { Track } from '@entity/track.entity';
import { TrackDTO } from '@dto/track.dto';
import { AlbumMapper } from '@mapper/album.mapper';
import { ArtistMapper } from '@mapper/artist.mapper';

export class TrackMapper {
  public static toEntity(dto: TrackDTO): Track {
    return {
      id: dto.id,
      href: dto.href,
      uri: dto.uri,
      preview_url: dto.preview_url,

      name: dto.name,
      popularity: dto.popularity,
      duration_ms: dto.duration_ms,

      artists: dto.artists.map(artist => ArtistMapper.toSimplifiedEntity(artist)),
      album: AlbumMapper.toSimplifiedEntity(dto.album)
    };
  }
}
