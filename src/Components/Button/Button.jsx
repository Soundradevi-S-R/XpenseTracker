import { Children } from 'react';
import styles from './Button.module.css';


export default function Button({children, handleClick, style, type='button'}){


    return (
    <button onClick={handleClick}
            type={type}
            className={ `${styles.button} ${styles[style]} ` } >  {children} </button>
            
    );
}

// one of the style of button is taken from local css and the  ${styles[style] is passed from dashboard to card 
// and from card to here , css part is defined locally in button css file