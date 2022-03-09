import './App.css';
import SeriesDetails from './SeriesDetails/seriesDeatils';
import Cast from './Cast/Cast';
import SeriesList from './SeriesList/seriesList';
import { MovieIdContext } from './movieIdContext';
import { useState } from 'react';
import ErrorBoundary from './ErrorBoundary';
import EpisodesList from './EpisodeList/EpisodesList';
import Footer from './Footer/Footer';
import Navbar from './Navbar/Navbar';


export interface MovieId {
  movieId: number;
}

export interface Series { 
  id: number;
  name: string;
  language: string;
  premiered: string;
  externals: { imdb: string; } 
  rating: { average: number; }
  image: {
    original: string;
    medium: string;
  }
  network: { name: string; }
  genres: [];
  type: string; 
  status: string;
  officialSite: string | null;
  summary: string;
};



function App() {

  
  function getRandomArbitrary(min: number, max: number) {
    return Math.floor(Math.random() * (max - min) + min);
  }  


  const [id, setId] = useState(getRandomArbitrary(0, 1000));

  console.log(typeof MovieIdContext)
   console.log(MovieIdContext) 
  
  return (
      <div className='App'>
          
          <Navbar />
          <ErrorBoundary>
          <MovieIdContext.Provider value={{ id, setId }}>   
              
              <SeriesDetails movieId={id}/>  
              <Cast movieId={id}/>  
              <EpisodesList movieId={id}/>
              <SeriesList />
            </MovieIdContext.Provider>   
          </ErrorBoundary>      
          <Footer />
         
      </div>
  
  );
}

export default App;
