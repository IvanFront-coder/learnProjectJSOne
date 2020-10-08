'use strict';

let startBtn = document.getElementById('start');

let budgetValue = document.querySelector('.budget-value'),
    dayBudgetValue = document.querySelector('.daybudget-value'),
    levelValue = document.querySelector('.level-value'),
    expensesValue = document.querySelector('.expenses-value'),
    optionalExpensesValue = document.querySelector('.optionalexpenses-value'),
    incomeValue = document.querySelector('.income-value'),
    monthsavingsValue = document.querySelector('.monthsavings-value'),
    yearsavingsValue = document.querySelector('.yearsavings-value');

let expensesItem = document.getElementsByClassName('expenses-item');

let btns = document.getElementsByTagName('button'),
    expensesBtn = btns[0],
    optionExpensesBtn = btns[1],
    countBtn = btns[2];

let inputsOptionalExpenses = document.querySelectorAll('.optionalexpenses-item');

let inputPossibleIncome = document.querySelector('.choose-income'),
    checkboxSavings = document.querySelector('#savings'),
    inputSumSavings = document.querySelector('#sum'),
    inputPercentSavings = document.querySelector('#percent'),
    inputYearValue = document.querySelector('.year-value'),
    inputMonthValue = document.querySelector('.month-value'),
    inputDayValue = document.querySelector('.day-value');

let money, time;

function start () {
    money = +prompt('Ваш бюджет на месяц?', '');
    time = prompt('Введите дату в формате YYYY-MM-DD', '');

    while (isNaN(money) || money == '' || money == null) {
        money = +prompt('Ваш бюджет на месяц?', '');
    }
}

startBtn.addEventListener('click', function () {
    expensesBtn.disabled = false;
    optionExpensesBtn.disabled = false;
    countBtn.disabled = false;

    time = prompt('Введите дату в формате YYYY-MM-DD', '');
    money = +prompt('Ваш бюджет на месяц?', '');

    while (isNaN(money) || money == '' || money == null) {
        money = +prompt('Ваш бюджет на месяц?', '');
    }
    appData.budget = money;
    appData.timeData = time;
    budgetValue.textContent = money.toFixed();
    inputYearValue.value = new Date(Date.parse(time)).getFullYear();
    inputMonthValue.value = new Date(Date.parse(time)).getMonth() + 1;
    inputDayValue.value = new Date(Date.parse(time)).getDate();
});

expensesBtn.addEventListener('click', function() {
    let sum = 0;
    for (let i = 0; i < expensesItem.length; i++) {
        let a = expensesItem[i].value,
            b = expensesItem[++i].value;
        
        if ((typeof(a)) === 'string' && ((typeof(a)) != null) && ((typeof(b)) != null)
            && (a != '') && (b != '') && a.length < 50) {
            console.log('done');
            appData.expenses[a] = b;
            sum += +b;
        } else {
            i--;
        }
    };
    expensesValue.textContent = sum;
});

optionExpensesBtn.addEventListener('click', function() {
    for (let i = 0; i < inputsOptionalExpenses.length; i++) {
        let opt = inputsOptionalExpenses[i].value;
        if (typeof(opt) == 'string' && typeof(opt) != null && opt.length < 50 && opt != '') {
            appData.optionalExpenses[i] = opt;
            optionalExpensesValue.textContent += appData.optionalExpenses[i] + ' ';
        } else {
            i--;
        }
    }
});

countBtn.addEventListener('click', function() {
    // console.log(expensesValue.textContent);
    if(appData.budget != undefined && expensesValue.textContent != '') {
        let sumExpenses = +expensesValue.textContent;
        appData.moneyPerDay = ((appData.budget - sumExpenses) / 30).toFixed();
        dayBudgetValue.textContent = appData.moneyPerDay;

        if (appData.moneyPerDay < 100) {
            levelValue.textContent = 'Минимальный уровень достатка';
        } else if (appData.moneyPerDay > 100 && appData.moneyPerDay < 2000) {
            levelValue.textContent = 'Средний уровень достатка';
        } else if (appData.moneyPerDay > 2000) {
            levelValue.textContent = 'Высокий уровень достатка';
        } else {
            levelValue.textContent = 'Произошла ошибка';
        }
    } else {
        dayBudgetValue.textContent = 'Произошла ошибка';
    }
});

inputPossibleIncome.addEventListener('input', function() {
    let items = inputPossibleIncome.value;
    appData.income = items.split(', ');
    incomeValue.textContent = appData.income;
});

checkboxSavings.addEventListener('click', function() {
    if (appData.savings == true) {
        appData.savings = false;
    } else {
        appData.savings = true;
    }
});

inputSumSavings.addEventListener('input', function() {
    if (appData.savings == true) {
        let sum = +inputSumSavings.value,
            percent = +inputPercentSavings.value;

        appData.monthIncome = sum / 100 / 12 * percent;
        appData.yearIncome = sum / 100 * percent;

        monthsavingsValue.textContent = appData.monthIncome.toFixed(1);
        yearsavingsValue.textContent = appData.yearIncome.toFixed(1);
    }
});

inputPercentSavings.addEventListener('input', function() {
    if (appData.savings == true) {
        let sum = +inputSumSavings.value,
            percent = +inputPercentSavings.value;

        appData.monthIncome = sum / 100 / 12 * percent;
        appData.yearIncome = sum / 100 * percent;

        monthsavingsValue.textContent = appData.monthIncome.toFixed(1);
        yearsavingsValue.textContent = appData.yearIncome.toFixed(1);
    }
});

let appData = {
    budget: money,
    timeData: time,
    expenses: {},
    optionalExpenses: {},
    income: [],
    savings: false
};

// console.log('Наша программа включает в себя данные:');
// for (let key in appData) {
//     console.log(key + ': ' + appData[key]);
// }



