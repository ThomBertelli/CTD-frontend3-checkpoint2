import styles from "./Form.module.css";
import { useTheme } from "../hooks/useTheme";
import { useState } from "react";
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import { useAuth } from "../hooks/useAuth"




const LoginForm = () => {

  const [username, setUserName] = useState('')
  const [password, setPassword] = useState('')
  const MySwal = withReactContent(Swal)
  const { setToken } = useAuth()
  const handleSubmit = (e) => {


    //Nesse handlesubmit você deverá usar o preventDefault,
    e.preventDefault()
    //enviar os dados do formulário e enviá-los no corpo da requisição 
    //para a rota da api que faz o login /auth
    //lembre-se que essa rota vai retornar um Bearer Token e o mesmo deve ser salvo
    //no localstorage para ser usado em chamadas futuras




    const url = 'https://dhodonto.ctdprojetos.com.br/auth';
    const options = {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json;charset=UTF-8'
      },
      body: JSON.stringify({

        username: username,
        password: password

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
        setToken(data.token)
        MySwal.fire({
          icon: 'success',
          position: 'top-end',
          showConfirmButton: false,
          timer: 1500,
          width: '15rem'
        })
      })
      .catch(() => MySwal.fire({
        text: 'Usuário ou Senha incorreto(s)!',
        icon: 'error',
        position: 'top-end',
        showConfirmButton: false,
        timer: 3000,
        width: '15rem',

      }))

    //Com tudo ocorrendo corretamente, o usuário deve ser redirecionado a página principal,com react-router
    //Lembre-se de usar um alerta para dizer se foi bem sucedido ou ocorreu um erro
  };


  const { theme } = useTheme();


  return (
    <>
      {/* //Na linha seguinte deverá ser feito um teste se a aplicação
        // está em dark mode e deverá utilizar o css correto */}
      <div
        className={`text-center card container ${styles.card}`}
      >
        <div className={`card-body ${theme === 'dark' ? styles.cardDark : ''} `}>
          <form onSubmit={handleSubmit}>
            <input
              className={`form-control ${styles.inputSpacing}`}
              placeholder="Login"
              name="login"
              required title="5 to 10 characters"
              pattern=".{5,10}" 
              value={username}
              onChange={event => setUserName(event.target.value)}
            />
            <input
              className={`form-control ${styles.inputSpacing}`}
              placeholder="Password"
              name="password"
              type="password"
              required title="5 to 10 characters"
              pattern=".{5,10}"
              value={password}
              onChange={event => setPassword(event.target.value)}
            />
            <button className="btn btn-primary" type="submit">
              Send
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default LoginForm;
