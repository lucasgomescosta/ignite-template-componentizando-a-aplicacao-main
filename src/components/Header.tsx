import  { GenreResponseProps } from './SideBar'
import { useEffect, useState } from 'react';
import { api } from '../services/api';
interface HeaderProps {
    selectedGenreId:number;
  }

  export function Header(props:HeaderProps){
    const [selectedGenre, setSelectedGenre] = useState<GenreResponseProps>({} as GenreResponseProps);
    useEffect(() => {
   
        api.get<GenreResponseProps>(`genres/${props.selectedGenreId}`).then(response => {
          setSelectedGenre(response.data);
        })
      }, [props.selectedGenreId]);
      return(
        <header>
        <span className="category">Categoria:<span> 
          {selectedGenre.title}</span></span>
      </header>
      )
  }