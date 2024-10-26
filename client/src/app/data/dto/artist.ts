export type ArtistDTO = {
  external_urls: {
    spotify: string
  }
  followers: {
    href: string | null,
    total: number
  },
  genres: Array<string>,
  href: string,
  id: string,
  images: Array<{
    url: string,
    height: number,
    width: number
  }>,
  name: string,
  popularity: number,
  type: 'artist',
  uri: string
}


export type ArtistSimplifiedDTO = {
  external_urls: {
    spotify: string
  },
  href: string,
  id: string,
  name: string,
  type: 'artist',
  uri: string
}
