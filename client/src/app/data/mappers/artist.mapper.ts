import { Artist, ArtistSimplified } from '@entity/index';
import { ArtistDTO, ArtistSimplifiedDTO } from '@dto/index';

export class ArtistMapper {
  public static toEntity(dto: ArtistDTO): Artist {
    return {
      id: dto.id,
      href: dto.href,
      uri: dto.uri,

      name: dto.name,
      images: dto.images,
      genres: dto.genres,
      popularity: dto.popularity,
      type: dto.type,
    };
  }

  public static toSimplifiedEntity(dto: ArtistSimplifiedDTO): ArtistSimplified {
    return {
      id: dto.id,
      href: dto.href,
      uri: dto.uri,

      name: dto.name,
      type: dto.type,
    };
  }
}
