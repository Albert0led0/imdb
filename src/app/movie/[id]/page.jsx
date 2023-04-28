import React from "react";
import Image from "next/image";
import moment from "moment";

export default async function MoviePage({ params, searchParams }) {
  const API_KEY = process.env.API_KEY;

  const movieId = params.id;
  const mediaType = searchParams["media-type"];
  const url = `https://api.themoviedb.org/3/${mediaType}/${movieId}?api_key=${API_KEY}`;

  console.log(url)
  const options = {
    next: { revalidate: 10000 },
    timeout: 30000,
  };

  const res = await fetch(url, options);
  const movie = await res.json();

  let releaseDate = "";
  if (movie.release_date) {
    releaseDate = moment(movie.release_date).format("DD/MM/YYYY");
  } else {
    releaseDate = moment(movie.first_air_date).format("DD/MM/YYYY");
  }

  return (
    <div className="w-full">
      <div className="p-4 md:pt-8 flex flex-col md:flex-row items-center content-center max-w-6xl mx-auto md:space-x-6">
        <Image
          src={`https://image.tmdb.org/t/p/original/${
            movie.backdrop_path || movie.poster_path
          }`}
          width={500}
          height={300}
          className="sm:rounded-t-lg group-hover:opacity-80 transition-opacity duration-200"
          style={{
            maxWidth: "100%",
            height: "100%",
          }}
          placeholder="blur"
          blurDataURL="/spinner.svg"
          alt="image is not available"
        ></Image>
        <div className="p-2">
          <h2 className="text-lg mb-3 font-bold">
            {movie.title || movie.name}
          </h2>
          <p className="sm:text-lg mb-3">
            <span className="font-semibold mr-1">Overview: </span>
            {movie.overview}
          </p>
          <p className="sm:text-lg mb-3">
            <span className="font-semibold">Release date: </span>
            {releaseDate}
          </p>
          <p className="sm:text-lg mb-3">
            <span className="font-semibold">Rating: </span>
            {movie.vote_count}
          </p>
        </div>
      </div>
    </div>
  );
}
