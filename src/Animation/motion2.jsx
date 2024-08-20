import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import styled from "styled-components";

const Wrapper = styled(motion.div)`
  height: 100vh;
  width: 100vw;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: rgb(0,0,0);
`;

const Box = styled(motion.div)`
  width: 50vw;
 display: grid;
 grid-template-columns: repeat(3,1fr);
 gap: 20px;
  &>div:nth-child(2),&>div:nth-child(3){
    grid-column: span 2;
  }
`;

const SmallBox = styled(motion.div)`
  height: 200px;
  border-radius: 15px;
  background-color: white;
`;

const OverLay = styled(motion.div)`
  position: absolute;
  width: 100%;
  height: 100%;
  background-color: rgba(0,0,0,0.7);
  display: flex;
  justify-content: center;
  align-items: center;
`;
function Motion2() {
  const [id, setId] = useState('');
  const handleClick = (id) => {
    setId(id);
  }
  return (
    <Wrapper >
      <Box>
        {['one', 'two', 'three', 'four'].map(id =>
          <SmallBox key={id} layoutId={id} onClick={() => handleClick(id)}>{id}ㅎㅇ</SmallBox>
        )}
      </Box>
      <AnimatePresence>
        {id ?
          <OverLay onClick={() => handleClick('')} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <SmallBox layoutId={id} style={{ width: 400, height: 200 }}>{id}ㅎㅇ</SmallBox>
          </OverLay>
          : null}
      </AnimatePresence>F
    </Wrapper>
  );
}
export default Motion2;
