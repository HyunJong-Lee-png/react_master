import { BrowserRouter, Route, Routes } from "react-router-dom";
import { useRecoilValue } from "recoil";
import { ThemeProvider, createGlobalStyle } from "styled-components"
import { isDarkAtom } from "./atom";
import { darkTheme, lightTheme } from "./theme";
import Coin from './Router/Coin'
import Coins from "./Router/Coins";
import Chart from "./Router/Chart";
import Price from "./Router/Price";
import ToDoList from "./ToDo/ToDoList";
import ToDo from "./ToDo/ToDo";
import TimeTrans from "./KanBan/timeTrans";
import KanbanList from "./KanBan/KanbanList";
import Motion1 from "./Animation/motion1";
import Motion2 from "./Animation/motion2";
import Home from "./NetFlix/Router/home";
import Tv from "./NetFlix/Router/tv";
import Header from "./NetFlix/Components/header";

const GlobalStyle = createGlobalStyle`
html, body, div, span, applet, object, iframe,
h1, h2, h3, h4, h5, h6, p, blockquote, pre,
a, abbr, acronym, address, big, cite, code,
del, dfn, em, img, ins, kbd, q, s, samp,
small, strike, strong, sub, sup, tt, var,
b, u, i, center,
dl, dt, dd, menu, ol, ul, li,
fieldset, form, label, legend,
table, caption, tbody, tfoot, thead, tr, th, td,
article, aside, canvas, details, embed,
figure, figcaption, footer, header, hgroup,
main, menu, nav, output, ruby, section, summary,
time, mark, audio, video {
  margin: 0;
  padding: 0;
  border: 0;
  font-size: 100%;
  font: inherit;
  vertical-align: baseline;
}
/* HTML5 display-role reset for older browsers */
article, aside, details, figcaption, figure,
footer, header, hgroup, main, menu, nav, section {
  display: block;
}
/* HTML5 hidden-attribute fix for newer browsers */
*[hidden] {
    display: none;
}
body {
  line-height: 1;
}
menu, ol, ul {
  list-style: none;
}
blockquote, q {
  quotes: none;
}
blockquote:before, blockquote:after,
q:before, q:after {
  content: '';
  content: none;
}
table {
  border-collapse: collapse;
  border-spacing: 0;
}
* {
  box-sizing: border-box;
}
body {
  font-weight: 300;
  font-family: 'Source Sans Pro', sans-serif;
  color:black;
  line-height: 1.2;
}
a {
  text-decoration:none;
  color:inherit;
}
`;

function App() {
  const isDark = useRecoilValue(isDarkAtom);
  return (
    //비트코인
    // <ThemeProvider theme={isDark ? darkTheme : lightTheme} > 
    //   <GlobalStyle />
    //   <BrowserRouter>
    //     <Routes>
    //       <Route path="/" element={<Coins />} />
    //       <Route path="/:coinId" element={<Coin/>}>
    //         <Route path="chart" element={<Chart />} />
    //         <Route path="price" element={<Price />} />
    //       </Route>
    //     </Routes>
    //   </BrowserRouter>
    // </ThemeProvider>

    //투두리스트
    // <>
    //   <GlobalStyle />
    //   {/* <ToDoList /> */}
    //   <ToDo/>
    // </>

    //시간변환기
    // <>
    //   <TimeTrans/>
    // </>

    //간판(드래그앤드롭)
    // <>
    // <GlobalStyle/>
    // <KanbanList/>
    // </>

    //애니메이션(framer-motion)
    // <>
    // <GlobalStyle/>
    // <Motion2/>
    // </>

    //넷플릭스(all)
    <ThemeProvider theme={isDark ? darkTheme : lightTheme}>
      <GlobalStyle />
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/movie/:movieId" element={<Home />} />
          <Route path="/tv" element={<Tv />} />
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  )
}

export default App
