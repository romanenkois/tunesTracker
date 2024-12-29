// all floats are in range 0-1

export type AudioFeaturesDTO = {
  acousticness: number,
  analysis_url: string,
  danceability: number,
  duration_ms: number,
  id: string,
  instrumentalness: number,
  key: number, // -1-11 keys range
  liveness: number,
  loudness: number, // between -60 and 0 in dB
  mode: 0 | 1, // 1 major, 0 minor
  speechiness: number,
  tempo: number,
  time_signature: 3 | 4 | 5 | 6 | 7,
  track_href: string,
  type: 'audio_features',
  uri: string,
  valence: number
}
