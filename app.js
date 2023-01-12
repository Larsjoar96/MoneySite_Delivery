//Work variables
const moneyEarnedPerWork = 100;
let moneyEarned = 0
const buttonElementDoWork = document.getElementById("doWork");
const buttonElementAddToBank = document.getElementById("addToBank");
//Bank variables
let bankBalance = 400;
let currentLoan = 0;
let maxLoan = 0;
let takenLoan = false;
const interestRate = 0.1;
const spanElementCurrentLoan = document.getElementById("currentLoan");
const spanElementBankBalance = document.getElementById("bankBalance");
const buttonElementTakeLoan = document.getElementById("takeLoan");
//Computer variables
const spanElementMoneyEarned = document.getElementById("moneyEarned");
const selectElementComputerList = document.getElementById("computerList");
const buttonElementBuyComputer = document.getElementById("buyComputer");

spanElementBankBalance.innerText = bankBalance;
//Enable button functionalities
buttonElementDoWork.addEventListener('click',DoWork);
buttonElementAddToBank.addEventListener('click',AddToBank);
buttonElementTakeLoan.addEventListener('click',TakeLoan);


function DoWork()
{
    moneyEarned = moneyEarned + moneyEarnedPerWork;
    spanElementMoneyEarned.innerText = moneyEarned;
}

function AddToBank()
{
    bankBalance = bankBalance + moneyEarned - (moneyEarned*interestRate);
    currentLoan = currentLoan - (moneyEarned*interestRate)
    moneyEarned = 0;
    spanElementCurrentLoan.innerText = currentLoan;
    spanElementMoneyEarned.innerText = moneyEarned;
    spanElementBankBalance.innerText = bankBalance;
}

function TakeLoan()
{
    if(takenLoan == false)    
    {
        if(bankBalance > 0) 
        {
            let bankInput = prompt("Enter your desired loan");
            bankInput = parseInt(bankInput);
            if(bankInput>bankBalance*2)
            {
                alert("We will not loan you more than double your money!");
            }
            else if(bankInput <= 0)
            {
                alert("That is not a valid loan number!");
            }
            else //Loan successfully taken
            {
                currentLoan = bankInput;
                bankBalance = bankBalance + currentLoan;
                takenLoan = true;
                spanElementCurrentLoan.innerText = currentLoan;
                spanElementBankBalance.innerText = bankBalance;
            }
        }
        else{alert("We will not loan money to you if you do not have money!");}
    }
    else{alert("you already have a loan!");}
}