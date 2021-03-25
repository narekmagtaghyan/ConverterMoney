"use strict";

// Обьект с курсами 3-х валют
const rates = {};

// Элементы для отображение курса валют
const elements = {
    USD: document.querySelector('[data-value="USD"]'),
    EUR: document.querySelector('[data-value="EUR"]'),
    GBP: document.querySelector('[data-value="GBP"]')
};

// Элементы формы, ввод суммы, выбор валюты, поле с результатом
const input = document.querySelector("#input"),
    result = document.querySelector("#result"),
    give = document.querySelector("#give"),
    receive = document.querySelector("#receive");

// Функция получения курса валют
function getCurrencies() {
    fetch("https://www.cbr-xml-daily.ru/daily_json.js")
        .then(function (result) {
            return result.json();
        }).then(function (data) {
            const values = ["USD", "EUR", "GBP", "BYN", "UAH", "AMD"];

            values.forEach(function (value) {
                rates[value] = data.Valute[value];
            });
        }).then(() => showCurrencies());
}

// Функция отборажения валют на странице
function showCurrencies() {
    // Цвета для ифнормеров USD, EUR и GBP
    const values = ["USD", "EUR", "GBP"];

    values.forEach(function (value) {
        if (rates[value].value > rates[value].Previous) {
            elements[value].classList.add("top");
        } else if (rates[value].value === rates[value].Previous) {
            elements[value].classList.add("evenly");
        } else {
            elements[value].classList.add("bottom");
        }

        elements[value].textContent = rates[value].Value.toFixed(2);
    });
}

getCurrencies();
setInterval(getCurrencies(), 10000);

// Функция конвертации
function convertValue() {
    if (give.value === "RUB") {
        if (this.id === "result") {
            input.value = (result.value * rates[receive.valu].Value).toFixed(2);
        } else {
            result.value = (input.value / rates[receive.value].Value).toFixed(2);
        }
    } else if ((give.value === "BYN")) {
        if (this.id === "result") {
            input.value = ((result.value / rates.BYN.Nominal * rates.BYN.Value) / rates[receive.value].Value).toFixed(2);
        } else {
            result.value = ((input.value / rates.BYN.Nominal * rates.BYN.Value) / rates[receive.value].Value).toFixed(2);
        }
    } else if (give.value === "UAH") {
        if (this.id === "result") {
            input.value = ((result.value / rates.UAH.Nominal * rates.UAH.Value) / rates[receive.value].Value).toFixed(2);
        } else {
            result.value = ((input.value / rates.UAH.Nominal * rates.UAH.Value) / rates[receive.value].Value).toFixed(2);
        }
    } else if ((give.value === "AMD")) {
        if (this.id === "result") {
            input.value = ((result.value / rates.AMD.Nominal * rates.AMD.Value) / rates[receive.value].Value).toFixed(2);
        } else {
            result.value = ((input.value / rates.AMD.Nominal * rates.AMD.Value) / rates[receive.value].Value).toFixed(2);
        }
    }
}

// Слушаем изменения в текстовом поле и в select
input.addEventListener("input", convertValue);
result.addEventListener("input", convertValue);
give.addEventListener("input", convertValue);
receive.addEventListener("input", convertValue);