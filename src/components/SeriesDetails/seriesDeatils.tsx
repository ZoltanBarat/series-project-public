import { useEffect, useState } from "react";
import { MovieId, Series } from "../App";
import "./seriesDeatils.css";



const SeriesDetails = (props: MovieId) => {

 
  const [series, setSeries] = useState<Series>();
  const [fetchError, setfetchError] = useState<string | null>(null);


  useEffect(() => {

    const fetchSeries = async () => {
      try {
        const response = await fetch(
          `https://api.tvmaze.com/shows/${props.movieId}`,
          {
            method: "GET",
          }
        );
        if (!response.ok) throw Error("Did not recived expeted data");
        const seriesData = await response.json();
        setSeries(seriesData);
        setfetchError(null);
      } catch (error: any) {
        setfetchError(error.message);

        console.log(error);
      }
    };

    fetchSeries();
  }, [props.movieId]);

  
  if (series !== undefined) {
    return (
      <div className="showDetailsWrapper">
        <div className="showDetails" id="details">
          <div className="showDetails__head">
            <div className="showDetails__head__tittle">
              <h1>{series.name}</h1>
              <div className="showDetails__head__tittle__additionals">
                <p>Language: {series.language}</p>
                <p>Premiered: {series.premiered}</p>
              </div>
            </div>
            <div className="showDetails__head__rateAndLinks">
              <div className="showDetails__head__rateAndLinks__container">
                <div className="showDetails__head__rateAndLinks__container__link">
                  <a
                    href={`https://www.imdb.com/title/${series.externals.imdb}`}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    IMDb
                  </a>
                </div>
                <div className="showDetails__head__rateAndLinks__container__rates">
                  <svg
                    className="showDetails__head__rateAndLinks__star"
                    width="48"
                    height="48"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                    role="presentation"
                  >
                    <path d="M12 17.27l4.15 2.51c.76.46 1.69-.22 1.49-1.08l-1.1-4.72 3.67-3.18c.67-.58.31-1.68-.57-1.75l-4.83-.41-1.89-4.46c-.34-.81-1.5-.81-1.84 0L9.19 8.63l-4.83.41c-.88.07-1.24 1.17-.57 1.75l3.67 3.18-1.1 4.72c-.2.86.73 1.54 1.49 1.08l4.15-2.5z"></path>
                  </svg>
                  <span>
                    {series.rating.average
                      ? series.rating.average  
                      : "NA"}
                  </span>
                  <span className="showDetails__head__rateAndLinks__container__rates__rateSecondaryText">
                    /10
                  </span>
                </div>
              </div>
            </div>
          </div>
          <div className="showDetails__details">
            <div className="showDetails__details__poster">
              <img
                src={series.image !== null ? series.image.original : ""}
                className="showDetails__details__poster__img"
                alt="poster"
                loading="lazy"
              />
            </div>

            <div className="showDetails__details__specifics">
              <div className="showDetails__detailsList">
                {series.genres.map((genre: string) => (
                  <span
                    key={genre}
                    className="showDetails__details__specifics__genre"
                  >
                    {genre}
                  </span>
                ))}
              </div>
              <div className="showDetails__detailsList showDetails__headings --bottomBorder">
                <h4>Channel: </h4>
                {console.log(series)}
                <p>{series.network !== null ? series.network.name : ""}</p>
              </div>
              <div className="showDetails__detailsList showDetails__headings --bottomBorder">
                <h4>Type: </h4>
                <p>{series.type ? series.type : "NA"}</p>
              </div>
              <div className="showDetails__detailsList showDetails__headings --bottomBorder">
                <h4>Status: </h4>
                <p>{series.status ? series.status : "Unknow"}</p>
              </div>
              <div
                className={`showDetails__detailsList showDetails__detailsList__description ${
                  series.officialSite ? "--bottomBorder" : ""
                }`}
              >
                <p>{ series.summary === null ? 'No description' : series.summary.replace(/(<([^>]+)>)/gi, "")}</p>
              </div>

              {series.officialSite ? (
                <div className="showDetails__detailsList showDetails__details__specifics__officalSite">
                  <a
                    href={series.officialSite}
                    className=""
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Offical Site
                  </a>
                </div>
              ) : null}
            </div>
            <div className="showDetails__details__buttonContainer">
              <div className="showDetails__details__buttonContainer__addButton showDetailsBtn">
                ADD
              </div>
              <div className="showDetails__details__buttonContainer__episodeButton showDetailsBtn">
                EPISODES
              </div>
            </div>      

          </div>
        </div>
      </div>
    );
  } else {
    return (
      <div className="showDetailsWrapper">
        <div className="showDetails">
          <p>{fetchError}</p>
        </div>
      </div>
    );
  }
};

export default SeriesDetails;
