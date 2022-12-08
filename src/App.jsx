
import Footer from "./Components/Footer";
import Navbar from "./Components/Navbar";
import {createBrowserRouter, RouterProvider, Outlet} from 'react-router-dom';
import Home from "./Routes/Home";

import{useTheme} from "./hooks/useTheme"
import Contact from "./Routes/Login";

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
          path:'home',
          element: <Home/>
        },
        {
          path:'login',
          element: <Contact/>
        },

      ]
  
    }
  ])


  return (

        <RouterProvider router={appRouter} />

    
  );
}

export default App;
