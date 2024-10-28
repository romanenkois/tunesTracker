import { Artist, ArtistSimplified } from '@entity/artist.entity';
import { ArtistDTO, ArtistSimplifiedDTO } from '@dto/artist.dto';

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
    };
  }

  public static toSimplifiedEntity(dto: ArtistSimplifiedDTO): ArtistSimplified {
    return {
      id: dto.id,
      href: dto.href,
      uri: dto.uri,

      name: dto.name,
    };
  }
}
