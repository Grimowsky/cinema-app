import { faker } from "@faker-js/faker";

type MovieRes = {
  titles: Movie[];
};

type Movie = {
  id: string;
  type: string;
  primaryTitle: string;
  originalTitle: string;
  primaryImage: {
    url: string;
    width: number;
    height: number;
  };
  startYear: number;
  runtimeSeconds: number;
  genres: string[];
  rating: {
    aggregateRating: number;
    voteCount: number;
  };
  plot: string;
};

const imdb_url =
  "https://api.imdbapi.dev/titles?types=MOVIE&minAggregateRating=5";

export async function getMovies(): Promise<Movie[]> {
  const res = await fetch(imdb_url, {
    headers: {
      Accept: "application/json",
    },
  });

  if (!res.ok) {
    throw new Error("could not connect with imdb db for some reason");
  }
  const data: MovieRes = (await res.json()) as MovieRes;
  return data.titles;
}

function getGenres(movies: Movie[]) {
  let aggr: string[] = [];

  movies.forEach((m) => {
    aggr = [...aggr, ...m.genres];
  });
  return Array.from(new Set(aggr));
}

function getTitles(movies: Movie[]) {
  const aggr: string[] = [];

  movies.forEach((m) => {
    aggr.push(m.primaryTitle);
  });

  return aggr;
}
function getDescription(movies: Movie[]) {
  const aggr: string[] = [];

  movies.forEach((m) => {
    aggr.push(m.plot);
  });

  return aggr;
}
function getRuntime(amt: number) {
  const aggr: number[] = [];

  for (let i = 0; i < amt; i++) {
    const secondsTime = faker.number.int({
      min: 75 * 60,
      max: 210 * 60,
    });
    aggr.push(secondsTime);
  }

  return aggr;
}

function premiereDate(amt: number) {
  const aggr: string[] = [];

  for (let i = 0; i < amt; i++) {
    const date: Date = faker.date.past({ years: 55 });
    aggr.push(date.toISOString());
  }

  return aggr;
}

function getRating(amt: number) {
  const aggr: number[] = [];

  for (let i = 0; i < amt; i++) {
    const rating = faker.number.float({ min: 0, max: 10 });
    aggr.push(Number(rating.toFixed(2)));
  }

  return aggr;
}
export const imdbSelectors = {
  getGenres,
  getTitles,
  getDescription,
  getRuntime,
  premiereDate,
  getRating,
};
