let money = +prompt('Ваш бюджет на месяц?', '');
let time = prompt('Введите дату в формате YYYY-MM-DD', '');

let mandatoryExpenses = +prompt('Введите обязательную статью расходов в этом месяце', '');
let cost = +prompt('Во сколько обойдется', '');

let appData = {
    budget: money,
    timeData: time,
    expenses: {

    },
    optionalExpenses: {

    },
    income: [],
    savings: false
};

let budgetDay = money / 30;

alert(`Бюджет на месяц ${budgetDay}`);
