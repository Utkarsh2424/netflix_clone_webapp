import React,{useState, useEffect} from 'react';
import axios from './axios';
import './row.css';
import YouTube from "react-youtube";
import movieTrailer from "movie-trailer";

//fetchURL in line 15 appends to the link and gets the image to be loaded
const base_url = "https://image.tmdb.org/t/p/original/"; 

function Row({title, fetchUrl, isLargeRow}){
    // to keep track of movies
    const [movies,setMovies] = useState([]);
    const [trailerUrl, setTrailerUrl] = useState("");

    // code that runs on a specific conditions/variables
    useEffect(()=> {
        //if [], run once when the row load, and dont run it again
        async function fetchData(){ 
            //await means it waits even if takes any seconds
            const request = await axios.get(fetchUrl); 
            setMovies(request.data.results);
            return request; 
        }
        fetchData();

    //this should be included because whenever it changes it needs to update
    }, [fetchUrl]); 

    const opts = {
        height: "390",
        width: "100%",
        playerVars: {
          autoplay: 1,
        },
      };

        //fucntion used to open and close the trailer
      const handleClick = (movie) => {
        // console.table(movie?.title)
        if (trailerUrl) {
          setTrailerUrl('');
        } else {
            //search
          movieTrailer(movie?.name || "")//try to find a movie trailer
            .then((url) => {
                //use this line to take out the last part of the youtube link
                //for example https://www.youtube.com/watch?v=8euyfbdsjksks=5 
                //so the urlParamns 'v' gets the value of v from the link
              const urlParams = new URLSearchParams(new URL(url).search);
              setTrailerUrl(urlParams.get("v"));
            })
            .catch((error) => console.log(error));//gives error if not working
        }
      }

    return (
        <div className='row'>
            <h2>{title}</h2>
            <div className="row_posters">
                {movies.map(movie => (
                    <img 
                        //optimization done using key
                        key={movie.id}
                        onClick={() => handleClick(movie)}
                        className={`row_poster ${isLargeRow && "row_posterLarge"}`}
                        src={`${base_url}${
                            isLargeRow ? movie.poster_path : movie.backdrop_path
                        }`} 
                        alt={movie.name}
                    />
                ))}
            </div>
            <div style={{ padding: "40px" }}>
            {trailerUrl && <YouTube videoId={trailerUrl} opts={opts} />}
            </div>
        </div>
    );
}

export default Row;