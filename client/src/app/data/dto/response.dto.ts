import { ResponseError401, ResponseError403, ResponseError429 } from "@dto/error.dto";
import { TrackDTO } from "@dto/track.dto";
import { AlbumDTO } from "@dto/album.dto";
import { ArtistDTO } from "@dto/artist.dto";

export type AlbumResponse = AlbumDTO | ResponseError401 | ResponseError403 | ResponseError429;
export type ArtistResponse = ArtistDTO | ResponseError401 | ResponseError403 | ResponseError429;
export type TrackResponse = TrackDTO | ResponseError401 | ResponseError403 | ResponseError429;
