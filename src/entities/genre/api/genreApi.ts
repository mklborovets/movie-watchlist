import {httpClient} from '@/shared';
import {Genre, GenreListResponseDto} from '../model/types';

export const genreApi = {
  async fetchGenres(): Promise<Genre[]> {
    const response = await httpClient.get<GenreListResponseDto>(
      '/genre/movie/list',
    );
    return response.data.genres;
  },
};
