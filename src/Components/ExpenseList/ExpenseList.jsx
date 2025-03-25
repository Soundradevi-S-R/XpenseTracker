import TransactionCard from "../TransanctionCard/TransactionCard";
import styles from "./ExpenseList.module.css";
import Modal from "../Modal/Modal";
import { useEffect, useState } from "react";
import ExpensesForm from "../Form/ExpensesForm/ExpensesForm";
import Pages from "../Pagination/Pagination";

export default function ExpenseList({transactions,title,editTransactions,balance,setBalance}){


    // call back function to handle edit / delete

    console.log("expense - transaction list",transactions);

    const [editId, setEditId] = useState(0);
    const [currentTransactions, setCurrentTransactions] = useState([]);
    const [currentPage,setCurrentPage] = useState(1);
    const max_records = 3;
    const [totalPages,setTotalPages] = useState(0);
    const [isDisplayEditor,setIsDisplayEditor] = useState(false);



    const handleDelete =(id) =>{

       
        const selected_item = transactions.find(item => item.id == id); //finding tthe item in the expense list based on id

        const price = Number(selected_item.price);

        // while deleting an item, we increment the balance back with item's price
        setBalance(prev => prev + price); 

        // filter out transaction which was selected for delete operation        
        editTransactions( prev => (prev.filter(selected_item => selected_item.id != id)))     
    }
 
    const handleEdit =(id) =>{
        setEditId(id); //set editid 
        setIsDisplayEditor(true); // open editor       
    }

    useEffect(()=>{

        const startIndex = (currentPage -1) * max_records;
        const lastIndex = Math.min(currentPage*max_records,transactions.length);
        setCurrentTransactions([...transactions].slice(startIndex,lastIndex));
        setTotalPages(Math.ceil(transactions.length/max_records));
        console.log("TRANSACTIONS LENGTH",currentTransactions.length);

    },[currentPage,transactions])


    // update page if all items on current page have been deleted
    useEffect(() => {

        if(totalPages < currentPage && currentPage > 1){
            setCurrentPage(prev => prev - 1)
        }

    }, [totalPages]);



    return (
        <div className={styles.transactionsWrapper}>

            {title && <h2>{title}</h2>}    
            {
                    transactions.length > 0 ?
                   ( <div className={styles.list}>
                        <div>
                            {currentTransactions.map(transaction => (
                                <TransactionCard
                                    details={transaction}
                                    key={transaction.id}
                                    handleDelete={() => handleDelete(transaction.id)}
                                    handleEdit={() => handleEdit(transaction.id)}
                                />
                            ))}
                        </div>
                            {totalPages > 1  && <Pages updatePage={setCurrentPage} currentPage={currentPage} totalPages={totalPages}/>}
                    </div> ) 
                    : 
                    (<div className={styles.emptryTransactionsWrapper}>
                        No Transactions
                    </div>)

            } 
            
                        
            <Modal isOpen={isDisplayEditor} setIsOpen={setIsDisplayEditor}>
                <ExpensesForm
                    editId={editId}
                    expenseList={transactions}
                    setExpenseList={editTransactions}
                    setIsOpen={setIsDisplayEditor}
                    balance={balance}
                    setBalance={setBalance}
                />
            </Modal>
      
        </div>
    )
}