import { ArtistSimplifiedDTO } from '@dto/artist.dto';

export type AlbumDTO = {
  album_type: 'album' | 'single' | 'compilation',
  total_tracks: number,
  available_markets: Array<string>,
  external_urls: {
    spotify: string
  },
  href: string,
  id: string,
  images: Array<{
    url: string,
    height: number,
    width: number
  }>,
  name: string,
  release_date: string,
  release_date_precision: string,
  restrictions?: {
    reason: 'market' | 'product' | 'explicit'
  },
  type: 'album',
  uri: string,
  artists: Array<ArtistSimplifiedDTO>
  tracks: Array<{
    href: string,
    limit: number,
    next: string | null,
    offset: number,
    previous: string | null,
    total: number,
    items: Array<{
      artists: Array<ArtistSimplifiedDTO>,
      available_markets: Array<string>,
      disc_number: number,
      duration_ms: number,
      explicit: boolean,
      external_urls: {
        spotify?: string
      },
      href: string,
      id: string,
      is_playable: false,
      linked_from?: {
        external_urls: {
          spotify: string
        },
        href: string,
        id: string,
        type: 'track',
        uri: string
      },
      restrictions?: {
        reason: 'market' | 'product' | 'explicit'
      },
      name: string,
      preview_url: string | undefined,
      track_number: number,
      type: string,
      uri: string,
      is_local: boolean
    }>,
  }>
  copyright: Array<{
    text: string,
    type: 'C' | 'P'
  }>,
  external_ids: {
    isrc?: string,
    ean?: string,
    upc?: string
  },
  genres: Array<string>,
  label: string,
  popularity: number,
}

export type AlbumSimpifiedDTO = {
  album_type: 'album' | 'single' | 'compilation',
  total_tracks: number,
  available_markets: Array<string>,
  external_urls: {
    spotify: string
  },
  href: string,
  id: string,
  images: [
    Array<{
      url: string,
      height: number,
      width: number
    }>
  ],
  name: string,
  release_date: string,
  release_date_precision: string,
  restrictions?: {
    reason: 'market' | 'product' | 'explicit'
  },
  type: 'album',
  uri: string,
  artists: Array<ArtistSimplifiedDTO>
}
