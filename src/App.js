import './styles/App.scss';
import Header from './components/Header';
import Search from './components/Search';
import Nominations from './components/Nominations'
import Footer from './components/Footer';

//Pseudo
//make axios call to get list of movies
//autocomplete search input from that list
//grad the user input and make axios call with the input
//print results
//when user clicks nominate button, push that movie to a database
//component nomiations prints those nominations - with a button to delete
//when nominations array (from dbref) =5, show banner and remove search component

function App() {
  return (
    <div className="App">

      < Header />

      <main>

        < Search />

        < Nominations />

        {/* < Banner /> */}

      </main>

      <Footer />

    </div>
  );
}

export default App;
