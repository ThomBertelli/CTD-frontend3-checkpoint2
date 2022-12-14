import styles from "./Card.module.css";
import {Link} from 'react-router-dom'
import{useTheme} from "../hooks/useTheme"

const Card = (props) => {

  
  const {nome, sobrenome, matricula, usuario} = props.data

  const { theme} = useTheme()

  return (
    <>
      {/* //Na linha seguinte deverá ser feito um teste se a aplicação
        // está em dark mode e deverá utilizar o css correto */}
      <div className={`card`} data-testi="dentist-card">
        <img
          className="card-img-top"
          src="/images/doctor.jpg"
          alt="doctor placeholder"
        />
        <div className={`card-body ${styles.CardBody} ${theme === "dark"? styles.cardDark: ''}`}>
          {/* Na linha seguinte o link deverá utilizar a matricula, nome e sobrenome do dentista
          que vem da API */}
          <Link data-testid = 'card-link' to={`/dentist/${matricula}`}>


            <h5 className={`card-title ${styles.title}`}>{`${nome} ${sobrenome}`}</h5>
          </Link>
          <p>{`${usuario.username}`}</p>
        </div>
      </div>
    </>
  );
};

export default Card;
