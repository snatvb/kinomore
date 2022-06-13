import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';
import {API_KEY, API_URL} from '@/constants/api'
import {IData} from '@/types/IData';
import {IFilm} from '@/types/IFilm';
import {IFilterArgs} from '@/types/IFilterArgs';
import {ISearchArgs} from '@/types/ISearchArgs';
import { getCurrentYear } from '@/helpers/getCurrentYear/getCurrentYear';

export const kinopoiskAPI = createApi({
  reducerPath: 'kinopoiskAPI',
  baseQuery: fetchBaseQuery({baseUrl: API_URL}),
  endpoints: (build) => ({
    getFilmById: build.query<IFilm, string | string[] | undefined>({
      query: id =>
        `/movie?search=${id}&field=id&token=${API_KEY}`
    }),
    getNewFilms: build.query<IData, number>({
      query: limit =>
        `/movie?field=rating.kp&search=5-10&field=year&search=${getCurrentYear()}&field=typeNumber&search=1&limit=${limit}&sortField=year&sortType=1&sortField=votes.imdb&sortType=-1&token=${API_KEY}`
    }),
    getNewSeries: build.query<IData, number>({
      query: limit =>
        `/movie?field=rating.kp&search=5-10&field=year&search=${getCurrentYear()}&field=typeNumber&search=2&limit=${limit}&sortField=year&sortType=1&sortField=votes.imdb&sortType=-1&token=${API_KEY}`,
    }),
    getFilmByName: build.query<IData, ISearchArgs>({
      query: args =>
        `/movie?search=${args.search}&field=name&limit=${args.limit}isStrict=false&token=${API_KEY}`
    }),
    getBestFilms: build.query<IData, IFilterArgs>({
      query: ({filters, page}) =>
        `/movie?field=rating.kp&search=${filters.rating.minValue}-${filters.rating.maxValue}&field=year&search=${filters.year.minValue}-${filters.year.maxValue}&field=typeNumber&search=1&sortField=year&sortType=${filters.sortByRelease}&limit=10&page=${page}&token=${API_KEY}`
    }),
    getComedyFilms: build.query<IData, IFilterArgs>({
      query: ({filters, page}) =>
        `/movie?search[]=movie&search[]=комедия&search[]=${filters.year.minValue}-${filters.year.maxValue}&search[]=${filters.rating.minValue}-${filters.rating.maxValue}&search=!null&search=!null&field[]=type&field[]=genres.name&field[]=year&field=rating.kp&field=name&sortField=year&sortType=${filters.sortByRelease}&field=votes.kp&limit=10&page=${page}&token=${API_KEY}`
    }),
    getWarFilms: build.query<IData, IFilterArgs>({
      query: ({filters, page}) =>
        `/movie?search[]=movie&search[]=военный&search[]=${filters.year.minValue}-${filters.year.maxValue}&search[]=${filters.rating.minValue}-${filters.rating.maxValue}&search=!null&search=!null&field[]=type&field[]=genres.name&field[]=year&field=rating.kp&field=name&sortField=year&sortType=${filters.sortByRelease}&field=votes.kp&limit=10&page=${page}&token=${API_KEY}`
    }),
    getHorrorFilms: build.query<IData, IFilterArgs>({
      query: ({filters, page}) =>
        `/movie?search[]=movie&search[]=ужасы&search[]=${filters.year.minValue}-${filters.year.maxValue}&search[]=${filters.rating.minValue}-${filters.rating.maxValue}&search=!null&search=!null&field[]=type&field[]=genres.name&field[]=year&field=rating.kp&field=name&sortField=year&sortType=${filters.sortByRelease}&field=votes.kp&limit=10&page=${page}&token=${API_KEY}`
    }),
  }),
});

export const {
  useGetNewFilmsQuery,
  useGetNewSeriesQuery,
  useGetFilmByIdQuery,
  useGetFilmByNameQuery,
  useGetBestFilmsQuery,
  useGetComedyFilmsQuery,
  useGetWarFilmsQuery,
  useGetHorrorFilmsQuery
} = kinopoiskAPI;

export const {
  getNewFilms,
  getNewSeries,
  getFilmById,
  getFilmByName,
  getBestFilms,
  getComedyFilms,
  getWarFilms,
  getHorrorFilms
} = kinopoiskAPI.endpoints;