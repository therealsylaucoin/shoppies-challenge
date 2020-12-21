import { useState, useEffect } from 'react';
import Placeholder from './Placeholder';
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
            return movie.movie.id;
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

//HandleClick to save the movie once it's nominated
    function handleClick(id, title, year, poster){
    //Push the movie to the Firebase Database
        const movie = {
            id: id,
            title: title,
            year: year,
            posterUrl: poster,
        }
        //make reference to the database + push
        const dbref = firebase.database().ref();
        dbref.push(movie);
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
                onKeyDown={handleKeyPress}
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
            < Placeholder array={['','','','','']}/>

            {
                movieSearchArray.map((movie) => {
                    return(
                        <li key={movie.imdbID} className="movie movie__top">
                            < Movie
                                title={movie.Title}
                                year={movie.Year}
                                poster={movie.Poster}
                            />
                            
                            < Button 
                                filteredArray={filteredArray}
                                handleClick={handleClick}
                                id={movie.imdbID}
                                title={movie.Title}
                                year={movie.Year}
                                poster={movie.Poster}
                            />
                        </li>
                    )
                })
            }
        </ul>
    
        </section>
    );
}


function Button(props){

    const [ buttonStatus , setButtonStatus ] = useState(true);
    const { filteredArray, id, title, year, poster } = props;

    useEffect(() => {
        if (filteredArray.includes(id)) {
            setButtonStatus(false);
        }
    }, [filteredArray, id])

    return(
        buttonStatus
        ?   <button 
                id={id}
                onClick={() => 
                    {props.handleClick(id, title, year, poster)}}
                    >
                Nominate
            </button>
        :   <button className="nominated">
                Nominated
            </button>
    )
}

export default Search;