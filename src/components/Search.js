import { useState, useEffect } from 'react';
import Movie from './Movie';
import axios from 'axios';
import firebase from '../firebase.js'
import { AiFillCloseCircle, AiOutlineSearch } from 'react-icons/ai';

function Search(props){
    const [ movieSearch, setMovieSearch ] = useState('');
    const [ movieSearchArray, setMovieSearchArray ] = useState([]);
    const [ filteredArray, setFilteredArray ] = useState([]);
    const [ userMessage, setUserMessage ] = useState('');
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
                setUserMessage('');
            } else if (movieSearch === '' || movieSearch === undefined){
                setUserMessage('');
            } else { //Error handling for api returning no movies
                setUserMessage(`For "${movieSearch}" - ${response.data.Error}`);
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
    <header className="search wrapper">

            <div className="title">
                <h1>The 2021 Shoppies</h1>
                <h2>Movie Awards for Entrepreneurs</h2>
            </div>

            <fieldset className="movieSearch">
                    <label className="srOnly" htmlFor='movieSearch'>Enter movie     title:</label>
                    <span className="icon">< AiOutlineSearch /></span>
                    <input 
                        type='text' 
                        id='movieTitle'
                        placeholder="Search Movies"
                        autoComplete="off"
                        onKeyDown={handleKeyPress}
                        onChange={handleChange}
                        >
                </input>
            {
            //If the movieSearch input has more than one character, give the user the ability to clear the field and results
            movieSearchArray.length >= 1
                ? <button
                    onClick={handleClear}
                    >
                        <span className="icon">< AiFillCloseCircle /></span>
                    </button>
                    : null
            }
            </fieldset>
            
            {
            //If there is a userMessage (error message form the api) - 
            //Display that message to the user,
            //Else, display the search results (ul)
            userMessage
                ?  <p className="results">{userMessage}</p>

                :   <ul className="results">
                {   
                    movieSearchArray.map((movie) => {
                        return(
                            <li key={movie.imdbID} className="results__movie">
                                < Movie
                                    movie={movie}
                                />

                                < Button 
                                    filteredArray={filteredArray}
                                    nomsArray={nomsArray}
                                    handleClick={handleClick}
                                    movie={movie}
                                />
                            </li>
                        )
                    })
                }
                </ul>
            }

    </header>
);
}

function Button(props){
    const [ buttonStatus , setButtonStatus ] = useState(true);
    const [ buttonLabel, setButtonLabel ] = useState('Nominate')
    const { filteredArray, nomsArray, movie } = props;

    useEffect(() => {
        if (filteredArray.includes(movie.imdbID)) {
            setButtonStatus(false);
            setButtonLabel('Added');
        } else {
            setButtonStatus(true);
            setButtonLabel('Nominate');
        }
    }, [filteredArray, movie.imdbID])

    return(
        //render the buttons only if the nomsArray is not full (aka less than five). If the user has nominated 5 movies already, the button will not show.
        nomsArray.length < 5

        ? buttonStatus //Bases on the status, button will be different(able or disabled)
            ?   <button 
                    id={movie.imdbID}
                    onClick={() => 
                        {props.handleClick(movie)}}
                >
                    {buttonLabel}
                </button>
            :       <button className="disabled">
                    {buttonLabel}
                </button>

        : null
    )
}

export default Search;