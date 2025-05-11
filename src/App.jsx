import Header from "./Componenets/Header";
import Main from './Componenets/Main';
import DetailPage from './Componenets/DetailPage';
import MissingPage from './Componenets/MissingPage';
import { Routes, Route } from "react-router-dom";



function App() {

  return (
    <>
      <Header />
      <Routes>
        <Route path='/' Component={Main} />
        <Route path='/country/:name' Component={DetailPage} />
        <Route path='*' element={<MissingPage />} />
      </Routes>
    </>
  )
}

export default App;
