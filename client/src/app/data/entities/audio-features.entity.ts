export type AudioFeatures = {
  acousticness: number,
  analysis_url: string,
  danceability: number,
  duration_ms: number,
  id: string,
  instrumentalness: number,
  key: number, // -1-11 keys range
  liveness: number,
  loudness: number,
  mode: 0 | 1, // 1 major, 0 minor
  speechiness: number,
  tempo: number,
  time_signature: 3 | 4 | 5 | 6 | 7,
  track_href: string,
  uri: string,
  valence: number
}
