import {httpClient} from './httpClient';
import {ENV} from '@/shared/config';

export interface TmdbAccountMutationResponse {
  success: boolean;
  status_code: number;
  status_message: string;
}

export interface ToggleWatchlistPayload {
  mediaId: number;
  watchlist: boolean;
}

export interface ToggleFavoritePayload {
  mediaId: number;
  favorite: boolean;
}

export const tmdbAccountApi = {
  async toggleWatchlist({
    mediaId,
    watchlist,
  }: ToggleWatchlistPayload): Promise<TmdbAccountMutationResponse> {
    const accountId = ENV.tmdbAccountId;
    const response = await httpClient.post<TmdbAccountMutationResponse>(
      `/account/${accountId}/watchlist`,
      {
        media_type: 'movie',
        media_id: mediaId,
        watchlist,
      },
    );
    return response.data;
  },

  async toggleFavorite({
    mediaId,
    favorite,
  }: ToggleFavoritePayload): Promise<TmdbAccountMutationResponse> {
    const accountId = ENV.tmdbAccountId;
    const response = await httpClient.post<TmdbAccountMutationResponse>(
      `/account/${accountId}/favorite`,
      {
        media_type: 'movie',
        media_id: mediaId,
        favorite,
      },
    );
    return response.data;
  },
};
