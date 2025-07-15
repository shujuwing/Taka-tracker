// DOM Elements
const balanceAmount = document.querySelector('.balance-amount.positive');
const incomeAmount = document.querySelector('.balance-card:nth-child(2) .balance-amount');
const transactionList = document.getElementById('transactionList');
const transactionNameInput = document.getElementById('transactionName');
const transactionAmountInput = document.getElementById('transactionAmount');
const addIncomeBtn = document.getElementById('addIncomeBtn');
const addExpenseBtn = document.getElementById('addExpenseBtn');
const toggleFormBtn = document.getElementById('toggleFormBtn');
const transactionForm = document.getElementById('transactionForm');

// State
let balance = 0;
let income = 0;
let transactions = [];

// Toggle form visibility
toggleFormBtn.addEventListener('click', () => {
    transactionForm.classList.toggle('visible');
    toggleFormBtn.innerHTML = transactionForm.classList.contains('visible')
        ? '<i class="fas fa-times"></i>'
        : '<i class="fas fa-plus"></i>';
});

// Add transaction
function addTransaction(name, amount, type) {
    const transaction = {
        id: Date.now(),
        name,
        amount: parseFloat(amount),
        type
    };

    transactions.push(transaction);

    if (type === 'income') {
        balance += transaction.amount;
        income += transaction.amount;
    } else {
        balance -= transaction.amount;
    }

    updateUI();
}

// Update UI
function updateUI() {
    // Update balance and income
    balanceAmount.textContent = `${balance.toFixed(2)} ৳`;
    incomeAmount.textContent = `${income.toFixed(2)} ৳`;

    // Update balance color based on value
    if (balance < 0) {
        balanceAmount.classList.remove('positive');
        balanceAmount.classList.add('negative');
    } else {
        balanceAmount.classList.remove('negative');
        balanceAmount.classList.add('positive');
    }

    // Update transaction list
    if (transactions.length === 0) {
        transactionList.innerHTML = `
                    <div class="empty-state">
                        <div class="empty-icon">
                            <i class="fas fa-exchange-alt"></i>
                        </div>
                        <p>No transactions yet</p>
                        <p>Add your first transaction to get started</p>
                    </div>
                `;
    } else {
        transactionList.innerHTML = transactions.map(transaction => `
                    <li class="transaction-item ${transaction.type} fade-in">
                        <span class="transaction-name">
                            ${transaction.type === 'income'
                ? '<i class="fas fa-arrow-down text-success"></i>'
                : '<i class="fas fa-arrow-up text-danger"></i>'}
                            ${transaction.name}
                        </span>
                        <span class="transaction-amount ${transaction.type}">
                            ${transaction.type === 'income' ? '+' : '-'}${transaction.amount.toFixed(2)} ৳
                        </span>
                    </li>
                `).join('');
    }

    // Clear form
    transactionNameInput.value = '';
    transactionAmountInput.value = '';
}

// Event listeners
addIncomeBtn.addEventListener('click', () => {
    const name = transactionNameInput.value.trim();
    const amount = transactionAmountInput.value.trim();

    if (!name || !amount || isNaN(amount) || parseFloat(amount) <= 0) {
        alert('Please enter a valid name and amount');
        return;
    }

    addTransaction(name, amount, 'income');
});

addExpenseBtn.addEventListener('click', () => {
    const name = transactionNameInput.value.trim();
    const amount = transactionAmountInput.value.trim();

    if (!name || !amount || isNaN(amount) || parseFloat(amount) <= 0) {
        alert('Please enter a valid name and amount');
        return;
    }

    addTransaction(name, amount, 'expense');
});

// Initialize UI
updateUI();