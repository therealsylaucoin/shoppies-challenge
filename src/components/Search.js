import { useState, useEffect } from 'react';
import axios from 'axios';
import firebase from '../firebase.js'

//API call to get movies that match the user input
function Search(){
    const [ movieSearchArray, setMovieSearchArray ] = useState([]);
    const [ movieSearch, setMovieSearch ] = useState('');

    //make axios call to get list of movies
    useEffect(() => {
        axios({
            url: 'https://www.omdbapi.com/?apikey=ccfe7e55&',
            method: 'GET',
            params: {
                type: 'movie',
                s: movieSearch,
            }
        }).then((response) => {
            if (response.data.Search !== undefined){
                setMovieSearchArray(response.data.Search.slice(0 , 5));
            }
            console.log(response.data.Search);
        }) 
    }, [movieSearch])
    

//Handle change to grab the user input from the form
    function handleChange(e){
        //set the state for the movie being searched
        setMovieSearch(e.target.value);
    }

//HandleClick to save the movie once it's nominated
    function handleClick(title, year, poster){
        const movieObject = {
            title: title,
            year: year,
            posterUrl: poster
        }
        //make reference to the database
        const dbref = firebase.database().ref();
        dbref.push(movieObject);
    }

    return (
    <section className="search">
        <h3>Search for a movie</h3>
        <form>
            <label htmlFor='movieSearch'>Movie title:</label>
            <input 
                type='text' 
                id='movieTitle'
                //on change will fire every time there is a change - we need this to get the value of the input
                onChange={handleChange}
                >
            </input>
        </form>
        {
            movieSearch
            ? <h3>Results for "{movieSearch}"</h3>
            : null
        }
        

        {/* //Display the movies on the page by mapping through the array */}
        <ul>
            {
                movieSearchArray
                ? movieSearchArray.map((movie) => {
                    return(
                        <li key={movie.imdbID}>
                            <p>{movie.Title}</p>
                            <p>({movie.Year})</p>
                            <img src={movie.Poster} alt={movie.Title}/>
                            <button 
                                onClick={() => {
                                    handleClick(movie.Title, movie.Year, movie.Poster)
                                }}>
                                    Nominate
                            </button>
                        </li>
                    )
                })
                : null
            }
        </ul>
    
        </section>
    );
}

export default Search;