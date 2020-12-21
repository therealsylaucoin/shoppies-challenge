import { useState, useEffect } from 'react';
import Movie from './Movie';
import axios from 'axios';
import firebase from '../firebase.js'



function Search(props){
    const [ movieSearch, setMovieSearch ] = useState('');
    const [ movieSearchArray, setMovieSearchArray ] = useState([]);
    const [ filteredArray, setFilteredArray ] = useState([]);

    const { nomsArray } = props;

    //API call to get movies that match the user input
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
        }) 

    }, [movieSearch])

//Save a filtered array with only the IDs in order to check the search IDs against the nominations IDs
//To be used for the search results buttons (abled/disabled)
    useEffect(() => {
        const array2 = movieSearchArray.map((movie) => {
            return movie.imdbID
        })
        const array1 = nomsArray.map((movie) => {
            return movie.movie.imdbID;
        })
        // eslint-disable-next-line no-extend-native
        Array.prototype.diff = function(arr2) {
            let ret = [];
            this.sort();
            arr2.sort();
            for(let i = 0; i < this.length; i += 1) {
                if(arr2.indexOf(this[i]) > -1){
                    ret.push(this[i]);
                }
            }
            return ret;
        };
        const filteredArray = array1.diff(array2);
        setFilteredArray(filteredArray);

    }, [nomsArray, movieSearchArray])
    

//Handle change to grab the user input from the form
    function handleChange(e){
        //set the state for the movie being searched
        setMovieSearch(e.target.value);
    }

//Clear the input + search results
    function handleClear(e){
        e.preventDefault();
        const field = document.getElementById('movieTitle');
        field.value = '';
        setMovieSearch();
        setMovieSearchArray([]);
    }

//HandleClick to save the movie once it's nominated
    function handleClick(movie){
    //Push the movie to the Firebase Database
        const obj = {
            imdbID: movie.imdbID,
            Title: movie.Title,
            Year: movie.Year,
            Poster: movie.Poster,
        }
        //make reference to the database + push
        const dbref = firebase.database().ref();
        dbref.push(obj);
    }

//Prevent refresh on enter
    function handleKeyPress(e){
        if (e.key === 'Enter'){
            e.preventDefault();
        }
    }

return (
    <section className="search wrapper">

        <h3>Search for a movie</h3>

        <form>
            <label className="srOnly" htmlFor='movieSearch'>Movie title: </label>
            <input 
                type='text' 
                id='movieTitle'
                placeholder="Movie title"
                autoComplete="off"
                onKeyDown={handleKeyPress}
                onChange={handleChange}
                >
            </input>
            
                <button
                    onClick={handleClear}
                >
                        Clear search
                </button>
            
        </form>

        {
            movieSearch
            ? <p>Results for "{movieSearch}"</p>
            : <p>Enter a title to display movies.</p>
        }

        <div className="ulContainer">

            {/* //Display the movies on the page by mapping through the array */}
            <ul>
            {   
                movieSearchArray.map((movie) => {
                    return(
                        <li key={movie.imdbID} className="movie">
                            < Movie
                                movie={movie}
                            />
                            
                            < Button 
                                filteredArray={filteredArray}
                                handleClick={handleClick}
                                movie={movie}
                                label='Nominate'
                                altLabel='Nominated'
                            />
                        </li>
                    )
                })
            }
            </ul>

        </div>
    
    </section>
);
}

function Button(props){

    const [ buttonStatus , setButtonStatus ] = useState(true);
    const { filteredArray, movie } = props;

    useEffect(() => {
        if (filteredArray.includes(movie.imdbID)) {
            setButtonStatus(false);
        } else {
            setButtonStatus(true);
        }
    }, [filteredArray, movie.imdbID])

    return(
        buttonStatus
        ?   <button 
                id={movie.imdbID}
                onClick={() => 
                    {props.handleClick(movie)}}
                    >
                {props.label}
            </button>
        :   <button className="disabled">
                {props.altLabel}
            </button>
    )
}

export default Search;