import { MutableRefObject, useEffect, useRef, useState } from 'react';
import { MovieId } from '../App';
import Loading from '../Loading/Loading';
import EpisodeModal from './EpisodeModal';
import './EpisodesList.css';


const EpisodesList = (props: MovieId) => {

        
    interface Episode {
        runtime: number;
        airdate: string;
        summary: string;
        season: number;
        number: number;
        name: string;
        rating: {
            average: number;
        }  
    }

    const [episodes, setEpisodes] = useState<Array<Episode>>();
    const [season, setSeason] = useState(1);
    const [fetchError, setfetchError] = useState<string | null>(null);
    const [openModal, setOpenModal] = useState(false);
    const [episodeSummary, setEpisodeSummary] = useState<string>();
    const [episodeNumber, setEpisodeNumber] = useState<string>();
    
    const cardList = useRef<HTMLDivElement | null>(null);

    let seasonCount: Array<number> = []; 
    

    useEffect(() => {

        const fetchSeries = async () => {

            try {
                const response = await fetch(`https://api.tvmaze.com/shows/${props.movieId}/episodes`,{    
                    method: 'GET',    
                })
                if (!response.ok) throw Error('Did not recived expeted data');
                const episodesData = await response.json();
                setEpisodes(episodesData);
                setfetchError(null);

                

            } catch (error: any) {
                
                setfetchError(error.message);

                console.log(fetchError);
                console.log(typeof fetchError);
            }
        
        
        };

        fetchSeries();          
        setSeason(1);        
        scrollToTop(cardList);

    }, [props.movieId]);

    //scrolling to top when change season
    useEffect(() => {
        scrollToTop(cardList);

    }, [season]);


   
    function scrollToTop(element: MutableRefObject<HTMLDivElement | null>) {
        if (element.current !== undefined && element.current !== null) {
            element.current.scrollTo(0, 0);
        }       
    }

 
    //count seasons
    if (episodes !== undefined) {      
        episodes.forEach((element: Episode) => { if(!seasonCount.includes(element.season)){
            seasonCount.push(element.season);
        }            
        });     
    }
  
        

    if (fetchError !== null) {
        return (
            <h2 className='error'>{fetchError}</h2>
        )
    }

    if (episodes !== undefined && episodes.length >= 1) {
        return (
            <div className='episodes__modalContainer'>
                {openModal && <EpisodeModal sum={episodeSummary} closeModal={setOpenModal} episodeName={episodeNumber}/>}   
            <div className='episodes__wrapper'>     
                   
                <div className='episodes__container'>
                    <div className='episodes__tittle'>
                        <h2 className='episodes__tittle__text'>Episodes ({season} Season)</h2>
                    </div>
                    <div className='episodes__seasonSelect'>
                        <div className='episodes__seasonSelect__tittle'>
                            BROWSE EPISODES 
                        </div>
                        <div className='episodes__seasonSelect__selector'>
                            {seasonCount.map((season: number, index: number) => (
                               
                                <div className='episodes__seasonSelect__selector__button' key={index} onClick={() => setSeason(season)}>{season} Season</div>
                                                             
                            ))}
                        </div>
                    </div>           
                    <div className='episodes__card__list' ref={cardList}>
                        
                        {episodes && episodes.filter((episode: Episode)  => (episode.season === season)).map((filteredEpisode: Episode, index: number) => (
                            <div className='episodes__card' key={index}>
                                <div className='episodes__cardHead'>
                                    <div className='episodes__cardHead__ribbon'>
                                        <div>
                                            <svg className='episodes__cardHead__ribbon__bg' width="24px" height="34px" viewBox="0 0 24 34" fill="currentColor" role="presentation">
                                                <polygon points="24 0 0 0 0 32 12.2436611 26.2926049 24 31.7728343"></polygon>
                                                <polygon points="24 0 0 0 0 32 12.2436611 26.2926049 24 31.7728343"></polygon>
                                                <polygon points="24 31.7728343 24 33.7728343 12.2436611 28.2926049 0 34 0 32 12.2436611 26.2926049"></polygon>
                                            </svg>
                                        </div>
                                        <div className='episodes__cardHead__ribbon__icon'>
                                            <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" role="presentation">
                                                <path fill="none" d="M0 0h24v24H0V0z"></path>
                                                <path d="M18 13h-5v5c0 .55-.45 1-1 1s-1-.45-1-1v-5H6c-.55 0-1-.45-1-1s.45-1 1-1h5V6c0-.55.45-1 1-1s1 .45 1 1v5h5c.55 0 1 .45 1 1s-.45 1-1 1z"></path>
                                            </svg>
                                        </div>
                                    </div>
                                    
                                    <div className='episodes__cardHead__content'>
                                        <div className='episodes__cardHead__content__runtime cardHead__text'>
                                            {filteredEpisode.runtime === null ? 'NA' : filteredEpisode.runtime} min 
                                        </div>
                                        <div className='episodes__cardHead__content__date cardHead__text'>
                                            {filteredEpisode.airdate}
                                        </div>
                                    </div>
                                </div>                                
                                
                                <div className='episodes__card__link' onClick={() => {setOpenModal(true); 
                                    setEpisodeSummary(filteredEpisode.summary !== null && filteredEpisode.summary !== "" ? filteredEpisode.summary.replace(/(<([^>]+)>)/gi, "") : 'No description');
                                    setEpisodeNumber(`S${filteredEpisode.season}.E${filteredEpisode.number} - ${filteredEpisode.name}`)
                                    }}>

                                    <div className='episodes__card__tittle'>
                                        <div>
                                            S{filteredEpisode.season}.E{filteredEpisode.number} 
                                        </div> 
                                        <div className='episodes__card__tittle__name'>
                                            {filteredEpisode.name}
                                        </div>
                                    </div>
                                    <div className='episodes__card__summary'>                                       
                                        {filteredEpisode.summary !== null && filteredEpisode.summary !== "" ? 
                                            <p>{filteredEpisode.summary.replace(/(<([^>]+)>)/gi, "")}</p> :
                                            <p>No description</p>
                                            
                                        }
                                    </div>   
                                </div>                             
                                <div className='episodes__card__rate'>
                                    <div>
                                        <svg className='episodes__card__rate__star' width="24" height="24" viewBox="0 0 24 24" fill="currentColor" role="presentation">
                                            <path d="M12 20.1l5.82 3.682c1.066.675 2.37-.322 2.09-1.584l-1.543-6.926 5.146-4.667c.94-.85.435-2.465-.799-2.567l-6.773-.602L13.29.89a1.38 1.38 0 0 0-2.581 0l-2.65 6.53-6.774.602C.052 8.126-.453 9.74.486 10.59l5.147 4.666-1.542 6.926c-.28 1.262 1.023 2.26 2.09 1.585L12 20.099z"></path>
                                        </svg>
                                        
                                    </div>
                                    <div className='episodes__card__rate__number'>
                                        {filteredEpisode.rating.average === null ? 'NA' : filteredEpisode.rating.average}<span>/10</span>
                                       
                                    </div>
                                </div>
                            </div>
                            
                        ))}
                    </div>         
                    
                    
                
                </div>
               
            </div>
            </div>
        )
    } else {
        return (
            <Loading />
        )
    }
    

}   

export default EpisodesList;

/*

{episodes && episodes.filter((episode: any)  => (episode.season === selectedSeason)).map((filteredEpisode: any, index: number) => (
    <div key={index}>{filteredEpisode}</div>
))}

*/