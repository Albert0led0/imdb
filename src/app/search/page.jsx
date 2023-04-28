import React from "react";
import Results from "@/components/Results";

export default async function SearchPage({ searchParams }) {
  const API_KEY = process.env.API_KEY;
  const searchTerm = searchParams["q"];

  const url = `https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&query=${searchTerm}&language=en-US&include_adult=false`;
  const res = await fetch(url);

  if (!res.ok) {
    throw new Error("Error fetching data");
  }

  const data = await res.json();

  const results = data.results;

  return (
    <div>
      {results && results.length === 0 && (
        <h1 className="text-center pt-6">No results found</h1>
      )}
      {results && <Results results={results} />}
    </div>
  );
}
