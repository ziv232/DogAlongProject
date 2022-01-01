import React, {useState, useEffect} from 'react';
import axios from 'axios';
import '../css/searchBar.css';


function SearchBar(props){

    const {places, setPlaces, setLoadingScreen, classes} = props;

    const [searchWord, setSearchWord] = useState('');


    const searchFunc = async () => {
        var tempWord = searchWord.replace(/\s+/g, '');
        console.log(tempWord);
        setSearchWord(tempWord);
        if(tempWord == '' || tempWord == undefined){
            console.log('Incorrect search word!');
            return;
        }

       setLoadingScreen(true); 
       await axios.get(`/api/locations/search/${searchWord}`)
       .then(res => setPlaces(res.data))
       .catch(err => console.log(err))
       setLoadingScreen(false); 
    }

    const handleSearchWord = (event) => {
        setSearchWord(event.target.value);
    }

    return(
        <div className="wrap">
            <div className="search">
                <input type="text" className="searchTerm" placeholder="חפש לפי שם המקום" onChange={handleSearchWord}/>
                <button type="submit" className="searchButton" onClick={searchFunc}>
                <i></i>
                 </button>
            </div>
        </div>
    )
}

export default SearchBar;