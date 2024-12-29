import { AudioFeaturesDTO } from "@dto/audio-features.dto";
import { AudioFeatures } from "@entity/audio-features.entity";

export class AudioFeaturesMapper {
  public static toEntity(dto: AudioFeaturesDTO): AudioFeatures {
    return {
      acousticness: (dto.acousticness > 0 && dto.acousticness < 1) ? Math.round(dto.acousticness * 100) : 0,
      analysis_url: dto.analysis_url,
      danceability: (dto.danceability > 0 && dto.danceability < 1) ? Math.round(dto.danceability * 100) : 0,
      duration_ms: dto.duration_ms,
      id: dto.id,
      instrumentalness: (dto.instrumentalness > 0 && dto.instrumentalness < 1) ? Math.round(dto.instrumentalness * 100) : 0,
      key: dto.key,
      liveness: (dto.liveness > 0 && dto.liveness < 1) ? Math.round(dto.liveness * 100) : 0,
      loudness: dto.loudness,
      mode: dto.mode,
      speechiness: (dto.speechiness > 0 && dto.speechiness < 1) ? Math.round(dto.speechiness * 100) : 0,
      tempo: dto.tempo,
      time_signature: dto.time_signature,
      track_href: dto.track_href,
      uri: dto.uri,
      valence: (dto.valence > 0 && dto.valence < 1) ? Math.round(dto.valence * 100) : 0
    };
  }
}
