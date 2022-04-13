import { useEffect, useState } from 'react';
import { MovieId } from '../App';
import './Cast.css';


const Cast = (props: MovieId) => {

    interface Cast {
        character: { name: string; }
        person: {
            name: string;
            image: {
                medium: string;
            }
        }
    }

    const [cast, setCast] = useState<Array<Cast>>();
    const [fetchError, setfetchError] = useState<Error | null>(null);

    
    useEffect(() => {

        const fetchSeries = async () => {

            try {
                const response = await fetch(`https://api.tvmaze.com/shows/${props.movieId}/cast`,{    
                    method: 'GET',    
                })
                if (!response.ok) throw Error('Did not recived expeted data');
                const castData = await response.json();
                setCast(castData);
                setfetchError(null);
            } catch (error: any) {
                setfetchError(error.message);
            }
        
        
        };

        fetchSeries();  
            
    }, [props.movieId]);

    
    if ( cast !== undefined && cast.length > 1){
        return (
            <div className='cast__wrapper'>
                <div className='cast__container'>
                    <div className='cast__tittle'>                        
                        <h2 className='cast__tittle__text'>Top Cast</h2>
                    </div>
                    <div className='cast__list'>
                        {cast.map((item: Cast, index: number) => (
                            <div className='cast__list__item' key={index}>
                                <div className='cast__list__item__avatar'>
                                    <img src={item.person.image ? item.person.image.medium : 'http://placehold.jp/210x295.png'} className='cast__list__item__avatar__img' alt="avatar" loading='lazy'/>
                                </div>
                                <div className='cast__list__item__details'>
                                    <div className='cast__list__item__details__name'>
                                        <p>{item.person.name}</p>
                                    </div>
                                    <div className='cast__list__item__details__character'>
                                        <p>as {item.character.name}</p>
                                    </div>
                                </div>
                            </div>
                        ))}       
        
                    </div>
                </div>
            </div>
        );
    } else {
        return (
           
            <div className='cast__wrapper'>
                <div className='cast__container'>
                     <div className='cast__tittle'>                        
                        <h2 className='cast__tittle__text'>Top Cast</h2>
                    </div>
                    <h2>No cast information</h2>
                </div>
            </div>    
            
        )
    }
    
}

export default Cast;