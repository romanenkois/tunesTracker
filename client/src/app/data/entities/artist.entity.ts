export type Artist = {
  id: string,
  href: string,
  uri: string,

  name: string,
  images: Array<{
    url: string,
    height: number,
    width: number
  }>,
  genres: Array<string>,
  popularity: number,
}

export type ArtistSimplified = {
  id: string,
  href: string,
  uri: string,

  name: string,
}
