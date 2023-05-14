import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import styles from "./Detail.module.css";

const Detail = () => {
  const [loading, setLoading] = useState(true);
  const [movie, setMoive] = useState([]);
  const { id } = useParams();
  const getMovie = async () => {
    const json = await (
      await fetch(`https://yts.mx/api/v2/movie_details.json?movie_id=${id}`)
    ).json();
    setMoive(json.data.movie);
    setLoading(false);
  };

  useEffect(() => {
    getMovie();
  }, []);
  return (
    <div>
      {loading ? (
        <h1>Loading...</h1>
      ) : (
        <div className={styles.container}>
          <div className={styles.title}>
            <h1>{movie.title_long}</h1>
            <img
              className={styles.titleImg}
              src={movie.large_cover_image}
              alt={movie.title}
            />
          </div>
          <div className={styles.discript}>
            <p>Rating : {movie.rating}</p>
            <p>RunTime : {movie.runtime} minute</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default Detail;
