const BASE_PATH = `https://api.coinpaprika.com/v1`;

export async function getAllCoins(){
  const data = await(await fetch("https://api.coinpaprika.com/v1/coins")).json();
  return data.slice(0,100);
};

export async function getCoinInfo(coinId){
  return (await fetch(`${BASE_PATH}/coins/${coinId}`)).json();
};

export async function getCoinTricker(coinId){
  return (await fetch(`${BASE_PATH}/tickers/${coinId}`)).json();
}

export async function getCoinHistory(coinId){
  return (await fetch(`https://ohlcv-api.nomadcoders.workers.dev/?coinId=${coinId}`)).json();
}