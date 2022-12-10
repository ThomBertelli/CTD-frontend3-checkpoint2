import { useEffect, useState } from "react";
import styles from "./ScheduleForm.module.css";
import { useTheme } from "../hooks/useTheme"
import { useAuth } from "../hooks/useAuth"
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import {useNavigate, redirect } from "react-router-dom"

const ScheduleForm = () => {
  const { token } = useAuth()
  const { theme } = useTheme()
  const [dentists, setDentists] = useState([])
  const [patients, setPatients] = useState([])
  const MySwal = withReactContent(Swal)
  const navigate = useNavigate()

  


  useEffect(() => {
    //Nesse useEffect, você vai fazer um fetch na api buscando TODOS os dentistas
    //e pacientes e carregar os dados em 2 estados diferentes

    const urlDentists = `http://dhodonto.ctdprojetos.com.br/dentista`;


    fetch(urlDentists)

      .then(async response => {
        if (!response.ok) {
          const text = await response.text();
          throw new Error(text);
        } else {
          return response.json()
        }
      })
      .then(data => {

        setDentists(data)

      })
      .catch(Error)

    const urlPatients = `http://dhodonto.ctdprojetos.com.br/paciente`;


    fetch(urlPatients)

      .then(async response => {
        if (!response.ok) {
          const text = await response.text();
          throw new Error(text);
        } else {
          return response.json()
        }
      })
      .then(data => {

        setPatients(data.body)

      })
      .catch(Error)






  }, []);

  const handleSubmit = (event) => {
    //Nesse handlesubmit você deverá usar o preventDefault,
    //obter os dados do formulário e enviá-los no corpo da requisição 
    //para a rota da api que marca a consulta
    //lembre-se que essa rota precisa de um Bearer Token para funcionar.
    //Lembre-se de usar um alerta para dizer se foi bem sucedido ou ocorreu um erro

    event.preventDefault()

    const dentistId = event.target.dentist.value
    const patientId = event.target.patient.value
    const consultDate = event.target.appointmentDate.value
    
    

    

    const paciente = patients.filter(patient => patient.matricula === patientId? patient: null)

    const dentista = dentists.filter(dentist => dentist.matricula === dentistId ? dentist: null)

    

    const url = 'http://dhodonto.ctdprojetos.com.br/consulta';
    const options = {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token} `
      },
      body: JSON.stringify({

        paciente: paciente[0],
        dentista: dentista[0],
        dataHoraAgendamento: consultDate



      })
    };

    fetch(url, options)

      .then(async response => {
        if (!response.ok) {          
          
          const text = await response.text();
          throw new Error(text);
          
        } else {
          
          return response.json()
        }
      })

      .then(data => {
        
        MySwal.fire({
          text:'Agendamnto realizado!',
          icon: 'success',
          position: 'top-end',
          showConfirmButton: false,
          timer: 2500,
          width: '15rem'
        })

        setTimeout(()=>{window.location.reload()},2500);
      })
      .catch((error) => MySwal.fire({
        text: error,
        icon: 'error',
        position: 'top-end',
        showConfirmButton: false,
        timer: 3000,
        width: '15rem',

      }))



  };

  return (
    <>
      {/* //Na linha seguinte deverá ser feito um teste se a aplicação
        // está em dark mode e deverá utilizar o css correto */}
      <div
        className={`text-center container ${theme === 'dark' ? styles.cardDark : ''}}`
        }
      >
        <form onSubmit={handleSubmit}>
          <div className={`row ${styles.rowSpacing}`}>
            <div className="col-sm-12 col-lg-6">
              <label htmlFor="dentist" className="form-label">
                Dentist
              </label>
              <select className="form-select" name="dentist" id="dentist">
                {
                  dentists.map(dentist => {
                    return (
                      <option key={dentist.matricula} value={dentist.matricula}>
                        {`${dentist.nome} ${dentist.sobrenome}`}
                      </option>


                    )
                  })

                }

              </select>
            </div>
            <div className="col-sm-12 col-lg-6">
              <label htmlFor="patient" className="form-label">
                Patient
              </label>
              <select className="form-select" name="patient" id="patient">
                {

                  patients.map(patient => {
                    return (
                      <option key={patient.matricula} value={patient.matricula}>
                        {`${patient.nome} ${patient.sobrenome}`}
                      </option>


                    )
                  })

                }
              </select>
            </div>
          </div>
          <div className={`row ${styles.rowSpacing}`}>
            <div className="col-12">
              <label htmlFor="appointmentDate" className="form-label">
                Date
              </label>
              <input
                required
                className="form-control"
                id="appointmentDate"
                name="appointmentDate"
                type="datetime-local"
              />
            </div>
          </div>
          <div className={`row ${styles.rowSpacing}`}>
            {/* //Na linha seguinte deverá ser feito um teste se a aplicação
        // está em dark mode e deverá utilizar o css correto */}
            <button
              className={`btn btn-${theme} ${styles.button
                }`}
              type="submit"
            >
              Schedule
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default ScheduleForm;
