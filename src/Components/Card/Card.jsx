import styles from './Card.module.css';
import Button from "../Button/Button";


export default function Card({title,money,buttonType, buttonText, handleClick}){


    return (<div className={styles.card}>
        
    <h3 className={styles.card-title}>{title} : {money}</h3>

    <Button handleClick={handleClick} style={buttonType}>{buttonText} </Button> 

    </div>);
}