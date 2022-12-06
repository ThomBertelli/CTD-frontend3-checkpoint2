
import Footer from "./Components/Footer";
import Navbar from "./Components/Navbar";
import { ThemeProvider } from "./hooks/useTheme";
import {createBrowserRouter, RouterProvider, Outlet} from 'react-router-dom';
import Home from "./Routes/Home";

import{useTheme} from "./hooks/useTheme"

function App() {

  const {theme} = useTheme();

  const appRouter = createBrowserRouter([
    {
      path: '',
      element: <>
      <div className={`app ${theme}`}>
          <Navbar />
          <main>
            <Outlet />
          </main>
          <Footer />
        </div>
      </>,
      children: [
        {
          path:'',
          element: <Home/>
        },

      ]
  
    }
  ])


  return (

        <RouterProvider router={appRouter} />
        

        
      

      
    
    
  );
}

export default App;
