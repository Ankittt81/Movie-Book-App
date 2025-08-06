import React from 'react'
import { useEffect,useState } from 'react'
import { GetAllMovies } from '../apiCalls/movies'

function Home() {
  const [movies,setMovies]=useState([])

  useEffect(async ()=>{
    const response=await GetAllMovies()
    console.log(response)
    setMovies(response.data)
  },[])
  return (
    <div>
      {movies &&
        movies.map((movieObj) => (
          <Card
            hoverable
            style={{ width: 240 }}
            cover={
              <img
                alt="example"
                src={`${movieObj.poster}`}
              />
            }
          >
            <Meta title={`${movieObj.title}`} description={`{}`} />
          </Card>
        ))}
    </div>
  );
}

export default Home