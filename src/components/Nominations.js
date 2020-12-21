import { useEffect, useState } from 'react';
import firebase from '../firebase';
import Movie from './Movie';

function Nominations(props){
    const { nomsArray, setNomsArray } = props;
    const [ placeholderArray, setPlaceholderArray ] = useState([]);

    useEffect(() => {
        //make a reference to the database
        const dbRef = firebase.database().ref();

        //obtain the data object from the database using Firebase methods
        dbRef.on('value', (data) => {
            const firebaseDataObj = data.val();
            //getting an object - want an array!
            let movieArray = []; //empty array to push into
            for (let propertyKey in firebaseDataObj){
                //extracting the key and the values 
                const propertyVal = firebaseDataObj[propertyKey];
                const formattedObj = {
                    id: propertyKey,
                    movie: propertyVal
                };
                //push into the empty array created earlier
                movieArray.push(formattedObj);
            }
            setNomsArray(movieArray);
        });
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

//Placeholder array to display placeholders for the nominations
    useEffect((i) => {
        const numOfPlaceholder = 5 - (nomsArray.length);
        const array = [];
        for (i = 1; i <= numOfPlaceholder ; i ++ ) {
            array.push(i);
            setPlaceholderArray(array);
        }
    }, [nomsArray])

//HandleClick to remove movies from database
    function handleClick(id){
        //make reference to the database
        const dbref = firebase.database().ref();
        dbref.child(id).remove();
    }

return(
        <section className="wrapper nominations">

            <h3>Your nominations</h3>

                    {/* //Display the movies on the page by mapping through the array */}
                    <ul>
                        { 
                            props.nomsArray.map((movie) => {
                                return(
                                    <li key={movie.id} className="movie">
                                        < Movie 
                                            movie={movie.movie}
                                        />
                                        <button
                                                onClick={() => {handleClick(movie.id)}}
                                            >
                                                Remove
                                        </button>
                                    </li>
                                )
                            })
                        }

                        {
                            nomsArray.length < 5
                            ? placeholderArray.map((index) => {
                                return(
                                    <li key={index} className="placeholder">
                                    </li>
                                )
                            })
                            : null
                        }
                    </ul>

        </section>
    )
}

export default Nominations;