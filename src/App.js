import './styles/App.scss';
import { useState } from 'react';
import Header from './components/Header';
import Banner from './components/Banner'
import Search from './components/Search';
import Nominations from './components/Nominations'
import Footer from './components/Footer'

function App() {

    const [ nomsArray, setNomsArray ] = useState([]);

    return (

    <div className="App">

        < Header />

        <main>

            <section className="searchContainer wrapper">
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
