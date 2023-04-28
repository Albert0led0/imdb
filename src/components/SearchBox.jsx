"use client";
import React from "react";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function SearchBox() {

  const [search, setSearch] = useState("");
  const router = useRouter();

  const handleSearch = (event) => {
    event.preventDefault();
    if (!search) return;
    router.push(`/search?q=${search}`)
  };

  return (
    <form
      onSubmit={handleSearch}
      className="flex max-w-6xl mx-auto justify-between items-center px-5 flex-1"
    >
      <input
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        type="text"
        placeholder="Search ..."
        className="w-full h-14 rounded-lg placeholder-gray-500 outline-none bg-transparent"
      />
      <button disabled={!search} type="submit" className="text-amber-700 disabled:text-gray-400">
        Search
      </button>
    </form>
  );
}
