import { useQuery } from "react-query";
import styled from "styled-components";
import { getAllCoins } from "../api";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet";
import { useSetRecoilState } from "recoil";
import { isDarkAtom } from "../atom";

const Wrapper = styled.div`
  height: 100vh;
  max-width: 480px;
  margin: 0 auto;
  overflow-y: scroll;
  &::-webkit-scrollbar{
    display: none;
  }
`;
const Header = styled.div`
  font-size: 48px;
  color:${props => props.theme.accentColor};
  height: 10vh;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const CoinList = styled.ul`
  display: flex;
  flex-direction: column;
  gap: 10px;
  height: 100%;
  overflow-y: scroll;
  &::-webkit-scrollbar{
    display: none;
  }
`;

const Coin = styled.li`
  border-radius: 15px;
  background-color: ${props => props.theme.boxColor};
  a{
    display: flex;
    align-items: center;
    padding: 20px;
    transition: color 0.2s ease-in;
    gap: 10px;
  };
  a:hover{
    color:${props => props.theme.accentColor}
  }
`;

const Img = styled.img`
  width: 30px;
  object-fit: contain;
`;

const CoinName = styled.div`
  font-size: 16px;
`;

export const Loader = styled.div`
  font-size: 50px;
  height: 100%;
  display: flex;  
  align-items: center;
  justify-content: center;
`;

export default function Home() {
  const { data, isLoading } = useQuery('Coins', getAllCoins);
  const setIsDark = useSetRecoilState(isDarkAtom);
  return (
    <Wrapper>
      <Helmet>
        <title>코인</title>
      </Helmet>
      <Header><button onClick={() => setIsDark((prev) => !prev)}>라이트/다크모드</button>코인</Header>
      {isLoading ? <Loader>Loading...</Loader>
        : <CoinList>
          {data.map(coin =>
            <Coin key={coin.id}>
              <Link to={`/${coin.id}`} state={{ name: coin.name }}>
                <Img src={`https://cryptocurrencyliveprices.com/img/${coin.id}.png`} />
                <CoinName>{coin.name}&rarr;</CoinName>
              </Link>
            </Coin>)}
        </CoinList>}
    </Wrapper>
  );
}