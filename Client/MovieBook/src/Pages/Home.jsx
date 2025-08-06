import React, { useEffect, useState } from "react";
import { Card } from "antd";
import { GetAllMovies } from "../apiCalls/movies";

const { Meta } = Card; // ← This is the fix

function Home() {
  const [movies, setMovies] = useState([]);

  const moviesInfo = async () => {
    const response = await GetAllMovies();
    console.log(response);
    setMovies(response.data);
  };

  useEffect(() => {
    moviesInfo();
  }, []);

  return (
    <div>
      {movies &&
        movies.map((movieObj) => (
          <Card
            hoverable
            style={{ width: 240 }}
            cover={<img alt="example" src={`${movieObj.poster}`} />}
          >
            <Meta title={`${movieObj.title}`} description={`{}`} />
          </Card>
        ))}
    </div>
  );
}

export default Home;
