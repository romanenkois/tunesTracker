import { Track } from '@entity/track.entity';
import { TrackDTO } from '@dto/track.dto';
import { AlbumMapper } from '@mapper/album.mapper';
import { ArtistMapper } from '@mapper/artist.mapper';

export class TrackMapper {
  private static albumMapper = new AlbumMapper();
  private static artistMapper = new ArtistMapper();

  public static toEntity(dto: TrackDTO): Track {
    if (!dto) {
      throw new Error('Cannot map null or undefined TrackDTO to Track');
    }

    return {
      id: dto.id,
      href: dto.href,
      preview_url: dto.preview_url,
      name: dto.name,
      popularity: dto.popularity,
      duration_ms: dto.duration_ms,
      artists: dto.artists.map(artist => ArtistMapper.toSimplifiedEntity(artist)),
      album: dto.album.map(album => AlbumMapper.toSimplifiedEntity(album))
    };
  }
}
