import '../styles/App.scss';
import { useState } from 'react';
import Header from './Header';
import Banner from './Banner'
import Search from './Search';
import Nominations from './Nominations'
import Footer from './Footer'

function App() {
    const [ nomsArray, setNomsArray ] = useState([]);

    return (

    <div className="App">

        < Header />

        <main>

            <section>
                {
                nomsArray.length === 5
                ? < Banner />
                : < Search 
                    nomsArray={nomsArray}
                />
                }
            </section>

            < Nominations 
                setNomsArray={setNomsArray}
                nomsArray={nomsArray}
            />

        </main>

        <Footer />

    </div>  

    );
}

export default App;
