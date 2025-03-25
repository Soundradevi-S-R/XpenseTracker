import { useEffect, useState } from "react";
import AddIncomeForm from '../../Components/Form/AddIncomeForm/AddIncomeForm';
import ExpensesForm from '../../Components/Form/ExpensesForm/ExpensesForm';
import Card from "../../Components/Card/Card";
import Modal from 'react-modal';
import PieChartComponent from "../../Components/PieChart/PieChart";
import ExpenseList  from "../../Components/ExpenseList/ExpenseList";
import BarChart from "../../Components/BarChart/BarChart";


import styles from './Dashboard.module.css';


export default function Dashboard(){

//declarations part

const [balance, setBalance] = useState(0);
const [expense,setExpense] = useState(0);

const [expenseList, setExpenseList] = useState ([]);
//modals - show and hide purpose
const [isOpenBalance, setIsOpenBalance] = useState(false);
const [isOPenExpense, setIsOpenExpense] = useState(false);

//mount state
const [isMounted, setIsMounted] = useState(false);

// declare spending categories

const [expenseCategory, setExpenseCategory] = useState ({
    food: 0,
    travel : 0,
    entertainment : 0, 
    medical : 0 ,   
   
});

const [expenseCategoryCount, setExpenseCategoryCount] = useState({
    food: 0,
    entertainment: 0,
    travel: 0,   
    medical : 0 ,  
   
  });




useEffect(() => {

    //set the value of balance //
    // balance storage
    const currentBalance  = localStorage.getItem('balance');
    console.log("current balance ", currentBalance);

    if(currentBalance){
        setBalance(Number(currentBalance)); // typeccast string to number
       
    }else{
        setBalance(5000);  
        localStorage.setItem('balance', 5000);
    }
    //expense list storage
    const items = JSON.parse(localStorage.getItem('expenses'));
    console.log("expense list" , items);
    setExpenseList(items || []);

    setIsMounted(true); //after mounting flag is set true
    
},[]);


// save balance in local storage //
useEffect (() => {

    if(isMounted){
        localStorage.setItem('balance',balance);
    }
},[balance]);



// save expenselist on local storage 

useEffect(() => {
    if (expenseList.length > 0 || isMounted) {
        localStorage.setItem('expenses', JSON.stringify(expenseList));
    }
    if (expenseList.length > 0 ){
        setExpense(
            expenseList.reduce( (accumulator, currentValue) => accumulator+ Number (currentValue.price),0));
    }else{
        setExpense(0);
        }

        let foodSpends = 0,
        entertainmentSpends = 0,
        medicalSpends=0,
        travelSpends = 0;  
       
         
        

      let foodCount = 0,
        entertainmentCount = 0,
        medicalCount=0,
        travelCount = 0;
       

      
      expenseList.forEach((item) => {
        if (item.category === "food") {
          foodSpends += Number(item.price);
          foodCount++;
        } else if (item.category === "entertainment") {
          entertainmentSpends += Number(item.price);
          entertainmentCount++;
        } else if (item.category === "travel") {
          travelSpends += Number(item.price);
          travelCount++;
        }
        else if (item.category === "medical") {
            medicalSpends += Number(item.price);
            medicalCount++;
          }
         
      });
  
      setExpenseCategory({
        food: foodSpends,
        travel: travelSpends,
        entertainment: entertainmentSpends,
        medical:medicalSpends,
       
        
      });
  
      setExpenseCategoryCount({
        food: foodCount,
        travel: travelCount,
        entertainment: entertainmentCount,
        medical:medicalCount,
        

      });
},[expenseList])


    

//function return
    return(
    
    <div className={styles.container}>
        <h1 className={styles.h1}>Expense Tracker</h1> 

        <div className={styles.Dashboardcontainer} > 
                <Card 
                title="Wallet Balance"
                money={balance}
                buttonType="success"
                buttonText="+ Add Income"
                handleClick = {() =>{
                    setIsOpenBalance(true);
                }}
                />
                
                <Card 
                title="Expenses"        
                buttonType="failure"
                money={expense}
                buttonText="+ Add expense"
                success={false}
                handleClick = {() => {
                    setIsOpenExpense(true);
                }}
                />

                <PieChartComponent 
                 data={[ { name: "Food", value: expenseCategory.food },
                        { name: "Entertainment", value: expenseCategory.entertainment },
                        { name: "Travel", value: expenseCategory.travel },                       
                        { name: "medical", value: expenseCategory.medical },   
                     
                                       
                      
                     ]} 
                  
                  />
                  
        </div>   

        <div className={styles.transactionsWrapper}>
            <ExpenseList 
                     transactions= {expenseList}
                     editTransactions = {setExpenseList}
                     title = "Recent Transactions"
                     balance={balance}
                     setBalance={setBalance}  />

            <BarChart
            
            data={[
                {name: "Food", value:expenseCategory.food},
                {name: "Travel", value:expenseCategory.travel},
                {name: "Entertainment", value:expenseCategory.entertainment},                        
                {name : "Medical", value : expenseCategory.medical},
               
            ]}>


            </BarChart>
        </div>
        

        <Modal isOpen={isOpenBalance}  setIsOpen={setIsOpenBalance}>
          <AddIncomeForm setIsOpen={setIsOpenBalance} setBalance={setBalance} />
        </Modal>

        <Modal isOpen={isOPenExpense} setIsOpen={setIsOpenExpense}>
            <ExpensesForm 
            expenseList = {expenseList}
            setExpenseList={setExpenseList}
            setIsOpen={setIsOpenExpense} 
            setBalance={setBalance}
            balance = {balance} />
        </Modal>
    
    </div>
    
);


}