import { BrowserRouter, Route, Routes } from "react-router-dom";
import Header from "./components/header";
import Home from "./pages/home";
import { PlateList } from "./pages/plate/plate";




export default function App(){
  return(
    <>
      <BrowserRouter>
        <Header/>
        <Routes>
          <Route path="/" element={<Home/>}/> 
          <Route path="/plate" element={<PlateList/>}/>
        </Routes>
      </BrowserRouter> 
    </>
  )
}