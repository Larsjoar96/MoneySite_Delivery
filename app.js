//Work variables
const moneyEarnedPerWork = 100;
let moneyEarned = 0
const buttonElementDoWork = document.getElementById("doWork");
const buttonElementAddToBank = document.getElementById("addToBank");
//Bank variables
let bankBalance = 400;
let currentLoan = 0;
let maxLoan = 0;
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


function DoWork()
{
    moneyEarned = moneyEarned + moneyEarnedPerWork;
    spanElementMoneyEarned.innerText = moneyEarned;
}

function AddToBank()
{
    bankBalance = bankBalance + moneyEarned;
    moneyEarned = 0;
    spanElementMoneyEarned.innerText = moneyEarned;
    spanElementBankBalance.innerText = bankBalance;
}