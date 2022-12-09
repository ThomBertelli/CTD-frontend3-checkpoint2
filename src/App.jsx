
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Home from "./Routes/Home";
import Contact from "./Routes/Login";
import { Layout } from "./Components/Layout";
import { ThemeProvider } from "./hooks/useTheme";
import { AuthProvider } from "./hooks/useAuth"

function App() {







  const appRouter = createBrowserRouter([
    {

      path: '',
      element: <Layout />,
      children: [
        {
          path: '/home',
          element: <Home />
        },
        {
          path: '/login',
          element: <Contact />
        }

      ]

    }
  ])




  return (

    <AuthProvider>

      <ThemeProvider>
        <RouterProvider router={appRouter} />
      </ThemeProvider>

    </AuthProvider>

  )

}

export default App;
