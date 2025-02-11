import { motion, useAnimation, useScroll, useTransform } from "framer-motion";
import { useEffect, useState } from "react";
import { Link, useMatch } from "react-router-dom";
import styled from "styled-components";

const Wrapper = styled(motion.div)`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  position: fixed;
  padding: 15px 55px;
  background-color: black;
`;

const Column = styled.div`
  display: flex;
`;

const Logo = styled.svg`
  width: 93px;
  height: 23px;
  margin-right: 50px;
  stroke: white;
  stroke-width: 6px;
  path{
    fill: red;
  }
`;

const Nav = styled.div`
  display: flex;
  a{
    margin-right: 20px;
    color: white;
    transition: color 0.3s ease-in-out;
    position: relative;
    font-size: 15px;
    &:hover{
      color:#FF8C9E;
    }  
  }
`;

const Search = styled.div`
  display: flex;
  align-items: center;
  svg{
    height: 25px;
    cursor: pointer;
  }
`;

const Circle = styled(motion.div)`

  height: 5px;
  background-color: rgb(255, 0, 0);
  border-radius: 50%;
  position: absolute;
  bottom: -5px;
  left: 0;
  right: 0;
  margin: 0 auto;
`;

const Input = styled(motion.input)`
  transform-origin: right center;
  background-color: transparent;
  padding-left: 30px;
`;

const logoVar = {
  start: {
    pathLength: 0,
    fillOpacity: 1
  },
  hover: {
    pathLength: 1,
    fillOpacity: [0, 1, 0],
    transition: {
      pathLength: {
        duration: 5,
      },
      fillOpacity: {
        repeat: 'infinity'
      }
    }
  }
};

const searchVar = {
  start: {
    x: 210,
  },
  click: (custom) => ({
    x: custom ? 30 : 210,
    transition: {
      ease: 'linear'
    }
  }),
};

const inputVar = {
  start: {
    scaleX: 0,
  },
  click: (custom) => ({
    scaleX: custom ? 1 : 0,
    transition: {
      ease: 'linear'
    }
  })
}

export default function Header() {
  const [click, setClick] = useState(false);
  const homeMatch = useMatch('/');
  const tvMatch = useMatch('/tv')
  const idMatch = useMatch('/movie/:movieId')
  const headerAnimation = useAnimation();
  const { scrollY } = useScroll();

  useEffect(() => {
    scrollY.on('change', () => {
      if (scrollY.get() > 80) {
        headerAnimation.start({
          backgroundColor: 'rgba(0,0,0,1)',
        })
      } else {
        headerAnimation.start({
          backgroundColor: 'rgba(0,0,0,0)',
        })
      }
    })
  }, [])

  return (
    <Wrapper
      initial={{ backgroundColor: 'rgba(0,0,0,0)' }}
      animate={headerAnimation}
    >
      <Column>
        <Logo
          xmlns="http://www.w3.org/2000/svg"
          width="1024"
          height="276.742"
          viewBox="0 0 1024 276.742"
        >
          <motion.path
            variants={logoVar}
            initial={'start'}
            whileHover={'hover'}
            d="M140.803 258.904c-15.404 2.705-31.079 3.516-47.294 5.676l-49.458-144.856v151.073c-15.404 1.621-29.457 3.783-44.051 5.945v-276.742h41.08l56.212 157.021v-157.021h43.511v258.904zm85.131-157.558c16.757 0 42.431-.811 57.835-.811v43.24c-19.189 0-41.619 0-57.835.811v64.322c25.405-1.621 50.809-3.785 76.482-4.596v41.617l-119.724 9.461v-255.39h119.724v43.241h-76.482v58.105zm237.284-58.104h-44.862v198.908c-14.594 0-29.188 0-43.239.539v-199.447h-44.862v-43.242h132.965l-.002 43.242zm70.266 55.132h59.187v43.24h-59.187v98.104h-42.433v-239.718h120.808v43.241h-78.375v55.133zm148.641 103.507c24.594.539 49.456 2.434 73.51 3.783v42.701c-38.646-2.434-77.293-4.863-116.75-5.676v-242.689h43.24v201.881zm109.994 49.457c13.783.812 28.377 1.623 42.43 3.242v-254.58h-42.43v251.338zm231.881-251.338l-54.863 131.615 54.863 145.127c-16.217-2.162-32.432-5.135-48.648-7.838l-31.078-79.994-31.617 73.51c-15.678-2.705-30.812-3.516-46.484-5.678l55.672-126.75-50.269-129.992h46.482l28.377 72.699 30.27-72.699h47.295z" />
        </Logo>
        <Nav>
          <Link to='/'>Home{(homeMatch || idMatch) && <Circle layoutId="circle" />}</Link>
          <Link to={'/tv'}>Tv Shows{tvMatch && <Circle layoutId="circle" />}</Link>
        </Nav>
      </Column>
      <Column>
        <Search>
          <motion.svg
            variants={searchVar}
            custom={click}
            initial='start'
            animate='click'
            onClick={() => setClick(!click)}
            fill="white"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fillRule="evenodd"
              d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
              clipRule="evenodd"
            ></path>
          </motion.svg>
          <Input
            placeholder="Search for movie or tv show..."
            custom={click}
            variants={inputVar}
            initial='start'
            animate='click'
          />
        </Search>
      </Column>
    </Wrapper>
  );
}