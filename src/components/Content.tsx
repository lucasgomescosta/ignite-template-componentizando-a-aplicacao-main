import { MovieCard } from './MovieCard';
import { useEffect, useState } from 'react';
import { api } from '../services/api';
import  { GenreResponseProps } from './SideBar'
import {Header} from './Header';


import '../styles/content.scss';
interface MovieProps {
  imdbID: string;
  Title: string;
  Poster: string;
  Ratings: Array<{
    Source: string;
    Value: string;
  }>;
  Runtime: string;
}
interface ContentProps {
  selectedGenreId:number;
}

export function Content(props: ContentProps) {
  // Complete aqui

  const [movies, setMovies] = useState<MovieProps[]>([]);
  const [selectedGenre, setSelectedGenre] = useState<GenreResponseProps>({} as GenreResponseProps);

  useEffect(() => {
    api.get<MovieProps[]>(`movies/?Genre_id=${props.selectedGenreId}`).then(response => {
      setMovies(response.data);
    });

    api.get<GenreResponseProps>(`genres/${props.selectedGenreId}`).then(response => {
      setSelectedGenre(response.data);
    })
  }, [props.selectedGenreId]);
  
  return(
    <div className="container">
        <Header
        selectedGenreId={props.selectedGenreId}
      />

        <main>
          <div className="movies-list">
            {movies.map(movie => (
              <MovieCard 
              key ={movie.imdbID} 
              title={movie.Title} 
              poster={movie.Poster} 
              runtime={movie.Runtime} 
              rating={movie.Ratings[0].Value} />
            ))}
          </div>
        </main>
      </div>
  )
}