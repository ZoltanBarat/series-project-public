import { useContext, useEffect, useState } from "react";
import { MovieIdContext } from "../movieIdContext";
import styles from "./seriesList.module.css";
import React from "react";
import Loading from "../Loading/Loading";
import { Series } from "../App";

type ButtonProps = {
  SeriesId: number;
  tittle: string;
};

const ButtonComponent = ({ SeriesId, tittle }: ButtonProps) => {

  const { id, setId } = useContext(MovieIdContext);

  function changeId(id: number) {
    setId(id);   
  }

  return (
    <a
      href="#details"
      className={styles.seriesButton}
      onClick={() => changeId(SeriesId)}
    >
      {tittle}
    </a>
  );
};

function SeriesList() {

  const pickedData: Series[] = [];
  const [data, setData] = useState<Array<Series>>();
  const [fetchError, setfetchError] = useState<string | null>(null);
  const [randomButtonClicked,setRandomButtonClicked] = useState(false)

  function getRandomArbitrary(min: number, max: number) {
    return Math.floor(Math.random() * (max - min) + min);
  }
/*
  useEffect(() => {
    fetch(, {
      method: "GET",
    })
      .then((response) => response.json())
      .then((d) => setData(d))
      .catch(function (error) {
        console.log(error);
      });
  }, []);
*/
  
  useEffect(() => {

    const fetchSeries = async () => {

        try {
            const response = await fetch(`https://api.tvmaze.com/shows?page=${getRandomArbitrary(0, 50)}`,{    
                method: 'GET',    
            })
            if (!response.ok) throw Error('Did not recived expeted data');
            const seriesData = await response.json();
            setData(seriesData);
            setfetchError(null);

            

        } catch (error: any) {            
            setfetchError(error.message);
            console.log(fetchError);
            console.log(typeof fetchError);
        }
    
    
    };

    fetchSeries();  

  }, []);


  useEffect(() => {
    pickRandomMovies();
  }, [randomButtonClicked]);


  function pickRandomMovies() {
    for (let i = 0; i < 5; i++) {
      if (data) {
        pickedData[i] = data[getRandomArbitrary(0, data.length)];
      }
    }
  }

  pickRandomMovies();

  console.log(data);
  console.log(pickedData);

  if (pickedData !== undefined) {
      return (
          <div className={styles.randomListWrapper}>
              <div className={styles.randomListTittle}>
                <h2 className={styles.randomListTittle__text}>Random Series</h2>
              </div>
            <div className={styles.cardListWrapper}>
                <div className={styles.cardList__container}>
                {pickedData &&
                    pickedData.map((item: Series, index: number) => (
                    <div className={styles.card} key={index}>
                        <div className={styles.card__poster} key={item.id}>
                        <img
                            className={styles.card__poster_img}
                            src={
                            item.image !== null
                                ? item.image.medium
                                : "http://placehold.jp/210x295.png"
                            }
                            alt="poster"
                            loading="lazy"
                        />
                        </div>

                        <div
                        className={[styles.card__rating, styles.cardText].join(" ")}
                        key={item.rating.average}
                        >
                        <svg
                            className={styles.card__rating__star}
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                            fill="currentColor"
                            role="presentation"
                        >
                            <path d="M12 20.1l5.82 3.682c1.066.675 2.37-.322 2.09-1.584l-1.543-6.926 5.146-4.667c.94-.85.435-2.465-.799-2.567l-6.773-.602L13.29.89a1.38 1.38 0 0 0-2.581 0l-2.65 6.53-6.774.602C.052 8.126-.453 9.74.486 10.59l5.147 4.666-1.542 6.926c-.28 1.262 1.023 2.26 2.09 1.585L12 20.099z"></path>
                        </svg>
                        <p>
                            {item.rating.average === null ? "NA" : item.rating.average}
                        </p>
                        </div>

                        <div
                        className={[styles.card__name, styles.cardText].join(" ")}
                        key={item.name}
                        >
                        <ButtonComponent SeriesId={item.id} tittle={item.name} />
                        </div>

                        <div className={[styles.card__info, styles.cardText].join(" ")}>
                        <svg
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                            fill="currentColor"
                            role="presentation"
                        >
                            <path fill="none" d="M0 0h24v24H0V0z"></path>
                            <path d="M11 7h2v2h-2zm0 4h2v6h-2zm1-9C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z"></path>
                        </svg>
                        </div>
                    </div>
                    ))}
              </div>
                <div className={styles.cardButtonConatiner}>
                  <div className={styles.cardButtonConatiner__button} onClick={() => setRandomButtonClicked(randomButtonClicked === false ? true : false)}>More random series</div>                    
                </div>
              </div>
            </div>
    );
  } else {
    return <Loading />;
  }
}

// <a href='#' onClick={() => setId(item.id)}>{item.name}</a>
//<button onClick={() => changeId(item.id)}>{item.name}</button>

export default React.memo(SeriesList);
