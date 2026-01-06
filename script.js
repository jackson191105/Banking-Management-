// Login
function login() {
  let user = document.getElementById("username").value;
  if (!user) return alert("Enter username");

  localStorage.setItem("user", user);

  if (!localStorage.getItem(user)) {
    localStorage.setItem(user, JSON.stringify({
      savings: 0,
      current: 0,
      transactions: []
    }));
  }

  window.location = "dashboard.html";
}

// Load dashboard
if (document.getElementById("user")) {
  let user = localStorage.getItem("user");
  if (!user) window.location = "index.html";

  document.getElementById("user").innerText = user;
  updateUI();
}

function getData() {
  let user = localStorage.getItem("user");
  return JSON.parse(localStorage.getItem(user));
}

function saveData(data) {
  let user = localStorage.getItem("user");
  localStorage.setItem(user, JSON.stringify(data));
  updateUI();
}

function updateUI() {
  let data = getData();
  document.getElementById("savings").innerText = data.savings;
  document.getElementById("current").innerText = data.current;

  let list = document.getElementById("transactions");
  list.innerHTML = "";
  data.transactions.forEach(t => {
    let li = document.createElement("li");
    li.innerText = t;
    list.appendChild(li);
  });
}

// Deposit
function deposit() {
  let amt = Number(amount.value);
  let acc = accountType.value;
  if (amt <= 0) return alert("Invalid amount");

  let data = getData();
  data[acc] += amt;
  data.transactions.push(`Deposited ₹${amt} to ${acc}`);
  saveData(data);
}

// Withdraw
function withdraw() {
  let amt = Number(amount.value);
  let acc = accountType.value;

  let data = getData();
  if (amt <= 0 || amt > data[acc]) return alert("Insufficient balance");

  data[acc] -= amt;
  data.transactions.push(`Withdrew ₹${amt} from ${acc}`);
  saveData(data);
}

// Transfer
function transfer() {
  let amt = Number(amount.value);
  let from = accountType.value;
  let to = from === "savings" ? "current" : "savings";

  let data = getData();
  if (amt <= 0 || amt > data[from]) return alert("Transfer failed");

  data[from] -= amt;
  data[to] += amt;
  data.transactions.push(`Transferred ₹${amt} from ${from} to ${to}`);
  saveData(data);
}

// Reset
function resetAccount() {
  let user = localStorage.getItem("user");
  if (confirm("Reset all data?")) {
    localStorage.removeItem(user);
    logout();
  }
}

// Logout
function logout() {
  localStorage.removeItem("user");
  window.location = "index.html";
}