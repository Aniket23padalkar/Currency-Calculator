const mainSelect = document.querySelectorAll(".main-select");
const input = document.getElementById("amt-input");
const convertBtn = document.getElementById("button");
const fromCurrency = document.getElementById("from");
const toCurrency = document.getElementById("to");
const output = document.getElementById("message");

async function convertCurrency() {
    try {
        const amount = Number(input.value);
        const from = fromCurrency.value.toLowerCase();
        const to = toCurrency.value.toLowerCase();

        const response = await fetch(
            `https://latest.currency-api.pages.dev/v1/currencies/${from}.json`
        );
        const data = await response.json();
        const rate = data[from][to];

        output.textContent = `${amount} ${from.toUpperCase()} = ${(
            amount * rate
        ).toFixed(2)} ${to.toUpperCase()}`;
    } catch (err) {
        output.textContent = "Error fetching Data!";
    }
}

for (let select of mainSelect) {
    for (let currCode in countryList) {
        const option = document.createElement("option");
        option.innerText = currCode;
        option.value = currCode;

        if (select.name === "from" && currCode === "USD") {
            option.selected = true;
        } else if (select.name === "to" && currCode === "INR") {
            option.selected = true;
        }
        select.appendChild(option);
    }

    select.addEventListener("change", (e) => {
        updateFlag(e.target);
    });
}

function updateFlag(element) {
    const currCode = element.value;
    const countryCode = countryList[currCode];
    const imgLink = `https://flagsapi.com/${countryCode}/flat/64.png`;
    const img = element.parentElement.querySelector("img");
    img.src = imgLink;
}

convertBtn.addEventListener("click", (e) => {
    e.preventDefault();
    convertCurrency();
});
