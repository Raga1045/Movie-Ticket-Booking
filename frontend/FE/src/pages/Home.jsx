import React, { useEffect, useState } from "react";
import Header from "../Components/header";
import Navbar from "../Components/navbar";
import MovieList from "../Components/movielist";

import jw from "../assets/jw.jpg";
import szp from "../assets/szp.jpg";
import kubera from "../assets/kubera.jpeg";
import devara from "../assets/devara.webp";
import sv from "../assets/sv.avif";
import kanappa from "../assets/kanappa.jpg";

function Home() {
  const [selectedLocation, setSelectedLocation] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [movies, setMovies] = useState([]);

  const posterMap = {
    Kannappa: kanappa,
    Kubera: kubera,
    "Jurassic World": jw,
    Devara: devara,
    "Sankrantiki Vastunnam": sv,
    "Sitaare Zameen Par": szp,
  };

  useEffect(() => {
    let url = `http://localhost:5000/api/movies`;
    const params = [];
    if (selectedLocation) params.push(`location=${selectedLocation}`);
    url += params.length > 0 ? `?${params.join("&")}` : "";

    fetch(url)
      .then((res) => res.json())
      .then((data) => {
        const filteredMovies = data.filter((movie) =>
          movie.title.toLowerCase().includes(searchTerm.toLowerCase())
        );
        setMovies(filteredMovies);
      })
      .catch((err) => console.error(err));
  }, [selectedLocation, searchTerm]);

  return (
    <div style={{ backgroundColor: "#0f0f00", color: "#eeeeee" }}>
      <Header
        selectedLocation={selectedLocation}
        onLocationChange={setSelectedLocation}
        searchTerm={searchTerm}
        onSearchTermChange={setSearchTerm}
      />
      <Navbar />

      {movies.length > 0 ? (
        <div className="moviegrid">
          {movies.map((movie) => (
            <MovieList
              key={movie._id}
              {...movie}
              id={movie._id}
              poster={posterMap[movie.title]}
            />
          ))}
        </div>
      ) : (
        <p style={{ color: "#fff" }}>No movies found for this location.</p>
      )}
    </div>
  );
}

export default Home;
