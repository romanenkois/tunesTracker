import { config } from "@config/config";
import { Album, Track, Artist } from "@entity/index";

export type Card = {
  primaryText: string;
  secondaryText?: string;
  image?: Array<string> | string;
  imageLink?: string;
  primaryTextLink?: string;
  secondaryTextLink?: string;
}

export class CardMapper {
  public static toEntity(originalEntity: Track | Album | Artist): Card  {
    return {
      primaryText: originalEntity.name,
      secondaryText:
        originalEntity.type == 'track' || originalEntity.type == 'album' ? originalEntity.artists.map(artist => artist.name).join(', ') :
        originalEntity.type == 'artist' ? originalEntity.genres.map(genre => genre).join(', ') :
        undefined,

      image:
        originalEntity.type == 'artist' || originalEntity.type == 'album' ? originalEntity.images[0].url :
        originalEntity.type == 'track' ? originalEntity.album.images[0].url :
        undefined,

      imageLink:
        originalEntity.type == 'artist' ? `${config.BASE_CLIENT_URL}/artist/${originalEntity.id}` :
        originalEntity.type == 'album' ? `${config.BASE_CLIENT_URL}/album/${originalEntity.id}` :
        originalEntity.type == 'track' ? `${config.BASE_CLIENT_URL}/track/${originalEntity.id}` :
        undefined,

      primaryTextLink:
        originalEntity.type == 'artist' ? `${config.BASE_CLIENT_URL}/artist/${originalEntity.id}` :
        originalEntity.type == 'album' ? `${config.BASE_CLIENT_URL}/album/${originalEntity.id}` :
        originalEntity.type == 'track' ? `${config.BASE_CLIENT_URL}/track/${originalEntity.id}` :
        undefined,


    }
  }
}
