//Work variables
const moneyEarnedPerWork = 100;
let moneyEarned = 0
const buttonElementDoWork = document.getElementById("doWork");
const buttonElementAddToBank = document.getElementById("addToBank");
const spanElementMoneyEarned = document.getElementById("moneyEarned");
let buttonElementPayLoan = null;
const spanElementRepayLoanLocation = document.getElementById("repayLoanLocation");
let payLoanButtonCreated = false;
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
const selectElementComputerList = document.getElementById("computerList");
const buttonElementBuyComputer = document.getElementById("buyComputer");
const spanElementComputerPrice = document.getElementById("computerPrice");
const spanElementComputerDescription = document.getElementById("computerDescription");
const spanElemnentComputerStock = document.getElementById("computerStock");
const imageElementComputerImage = document.getElementById("computerImage");
let computerCost = 0;
let computerStock = 0;
let selectedComputer = 0;

//Make sure bankBalance text is equal to the actual amount
spanElementBankBalance.innerText = bankBalance;
//Enable button functionalities
buttonElementDoWork.addEventListener('click',DoWork);
buttonElementAddToBank.addEventListener('click',AddToBank);
buttonElementTakeLoan.addEventListener('click',TakeLoan);
buttonElementBuyComputer.addEventListener('click', buyComputer);

let computers = [];

fetch("https://hickory-quilled-actress.glitch.me/computers")
.then(response => response.json())
.then(collectedData => computers = collectedData)
.then(computers => addComputersToMenu(computers));

const selectComputerFromList = eventCaller =>
{
    selectedComputer = computers[eventCaller.target.selectedIndex];
    spanElementComputerPrice.innerText = selectedComputer.price;
    spanElementComputerDescription.innerText = selectedComputer.specs;
    imageElementComputerImage.src = "https://hickory-quilled-actress.glitch.me/" + selectedComputer.image;
    //Image 5 has the wrong link, it needs to be PNG so we force the link through
    if (selectedComputer.id == 5)
    {
        imageElementComputerImage.src = "https://hickory-quilled-actress.glitch.me/assets/images/5.png";
    }
    computerCost = parseInt(selectedComputer.price);
    computerStock = parseInt(selectedComputer.stock);
    spanElemnentComputerStock.innerText = computerStock;
    
}
//Function selectComputerFromList is not hoisted so eventlistener needs to be after.
selectElementComputerList.addEventListener('change',selectComputerFromList);

function addComputersToMenu(computers)
{
    computers.forEach(computer => {
        const computerElement = document.createElement("option");
        computerElement.value = computer.id;
        computerElement.appendChild(document.createTextNode(computer.title));
        selectElementComputerList.appendChild(computerElement);
    });
    spanElementComputerPrice.innerText = computers[0].price;
    spanElementComputerDescription.innerText = computers[0].specs;
    imageElementComputerImage.src = "https://hickory-quilled-actress.glitch.me/" + computers[0].image;
    computerCost = parseInt(computers[0].price);
    computerStock = parseInt(computers[0].stock);
    selectedComputer = computers[0];
    spanElemnentComputerStock.innerText = computerStock;

}

function buyComputer()
{
    if(computerCost > bankBalance)
    {
        alert("You do not have enough money for this item!");
    }
    else if(selectedComputer.stock <= 0)
    {
        alert("No item of that type in stock");
    }
    else
    {
        bankBalance = bankBalance - computerCost;
        spanElementBankBalance.innerText = bankBalance;
        alert("You have successfully purchased " + selectedComputer.title + " :D");
        selectedComputer.stock -= 1;
        spanElemnentComputerStock.innerText = selectedComputer.stock;
    }
}

function DoWork()
{
    moneyEarned = moneyEarned + moneyEarnedPerWork;
    spanElementMoneyEarned.innerText = moneyEarned;
}

function RepayLoan()
{
    let amountRepaid = 0;
    if(moneyEarned >= currentLoan)
    {
        amountRepaid = currentLoan;
        currentLoan = currentLoan - amountRepaid;
        moneyEarned = moneyEarned - amountRepaid;
        takenLoan = false;
    }
    else if(moneyEarned < currentLoan)
    {
        amountRepaid = moneyEarned;
        moneyEarned = moneyEarned - amountRepaid;
        currentLoan = currentLoan - amountRepaid;
    }
    spanElementCurrentLoan.innerText = currentLoan;
    spanElementMoneyEarned.innerText = moneyEarned;
}

function AddToBank()
{
    bankBalance = bankBalance + moneyEarned - (moneyEarned*interestRate);
    currentLoan = currentLoan - (moneyEarned*interestRate)
    if(currentLoan <= 0)
        {
            //Reset loan and 
            //make sure the correct money amount goes to the bank
            takenLoan = false;
            bankBalance = bankBalance - currentLoan;
            currentLoan = 0;
        }
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
            //Not enough money
            if(bankInput>bankBalance*2)
            {
                alert("We will not loan you more than double your money!");
            }
            //Invalid input
            else if(bankInput <= 0 || isNaN(bankInput))
            {
                alert("That is not a valid loan number!");
            }
            //Loan successfully taken
            else
            {
                currentLoan = bankInput;
                bankBalance = bankBalance + currentLoan;
                takenLoan = true;
                spanElementCurrentLoan.innerText = currentLoan;
                spanElementBankBalance.innerText = bankBalance;
                if (payLoanButtonCreated == false)
                {
                //Create pay loan button
                buttonElementPayLoan = document.createElement("button");
                spanElementRepayLoanLocation.appendChild(buttonElementPayLoan);
                buttonElementPayLoan.innerHTML = "Repay loan";
                buttonElementPayLoan.addEventListener('click',RepayLoan);
                payLoanButtonCreated = true;
                }

            }
        }
        else{alert("We will not loan money to you if you do not have money!");}
    }
    else{alert("you already have a loan!");}
}
