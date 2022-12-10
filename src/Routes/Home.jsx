import { useState } from "react";
import { useEffect } from "react";
import Card from "../Components/Card";

const Home = () => {

  const [dentists, setDentists ] = useState([])

  useEffect(() => {
    //Nesse useEffect, deverá ser obtido todos os dentistas da API
    //Armazena-los em um estado para posteriormente fazer um map
    //Usando o componente <Card />

    const url = 'https://dhodonto.ctdprojetos.com.br/dentista';
    const options = {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json;charset=UTF-8'
      },
      
    };

    fetch(url, options)

      .then (async response => {
        if(!response.ok){
          const text = await response.text();
          throw new Error(text);
        }else{
          return response.json()
        }
      })
      .then(data => {
        
        setDentists(data)
        
      })
      .catch(Error)


  },[]);

  return (
    <>
      <h1>Home</h1>
      <div className="card-grid container">
        {
          dentists.map(
            dentist => {
              return(
                <Card
                  key={dentist.matricula}
                  data={dentist}
                />
              )
            }
          )



        }
      </div>
    </>
  );
};

export default Home;
