import { useQuery } from "react-query";
import { allMovies, moviePhoto } from "../API/api";
import styled from "styled-components";
import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useMotionValue } from "framer-motion";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useClickAway } from 'react-use';


const Wrapper = styled(motion.div)`
  background-color: black;
  color:white;
  overflow-x: hidden; //자식은 이렇게 하면 잘려서 드래그도 잘린만큼 되는데 부모한테하면 자식이 직접 잘린건 아니여서 드래그 가능
`;

const Loader = styled.div`
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const RepMovie = styled.div`
  background-image: linear-gradient(180deg,rgba(0,0,0,0),rgba(0,0,0,1)),
  url(${props => props.bgPhoto});
  height: 100vh;
  background-size: cover;
  display: flex;
  flex-direction: column;
  justify-content: center;
  span:first-child{
    font-weight: 600;
    font-size: 68px;
    margin-bottom: 20px;
  };
  span:last-child{
    font-size: 20px;
    width: 50%;
  }
`;

const Container = styled.div`
  margin-top: -100px;
`;

const MoviesContainer = styled(motion.div)`
  display: grid;
  grid-template-columns: repeat(6,1fr);
  gap: 10px;
  div:last-child{
    transform-origin: right center;
  };
  div:first-child{
    transform-origin: left center;
  };
`;

const Movie = styled(motion.div)`
  height: 300px;
  background-image: url(${props => props.bgPhoto});
  background-size: cover;
  background-position: center center;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  text-align: center;
  cursor: pointer;
`;

const Title = styled(motion.div)`
  opacity: 0;
  background-color: gray;
  font-weight: 300;
  font-size: 18px;
`;

const MovieDetail = styled(motion.div)`
  width: 500px;
  display: flex;
  flex-direction: column;
  background-color: black;
  position: relative;
  svg{
    position: absolute;
    top: 0;
    right: 0;
    cursor: pointer;
    fill: whitesmoke;
    width: 30px;
    height: 30px;
  }
`;

const MovieDetailPhoto = styled.div`
  height: 300px;
  background-image: url(${props => props.bgPhoto});
  background-size: cover;
  background-position: center center;
`;

const MovieDetailInfo = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
`;

const OverLay = styled(motion.div)`
  background-color: rgba(0,0,0,0.7);
  position: fixed; //absolute와 다르게 스크로를 내려도 화면에 유지된다.
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const NewContainer = styled(motion.div)`
  margin-top: -100px;
  display: grid;
  grid-auto-columns: 200px;
  grid-auto-flow: column;
  gap: 10px;
  div{
    transform-origin: left center !important;
  }
`;

const movieVar = {
  hover: {
    scale: 1.5,
    zIndex: 99,
    y: -80,
    transition: { ease: 'linear', type: 'spring', delay: 0.3, }
  }
};

const newMovieVar = {
  drag: (custom) => {
    const [index, xIndex] = custom;
    if (index === xIndex) {
      return {
        scale: 1.2,
        zIndex: 99,

      }
    }
  }
}

const titleVar = {
  hover: {
    opacity: 1,
    transition: { ease: 'linear', delay: 0.3, }
  }
}

function findIndex(x) {
  return -Math.round(x / 210);
}

export default function Home() {
  const { data, isLoading, } = useQuery('AllMoive', allMovies);
  const movies = data?.results || [];
  const [index, setIndex] = useState(0);

  const { movieId } = useParams();
  const foundMovie = movies?.find(movie => movie.id === Number(movieId));
  const navigate = useNavigate();

  const containerRef = useRef();
  const [width, setWidth] = useState('');
  const x = useMotionValue(0);
  const [xIndex, setXIndex] = useState(0);
  const [clickIdx,setClickIdx] = useState(0);

  useEffect(() => {
    x.on('change', () => {
      const index = findIndex(x.get());
      setXIndex(index);
      setClickIdx(index);
    })
  }, []);

  useEffect(() => {
    if (containerRef.current) {
      setWidth(containerRef.current.scrollWidth);
    };
  })

  const handleDragTransitionEnd = () => {
    const span = findIndex(x.get());
    x.set(210 * -span);
    const movie = movies.slice(1).find((movie, index) => index === span);
    navigate(`/movie/${movie.id}`);
  };

  const [isDragging, setIsDragging] = useState(false);

  const handleMouseDown = () => {
    setIsDragging(false);
  };

  const handleMouseMove = (e) => {
    if (e.buttons === 1) { // 마우스 왼쪽 버튼이 눌려있을 때
      setIsDragging(true);
    }
  };

  const handleClick = (e) => {
    if (!isDragging) {
      const clientX = e.clientX;
      const currentX = xIndex + Math.floor(clientX / 210);
      const movie = movies.slice(1).find((movie, index) => index === currentX);
      navigate(`/movie/${movie.id}`);
      setClickIdx(currentX);
    }
  };

  return (
    <Wrapper>
      {isLoading ? <Loader>is Loading...</Loader> :
        <>
          <RepMovie
            bgPhoto={moviePhoto(movies?.[0].backdrop_path)}
          >
            <span>{movies?.[0].title}</span>
            <span>{movies?.[0].overview}</span>
          </RepMovie>
          <NewContainer
            ref={containerRef}
            drag='x'
            style={{ x }}
            dragConstraints={{ left: -(width - 200), right: 0 }}
            dragElastic={0.2}
            dragTransition={{ bounceStiffness: 600, bounceDamping: 20 }}
            onDragTransitionEnd={handleDragTransitionEnd}
          >
            {movies.slice(1).map((movie, index) =>
              <Movie
                key={movie.id}
                bgPhoto={moviePhoto(movie.poster_path)}
                custom={[index, clickIdx]}
                variants={newMovieVar}
                animate='drag'
                layoutId={movie.id}
                onMouseDown={handleMouseDown}
                onMouseMove={handleMouseMove}
                onClick={handleClick}
              />

            )}
          </NewContainer>
          <AnimatePresence>
            {foundMovie ?
              <OverLay
                key={foundMovie.id}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => navigate('/')}
              >
                <MovieDetail layoutId={foundMovie.id} onClick={(e) => e.stopPropagation()}>
                  <MovieDetailPhoto bgPhoto={moviePhoto(foundMovie.backdrop_path)} />
                  <MovieDetailInfo>
                    <span>Title: {foundMovie.title}</span>
                    <span>Open: {foundMovie.release_date}</span>
                    <span>{foundMovie.overview}</span>
                  </MovieDetailInfo>
                  <Link to={'/'}>
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="size-5" >
                      <path fillRule="evenodd" d="M10 18a8 8 0 1 0 0-16 8 8 0 0 0 0 16ZM8.28 7.22a.75.75 0 0 0-1.06 1.06L8.94 10l-1.72 1.72a.75.75 0 1 0 1.06 1.06L10 11.06l1.72 1.72a.75.75 0 1 0 1.06-1.06L11.06 10l1.72-1.72a.75.75 0 0 0-1.06-1.06L10 8.94 8.28 7.22Z" clipRule="evenodd" />
                    </svg>
                  </Link>
                </MovieDetail>
              </OverLay>
              : null}
          </AnimatePresence>
        </>
      }
    </Wrapper>
  );
}