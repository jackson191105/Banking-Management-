// Initialize balance and transaction list
let balance = localStorage.getItem("balance") || 0;
let transactions = JSON.parse(localStorage.getItem("transactions")) || [];

const balanceEl = document.getElementById("balance");
const transactionList = document.getElementById("transactionList");

balanceEl.innerText = balance;

// Function to update transaction list in UI
function updateTransactions() {
  transactionList.innerHTML = "";
  transactions.forEach(tx => {
    const li = document.createElement("li");
    li.innerText = tx;
    transactionList.appendChild(li);
  });
}

// Deposit function
document.getElementById("depositBtn").addEventListener("click", () => {
  const amt = parseFloat(document.getElementById("amount").value);
  if (amt > 0) {
    balance = parseFloat(balance) + amt;
    transactions.push(`Deposited $${amt}`);
    saveData();
  } else {
    alert("Enter a valid amount");
  }
});

// Withdraw function
document.getElementById("withdrawBtn").addEventListener("click", () => {
  const amt = parseFloat(document.getElementById("amount").value);
  if (amt > 0 && amt <= balance) {
    balance = parseFloat(balance) - amt;
    transactions.push(`Withdrew $${amt}`);
    saveData();
  } else {
    alert("Insufficient balance or invalid amount");
  }
});

// Save data to localStorage and update UI
function saveData() {
  localStorage.setItem("balance", balance);
  localStorage.setItem("transactions", JSON.stringify(transactions));
  balanceEl.innerText = balance;
  updateTransactions();
}

// Initialize transaction list on page load
updateTransactions();
