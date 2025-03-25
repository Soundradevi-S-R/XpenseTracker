import { useEffect,useState } from "react";
import styles from "./ExpensesForm.module.css"
import Button from "../../Button/Button";
import {useSnackbar} from 'notistack';




export default function ExpensesForm ({expenseList,setExpenseList,setIsOpen,setBalance,balance,editId}){

   
    const {enqueueSnackbar} = useSnackbar();

    //declaring formdata details
    const [formData, setFormData] = useState({
        title :'',
        category : '',
        price : '',
        date : '',
    });

    // call back function to handle change on the form data fields
    const handleChange =(e) =>{
        const name= e.target.name
        setFormData(prev => ({...prev , [name] : e.target.value}))   
    }

    const handleAddExpense =(e) => {

        e.preventDefault();

        //if the expense is greater than the balance money, throw warning
        if(balance < Number(formData.price)){
            enqueueSnackbar ("Price should be less than the wallet balance", {variant: "warning"})
            setIsOpen(false) ; //close the modal
            return
        }
        // for price less than the balance , we deduct the balance
        setBalance(prev => prev - Number(formData.price));

        // set the expense list data 
        const lastId= expenseList.length > 0 ? expenseList[0].id : 0
        console.log("last id " , lastId);
        setExpenseList(prev => [{...formData, id: lastId+1} , ...prev]);        

        //reset the form data
        setFormData({
            title:'',
            category:'',
            price:'',
            date:'',
        })

        setIsOpen(false); //close the modal once the formdata is mapped to expenseList

    }

    const handleEditExpense =(e) =>{
        e.preventDefault()
        const updated = expenseList.map( item =>{
            if(item.id == editId){
                const priceDiff = item.price - Number(formData.price);

                if(priceDiff <0 && Math.abs(priceDiff) > balance) // throw warning if the editted price is negative and more than wallet balance
                {
                        enqueueSnackbar("Price should not exceed the wallet balance amount" , {variant:'warning'})

                }
                setBalance(prev => prev + priceDiff);
                return {...formData, id:editId}
            }
            else{
                return item
            }
        })
        setExpenseList(updated);
        setIsOpen(false)
    }


    return (    
            <div className={styles.formWrapper}>
            <h3>Add Expenses</h3>

            <form onSubmit={editId ? handleEditExpense : handleAddExpense}>

                <input type="text" 
                       name="title" 
                       placeholder="Title" 
                       value={formData.title}
                       onChange={handleChange}required ></input>

                <input type="number" 
                        name="price" 
                        placeholder="Price" 
                        value={formData.price} 
                         onChange={handleChange}required>                          
                </input>

                <select name= "category"
                        value={formData.category}
                        onChange={handleChange} required>

                    <option value=''  > Select Category</option>
                    <option value='food'>Food</option>
                    <option value='travel'>Travel</option>
                    <option value='entertainment'>Entertainment</option>
                    <option value='medical'>Medical</option>
                   
                </select>

                <input type="date" 
                       name="date"  
                       value={formData.date}
                       onChange={handleChange} required></input>


               <Button type="submit" style="primary" shadow>Add Expense</Button>
               <Button style="secondary" 
                        handleClick={() => setIsOpen(false)}shadow >Cancel</Button>
            </form>
        
            
            </div>
    );


}