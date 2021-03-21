"use strict";

// Обьект с курсами 3-х валют
const rates = {};

// Элементы для отображение курса валют
const elementUSD = document.querySelector('[data-value="USD"]'),
    elementEUR = document.querySelector('[data-value="EUR"]'),
    elementGBP = document.querySelector('[data-value="GBP"]');

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
            rates.USD = data.Valute.USD;
            rates.EUR = data.Valute.EUR;
            rates.GBP = data.Valute.GBP;
            rates.UAH = data.Valute.UAH;
            rates.BYN = data.Valute.BYN;
            rates.AMD = data.Valute.AMD;
        }).then(() => showCurrencies());
}

// Функция отборажения валют на странице
function showCurrencies() {
    // Цвет для ифнормера USD
    if (rates.USD.value > rates.USD.Previous) {
        elementUSD.classList.add("top");
    } else if (rates.USD.value === rates.USD.Previous) {
        elementUSD.classList.add("evenly");
    } else {
        elementUSD.classList.add("bottom");
    }

    // Цвет для ифнормера EUR 
    if (rates.EUR.value > rates.EUR.Previous) {
        elementEUR.classList.add("top");
    } else if (rates.EUR.value === rates.EUR.Previous) {
        elementEUR.classList.add("evenly");
    } else {
        elementEUR.classList.add("bottom");
    }

    // Цвет для ифнормера GBP
    if (rates.GBP.value > rates.GBP.Previous) {
        elementGBP.classList.add("top");
    } else if (rates.GBP.value === rates.GBP.Previous) {
        elementGBP.classList.add("evenly");
    } else {
        elementGBP.classList.add("bottom");
    }

    elementUSD.textContent = rates.USD.Value.toFixed(2);
    elementEUR.textContent = rates.EUR.Value.toFixed(2);
    elementGBP.textContent = rates.GBP.Value.toFixed(2);
}

getCurrencies();
setInterval(getCurrencies(), 10000);

// Функция конвертации
function convertValue() {
    if (give.value === "RUB") {
        if (this.id === "result") {
            input.value = (result.value * rates[receive.value].Value).toFixed(2);
        } else {
            result.value = (input.value / rates[receive.value].Value).toFixed(2);
        }
    } else if (give.value === "UAH") {
        if (this.id === "result") {
            input.value = ((result.value / rates.UAH.Nominal) * rates[give.value].Value / rates[receive.value].Value).toFixed(2);
        } else {
            result.value = ((input.value / rates.UAH.Nominal) * rates[give.value].Value / rates[receive.value].Value).toFixed(2);
        }
    } else if ((give.value === "BYN")) {
        if (this.id === "result") {
            input.value = ((result.value * rates[give.value].Value) / rates[receive.value].Value).toFixed(2);
        } else {
            result.value = ((input.value * rates[give.value].Value) / rates[receive.value].Value).toFixed(2);
        }
    } else if ((give.value === "AMD")) {
        if (this.id === "result") {
            input.value = ((result.value / (rates.AMD.Nominal / rates.AMD.Value)) * rates[receive.value].Value).toFixed(2);
        } else {
            result.value = ((input.value / (rates.AMD.Nominal / rates.AMD.Value)) / rates[receive.value].Value).toFixed(2);
        }
    }
}

// Слушаем изменения в текстовом поле и в select
input.addEventListener("input", convertValue);
result.addEventListener("input", convertValue);
give.addEventListener("input", convertValue);
receive.addEventListener("input", convertValue);