import { useQuery } from "react-query";
import { Link, NavLink, Outlet, useLocation, useParams } from "react-router-dom";
import styled from "styled-components";
import { getCoinInfo, getCoinTricker } from "../api";
import { Loader } from "./Coins";
import { Helmet } from "react-helmet";

const Wrapper = styled.div`
  height: 100vh;
  max-width: 480px;
  margin: 0 auto;
`;

const Header = styled.header`
  display: flex;
  justify-content: center;
  font-size: 48px;
  color:${props => props.theme.accentColor};
  position: relative;
  a{
    position: absolute;
    left: 0;
  }
`;

const CoinInfo = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 10px;
  border-radius: 15px;
  background-color: ${props => props.theme.boxColor};
  padding: 10px 15px;
`;

const InfoItem = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Description = styled.span`
  margin-top: 10px;
  display: block;
`;

const Nav = styled.div`
  margin-top: 10px;
  display: grid;
  grid-template-columns: repeat(3,1fr);
  text-align: center;
`;

const StyledNav = styled(NavLink)`
  border-radius: 15px;
  background-color: ${props => props.theme.boxColor};
  &.active{
    color:#B4E380;
  }
`;

export default function Coins() {
  const { state, } = useLocation();
  const { coinId } = useParams();
  const { data: coinInfo, isLoading: infoLoading } = useQuery('coinInfo', () => getCoinInfo(coinId));
  const { data: coinTicker, isLoading: tickerLoading } = useQuery('coinTicker', () => getCoinTricker(coinId));
  const Loading = infoLoading || tickerLoading;
  return (
    <Wrapper>
      <Helmet>
        <title>{state?.name ? state.name : Loading ? 'Loading...' : coinInfo.name}</title>
      </Helmet>
      <Header><Link to={`/`} >&larr; </Link>{state?.name ? state.name : Loading ? 'Loading...' : coinInfo.name}</Header>
      {Loading ? <Loader>Loading...</Loader>
        : <>
          <CoinInfo>
            <InfoItem>Rank:<span>{coinInfo.rank}</span></InfoItem>
            <InfoItem>Symbol:<span>${coinInfo.symbol}</span></InfoItem>
            <InfoItem>Price:<span>${coinTicker.quotes.USD.price.toFixed(3)}</span></InfoItem>
          </CoinInfo>
          <Description>{coinInfo.description}</Description>
          <CoinInfo>
            <InfoItem>TOTAL_SUPPLY:<span>{coinTicker.total_supply}</span></InfoItem>
            <InfoItem>MAX_SUPPLY:<span>{coinTicker.max_supply}</span></InfoItem>
          </CoinInfo>
          <Nav>
            <StyledNav to={`/${coinId}/chart`}>Chart</StyledNav>
            <div></div>
            <StyledNav to={`/${coinId}/price`}>Price</StyledNav>
          </Nav>
          <Outlet />
        </>}
    </Wrapper>
  );
}