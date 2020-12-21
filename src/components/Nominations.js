import { useEffect } from 'react';
import firebase from '../firebase';
import Placeholder from './Placeholder';
import Movie from './Movie';

function Nominations(props){
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
            props.setNomsArray(movieArray);
        });
    }, []);

    //HandleClick to remove movies from database
    function handleClick(id){
        //make reference to the database
        const dbref = firebase.database().ref();
        dbref.child(id).remove();
    }

return(
        <section className="wrapper nominations">

            <h3>Your nominations</h3>

                <div className="ulContainer">

                    < Placeholder array={[1, 2, 3, 4, 5]}/>

                    {/* //Display the movies on the page by mapping through the array */}
                    <ul>

                        { 
                            props.nomsArray.map((movie) => {
                                return(
                                    <li key={movie.id} className="movie">

                                        < Movie 
                                            title={movie.movie.title}
                                            year={movie.movie.year}
                                            poster={movie.movie.posterUrl}
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
                    </ul>

                </div>

        </section>
    )
}

export default Nominations;