import './movielist.css';
import { useNavigate } from 'react-router-dom';

function movielist({id,poster , title , lang,genre,duration}){
     const navigate = useNavigate();

  const handleBookNow = () => {
    navigate(`/movie/${id}`, {
      state: {
        movie: {
          id,
          poster,
          title,
          lang,
          genre,
          duration,
          releaseDate: '2023-01-0',
          time: '2h 15m',
          description: 'Sample movie description...',
          cast: [
            { name: 'Actor 1', image: '/assets/actor1.png' },
            { name: 'Actor 2', image: '/assets/actor2.png' }
          ],
          reviews: ['Fantastic!', 'Must watch!']
        }
      }
    });
  };
    
    return(
        <div className='block'>
            <img src={poster} className='poster'/>
            <div className='info'>
                <p className='title'><b>{title}</b></p>
                <p className='details'>{lang} | {genre} | {duration}</p>
                <button className='bookbtn' onClick={handleBookNow}><b>BOOK NOW</b></button>
            </div>
        </div>
    );
}

export default movielist;