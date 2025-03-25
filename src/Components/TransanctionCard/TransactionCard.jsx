import {IoMdCloseCircleOutline} from "react-icons/io";
import {MdOutlineModeEdit}  from "react-icons/md";
import {PiPizza, PiGift} from "react-icons/pi";
import {BsSuitcase2} from "react-icons/bs";
import { MdMedicalServices} from "react-icons/md"

 
import styles from "./TransactionCard.module.css";

export default function TransactionCard({details,handleEdit,handleDelete}){

return (
    <div className={styles.transaction_card}>
        <div className={styles.cardInner}>
            <div className={styles.cardIcon}>
                {details.category === 'food' && <PiPizza />}
                {details.category === 'entertainment' && <PiGift />}
                {details.category === 'travel' && <BsSuitcase2 />}
                {details.category === 'medical' && <MdMedicalServices />}
                
            </div>
            <div className={styles.cardInfo}>
                <h5>{details.title}</h5>
                <p>{details.date}</p>
            </div>
        </div>

        <div className={styles.cardInner}>
            <p className={styles.cardPrice}>{`${details.price}`}</p>
            <div className={styles.cardButtonWrapper}>
                <button className={styles.cardDelete} onClick={handleDelete}>
                    <IoMdCloseCircleOutline />
                </button>
                <button className={styles.cardEdit} onClick={handleEdit}>
                    <MdOutlineModeEdit />
                </button>
            </div>
        </div>

    </div>
)
}
