'use strict';

let startBtn = document.getElementById('start');

let budgetValue = document.querySelector('.budget-value'),
    dayBudgetValue = document.querySelector('.daybudget-value'),
    levelValue = document.querySelector('.level-value'),
    expensesValue = document.querySelector('.expenses-value'),
    optionalExpensesValue = document.querySelector('.optionalexpenses-value'),
    uncomeValue = document.querySelector('.income-value'),
    monthsavingsValue = document.querySelector('.monthsavings-value'),
    yearsavingsValue = document.querySelector('.yearsavings-value');

let inputsExpenses = document.getElementsByClassName('expenses-item');

let btns = document.getElementsByTagName('button'),
    approveExpensesBtn = btns[0],
    approveOptionExpensesBtn = btns[1],
    calculateDailyBudgetBtn = [2];

let inputsOptionalExpenses = document.querySelectorAll('.optionalexpenses-item');

let inputPossibleIncome = document.querySelector('choose-income'),
    checkboxSavings = document.querySelector('.savings'),
    inputSumSavings = document.querySelector('#sum'),
    inputPercentSavings = document.querySelector('#percent'),
    inputYearValue = document.querySelector('.year-value'),
    inputMonthValue = document.querySelector('.month-value'),
    inputDayValue = document.querySelector('.day-value');

    console.log(dayBudgetValue);

let money, time;

function start () {
    money = +prompt('Ваш бюджет на месяц?', '');
    time = prompt('Введите дату в формате YYYY-MM-DD', '');

    while (isNaN(money) || money == '' || money == null) {
        money = +prompt('Ваш бюджет на месяц?', '');
    }
}
start();

let appData = {
    budget: money,
    timeData: time,
    expenses: {},
    optionalExpenses: {},
    income: [],
    savings: true,
    chooseExpenses: function () {
        for (let i = 0; i < 2; i++) {
            let a = prompt("Введите обязательную статью расходов в этом месяце", ''),
            b = +prompt("Во сколько обойдется?", '');
            
            if ((typeof(a)) === 'string' && ((typeof(a)) != null) && ((typeof(b)) != null)
                && (a != '') && (b != '') && a.length < 50) {
                console.log('done');
                appData.expenses[a] = b;
            } else {
                i--;
            }
        };
    },
    detectDayBudget: function() {
        appData.moneyPerDay = (appData.budget / 30).toFixed();
        alert(`Ежедневный бюджет: ${appData.moneyPerDay}`);
    },
    detectLevel: function() {
        if (appData.moneyPerDay < 100) {
            console.log('Минимальный уровень достатка');
        } else if (appData.moneyPerDay > 100 && appData.moneyPerDay < 2000) {
            console.log('Средний уровень достатка');
        } else if (appData.moneyPerDay > 2000) {
            console.log('Высокий уровень достатка');
        } else {
            console.log('Произошла ошибка');
        }
    },
    checkSavings: function() {
        if (appData.savings == true) {
            let save = +prompt('Какова сумма накоплений'),
                percent = +prompt('Под какой процент');
    
            appData.monthIncome = save / 100 / 12 * percent;
            alert('Доход в месяц с вашего депозита: ' + appData.monthIncome);
        }
    },
    chooseOptExpenses: function() {
        for (let i = 1; i < 4; i++) {
            let ans = prompt('Статья необязательных расходов?', '');
            if (typeof(ans) == 'string' && typeof(ans) != null && ans.length < 50 && ans != '') {
                appData.optionalExpenses[i] = ans;
            } else {
                i--;
            }
        }
    },
    chooseIncome: function() {
        let items = prompt('Что принесет дополнительный доход? (Перечислите через запятую', '');
        while (typeof(items) != 'string' || items == '' || items == null) {
            items = prompt('Что принесет дополнительный доход? (Перечислите через запятую', '');
        }
        appData.income = items.split(', ');
        appData.income.push(prompt('Может что-то еще?'));
        appData.income.sort();
        appData.income.forEach(function(item, i, mass) {
            alert('Способы доп. заработка: ' + (i + 1) + ' - ' + item + '.');
        });
    }
};

console.log('Наша программа включает в себя данные:');
for (let key in appData) {
    console.log(key + ': ' + appData[key]);
}

