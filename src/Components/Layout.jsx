import { Outlet, useNavigate } from "react-router-dom"
import Footer from "./Footer"
import Navbar from "./Navbar"
import { useTheme } from "../hooks/useTheme"
import { useEffect } from "react"
import {useAuth} from "../hooks/useAuth"



const Layout = () =>{

    const { theme } = useTheme();
    const navigate = useNavigate()
    const {token} = useAuth()
    
    const isLogged = () => {

        if(token == null || token === '' || token === ' ' || token === 'null'){
            navigate('/login')
            
        }
        else {
          navigate('/home') 
        }
    }

    useEffect(() =>{
      isLogged()
    },[token])

    return(
        
        <div className={`app ${theme}`}>
          <Navbar/>
          <main>
            <Outlet/>
          </main>
          <Footer/>
        </div>
      
    )
}

export {Layout}