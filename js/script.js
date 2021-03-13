"use strict";

const rates = {};

const elementUSD = document.querySelector('[data-value="USD"]'),
    elementEUR = document.querySelector('[data-value="EUR"]'),
    elementGBP = document.querySelector('[data-value="GBP"]');

function getCurrencies() {
    fetch("https://www.cbr-xml-daily.ru/daily_json.js")
        .then(function (result) {
            return result.json();
        }).then(function (data) {
            rates.USD = data.Valute.USD;
            rates.EUR = data.Valute.EUR;
            rates.GBP = data.Valute.GBP;
        }).then(() => showCurrencies());
}

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
    elementGBP.textContent = rates.GBP.Value.toFixed(2)
}

getCurrencies();