import Header from '../Components/header';
import Navbar from '../Components/navbar';
import  MovieList from '../Components/movielist';
import kanappa from '../assets/kanappa.jpg';
import kubera from '../assets/kubera.jpeg';
import jw from '../assets/jw.jpg';
import devara from '../assets/devara.webp';
import sv from '../assets/sv.avif';
import szp from '../assets/szp.jpg';
import '../App.css';
function Home(){
    const movies=[
        {
             id:1,
             title:"Kannappa",
             poster:kanappa,
             genre:"Action",
             lang:"Telugu",
             duration:"2h 20m"
        },
        {
             id:2,
             title:"Kubera",
             poster:kubera,
             genre:"Drama",
             lang:"Telugu",
             duration:"3h 01m"
        },
        {
             id:3,
             title:"Sitaare Zameen Par",
             poster:szp,
             genre:"Comedy",
             lang:"Hindi",
             duration:"2h 12m"
        },
        {
             id:4,
             title:"Jurassic World",
             poster:jw,
             genre:"Action",
             lang:"English",
             duration:"2h 01m"
        },
        {
             id:5,
             title:"Devara",
             poster:devara,
             genre:"Action",
             lang:"Telugu",
             duration:"2h 30m"
        },
        {
             id:6,
             title:"Sankrantiki Vastunnam",
             poster:sv,
             genre:"Comedy",
             lang:"Telugu",
             duration:"2h 47m"
        }
    ];
    return(
        <div style={{backgroundColor:"#0f0f00"}}>
            <Header/>
            <Navbar/>
            <div className='moviegrid'>
      {movies.map((movie) => (
        <MovieList key={movie.id} {...movie} />
      ))}
    </div>
            
        </div>

    );
};

export default Home;