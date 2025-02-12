const balance = document.querySelector('.balance');
const income = document.querySelector('.income');

const activityInput = document.getElementById('activity');
const amountInput = document.getElementById('amount');

const addbtn = document.getElementById('addbtn');
const delbtn = document.getElementById('delbtn');

const transactionList = document.querySelector('.transiction-list');
const toggleTransitionBtn = document.getElementById("toggle-transition-btn");
const transitionSection = document.querySelector(".add-transition");

let Balance = 0;
let Income = 0;

function updateUi() {
    balance.textContent = `৳ ${Balance.toFixed(2)}`;
    income.textContent = `৳ ${Income.toFixed(2)}`;
}

function addTransaction(activity, amount, type) {
    const transaction = document.createElement('li');
    transaction.classList.add('transiction');
    transaction.innerHTML = `
        <span>${activity}</span>
        <span class="${type === "income" ? "income" : "cost"}">৳${amount.toFixed(2)}</span>
    `;
    transactionList.appendChild(transaction);
}

toggleTransitionBtn.addEventListener("click", () => {
    transitionSection.classList.toggle("visible");
    transitionSection.classList.toggle("hidden");
    
});


addbtn.addEventListener('click', () => {
    const activity = activityInput.value.trim();
    const amount = parseFloat(amountInput.value);

    if (!activity || isNaN(amount) || amount <= 0) {
        alert('Please enter valid activity and amount');
        return;
    }

    Balance += amount;
    Income += amount;

    addTransaction(activity, amount, 'income');
    activityInput.value = '';
    amountInput.value = '';
    updateUi();
});

delbtn.addEventListener('click', () => {
    const activity = activityInput.value.trim();
    const amount = parseFloat(amountInput.value);

    if (!activity || isNaN(amount) || amount <= 0) {
        alert('Please enter valid activity and amount');
        return;
    }

    Balance -= amount;
    

    addTransaction(activity, amount, 'cost');
    activityInput.value = '';
    amountInput.value = '';
    updateUi();
});

