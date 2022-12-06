
import { Outlet } from "react-router-dom";
import Footer from "./Components/Footer";
import Navbar from "./Components/Navbar";
import { ThemeProvider } from "./hooks/useTheme";
import {createBrowserRouter, RouterProvider} from 'react-router-dom';
import Home from "./Routes/Home";

import{useTheme} from "./hooks/useTheme"

function App() {

  const {theme} = useTheme();

  const appRouter = createBrowserRouter([
    { 
      path:'',
      element: <Home/>,
      children:[]
    
    }
  ])


  return (
    
      <>
      <div className={`app ${theme}`}>
        <Navbar />
        <main>
          <Outlet />
        </main>
        <Footer />
      </div>

{/* //Na linha seguinte deverá ser feito um teste se a aplicação
  // está em dark mode e deverá utilizar a classe dark ou light */}
      
      </>
      

      
    
    
  );
}

export default App;
