import '../styles/App.scss';
import { useState } from 'react';
import Banner from './Banner'
import Search from './Search';
import Nominations from './Nominations'
import Footer from './Footer'

function App() {
    const [ nomsArray, setNomsArray ] = useState([]);
    const [ bannerShow, setBannerShow ] = useState(false);

return (
    <div className="App">

        < Search 
            nomsArray={nomsArray}
        />

        < Nominations 
            setNomsArray={setNomsArray}
            nomsArray={nomsArray}
            setBannerShow={setBannerShow}
        />

        {
        bannerShow
            ? < Banner 
                setBannerShow={setBannerShow}/>
            : null
        }

        <Footer />

    </div>  
);
}

export default App;
