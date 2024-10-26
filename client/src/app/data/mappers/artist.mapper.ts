import { Artist, ArtistSimplified } from '@entity/artist.entity';
import { ArtistDTO, ArtistSimplifiedDTO } from '@dto/artist.dto';

export class ArtistMapper {
  public static toEntity(dto: ArtistDTO): Artist {
    if (!dto) {
      throw new Error('Cannot map null or undefined ArtistDTO to Artist');
    }

    return {
      id: dto.id,
      href: dto.href,
      uri: dto.uri,

      name: dto.name,
      images: dto.images,
      genres: dto.genres,
      popularity: dto.popularity,
    };
  }

  public static toSimplifiedEntity(dto: ArtistSimplifiedDTO): ArtistSimplified {
    if (!dto) {
      throw new Error('Cannot map null or undefined ArtistSimplifiedDTO to ArtistSimplified');
    }

    return {
      id: dto.id,
      href: dto.href,
      uri: dto.uri,

      name: dto.name,
    };
  }
}
