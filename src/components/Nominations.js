import { useState, useEffect } from 'react';
import firebase from '../firebase';

function Nominations(){
    const [ nomsArray, setNomsArray ] = useState([]);

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
                    movie: Object.values(propertyVal)
                };
                //push into the empty array created earlier
                movieArray.push(formattedObj);
            }
            setNomsArray(movieArray);
            console.log(movieArray)
        });
    }, []);

    //HandleClick to remove movies from database
    function handleClick(id){
        //make reference to the database
        const dbref = firebase.database().ref();
        dbref.child(id).remove();
    }

    return(
        <section>

            <p>Nominations</p>

                <ul>
                    {
                        nomsArray
                        ? nomsArray.map((movie) => {
                            return(
                                <li key={movie.id}>
                                    <p>{movie.movie[1]}</p>
                                    <p>({movie.movie[2]})</p>
                                    <img src={movie.movie[0]} alt={movie.movie[1]}/>
                                    <button 
                                        onClick={() => {handleClick(movie.id)}}
                                    >
                                            Remove
                                    </button>
                                </li>
                                
                            )
                        })
                        : <p>No current nominations</p>

                    }
                </ul>

        </section>
    )
}

export default Nominations;