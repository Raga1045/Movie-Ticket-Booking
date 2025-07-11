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
             duration:"3h 10m",
             releaseDate: '27 Jun 2025',
             description: 'Kannappa, a sceptical hunter, attains divine enlightenment through Lord Shiva, undergoing a profound transformation into his ardent disciple.',
          cast: [
            { name: 'Manchu Vishnu', image: '/assets/actor1.png' },
            { name: 'Prabhas', image: '/assets/actor2.png' }
          ],
          reviews: ['Among all the movies I’ve watched in recent times, Kannappa stands out with one of the most powerful and emotionally moving climax scenes.', 'The film is long and the first half suffers due to its slow pace']
        },
        {
             id:2,
             title:"Kubera",
             poster:kubera,
             genre:"Thriller/Crime",
             lang:"Telugu",
             duration:"3h 10m",
             releaseDate: '20 Jun 2025',
             description: 'A street beggar gets ensnared in a ₹1 lakh cr crore white-collar crime laundering scheme, intersecting with themes of corruption, class disparity, and morality.',
          cast: [
            { name: 'Dhanush', image: '/assets/actor1.png' },
            { name: 'Nagarjuna', image: '/assets/actor2.png' }
          ],
          reviews: ['“Kubera” is a masterclass in storytelling that fuses the grit of a crime thriller with the emotional depth of a character-driven drama. ', 'Hats off to the director for creating such a tight, engaging narrative. There’s never a dull moment. The twists are unpredictable, and the emotional beats hit you hard.']
        },
        {
             id:3,
             title:"Sitaare Zameen Par",
             poster:szp,
             genre:"Comedy/Drama",
             lang:"Hindi",
             duration:"2h 35m",
             releaseDate: '20 Jun 2025',
             description: 'A basketball coach serves community service by training Neurodivergent adults after a DUI. His outlook changes as he learns from his players.',
          cast: [
            { name: 'Amir Khan', image: '/assets/actor1.png' },
            { name: 'Genelia', image: '/assets/actor2.png' }
          ],
          reviews: ['Had always heard of Aamir Khan as the perfectionist, he proves this everytime he makes a movie! WHAT A GREAT MOVIE!!','Every character is wholesome. The coach has flaws and learns to overcome them eventually and in the most beautiful way poss']
        },
        {
             id:4,
             title:"Jurassic World",
             poster:jw,
             genre:"Action/Sci-f",
             lang:"English",
             duration:"2h 13m",
             releaseDate: '4 Jul 2025',
             description: 'Zora Bennett leads a team of skilled operatives to the most dangerous place on Earth, an island research facility for the original Jurassic Park. Their mission is to secure genetic material from dinosaurs whose DNA can provide life-saving benefits to mankind. ',
          cast: [
            { name: 'Scarlett Johansson', image: '/assets/actor1.png' },
            { name: 'Mahershala Ali', image: '/assets/actor2.png' }
          ],
          reviews: ['It has been roughly a decade since Colin Trevorrow\'s Jurassic World became one of my personal favorite movies of all time.', 'My little brother and I went to see this movie and we had an amazing time.   We are big fans of all the Jurassic films, and it was so much fun.']
        },
        {
             id:5,
             title:"Devara",
             poster:devara,
             genre:"Action/Thriller",
             lang:"Telugu",
             duration:"2h 58m",
             releaseDate: '27 Sep 2024',
             description: 'A village chief\'s son secretly continues his father\'s mission to end smuggling, while pretending to be weak and maintaining the illusion that his father is still alive.',
          cast: [
            { name: 'NTR', image: '/assets/actor1.png' },
            { name: 'Jahnavi Kapoor', image: '/assets/actor2.png' }
          ],
          reviews: ['Blockbuster movie excited movie thrilling movie I liked it I want to want to watch movie again', 'The dynamic duo of Hero NTR and Director Koratala Siva has delivered yet another masterpiece']
        },
        {
             id:6,
             title:"Sankrantiki Vastunnam",
             poster:sv,
             genre:"Comedy",
             lang:"Telugu",
             duration:"2h 24m",
             releaseDate: '14 Jan 2025',
             description: 'When a renowned tech entrepreneur is kidnapped upon returning to India, a police officer recruits her ex-boyfriend, a former cop now living a quiet family life, to assist in the rescue mission.',
          cast: [
            { name: 'Venkatesh', image: '/assets/actor1.png' },
            { name: 'Meenakshi Chaudary', image: '/assets/actor2.png' }
          ],
          reviews: ['Fantastic!', 'Must watch!']
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