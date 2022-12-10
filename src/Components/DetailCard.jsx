import { useEffect } from "react";
import ScheduleFormModal from "./ScheduleFormModal";
import styles from "./DetailCard.module.css";
import { useState } from "react";
import { useParams } from "react-router-dom";

import {useTheme} from "../hooks/useTheme"

const DetailCard = () => {

  const {theme} = useTheme()
  
  const {matricula} = useParams()

  const [dentist, setDentist] = useState([])

  useEffect(() => {

    const url = `http://dhodonto.ctdprojetos.com.br/dentista?matricula=${matricula}`;
    

    fetch(url)

      .then (async response => {
        if(!response.ok){
          const text = await response.text();
          throw new Error(text);
        }else{
          return response.json()
        }
      })
      .then(data => {
        
        setDentist(data)
        
      })
      .catch(Error)
    
  }, []);






  return (
    //As instruções que estão com {''} precisam ser 
    //substituídas com as informações que vem da api
    <>
      <h1>Detail about Dentist {dentist.nome} </h1>
      <section className="card col-sm-12 col-lg-6 container">
        {/* //Na linha seguinte deverá ser feito um teste se a aplicação
        // está em dark mode e deverá utilizar o css correto */}
        <div
          className={` ${theme === 'dark' ? styles.cardDark: ''} card-body row `}
        >
          <div className="col-sm-12 col-lg-6">
            <img
              className="card-img-top"
              src="/images/doctor.jpg"
              alt="doctor placeholder"
            />
          </div>
          <div className="col-sm-12 col-lg-6">
            <ul className="list-group">
              <li className="list-group-item">Nome: {dentist.nome}</li>
              <li className="list-group-item">
                Sobrenome: {dentist.sobrenome}
              </li>
              <li className="list-group-item">
                Username: {dentist.usuario && dentist.usuario.username}
              </li>
            </ul>
            <div className="text-center">
              {/* //Na linha seguinte deverá ser feito um teste se a aplicação
              // está em dark mode e deverá utilizado o css correto */}
              <button
                data-bs-toggle="modal"
                data-bs-target="#exampleModal"
                className={`btn btn-${theme} ${styles.button
                  }`}
              >
                Marcar consulta
              </button>
            </div>
          </div>
        </div>
      </section>
      <ScheduleFormModal />
    </>
  );
};

export default DetailCard;
