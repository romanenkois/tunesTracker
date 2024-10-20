import { AlbumSimpified } from "@dto/album"
import { ArtistSimplified } from "@dto/artist"

export type Track = {
  album: Array<AlbumSimpified>,
  artists: Array<ArtistSimplified>,
  available_markets: Array<string>,
  disc_number: number,
  duration_ms: number,
  explicit: boolean,
  external_ids: {
    isrc?: string,
    ean?: string,
    upc?: string
  },
  external_urls: {
    spotify?: string
  },
  href: string,
  id: string,
  is_playable: false,
  linked_from?: {},
  restrictions?: {
    reason: 'market' | 'product' | 'explicit'
  },
  name: string,
  popularity: number,
  preview_url: string | undefined,
  track_number: 0,
  type: string,
  uri: string,
  is_local: boolean
}
