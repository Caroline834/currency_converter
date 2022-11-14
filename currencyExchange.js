$(document).ready(function () {
    init();

    $("input").keyup(function () {
        let targetCurrencyName = $("#right option:selected").text();
        let targetCurrency = Number($("#right").val());
        let userInput = Number($("#input").val());
        let displayResult = parseFloat(userInput * targetCurrency).toFixed(2);
        console.log(displayResult);
        $("#show").val(`${displayResult} ${targetCurrencyName}`);
    })

    $("#left").change(function () {
        let baseCode = $("#left option:selected").text();
        let updateBaseCode = baseCode.trim();
        $("#left").empty();
        $("#right").empty();
        // console.log(`https://v6.exchangerate-api.com/v6/1b16561de65cbe2e5770b0c0/latest/${updateBaseCode}`)

        fetch(`https://v6.exchangerate-api.com/v6/1b16561de65cbe2e5770b0c0/latest/${updateBaseCode}`)
            .then(res => res.json())
            .then(data => {
                for (const key in data.conversion_rates) {
                    // console.log(data)
                    $('#left').append(
                        ` <option value = "${data.conversion_rates[key]}">
                    ${key}</option>
                `
                    )
                }

                for (const key in data.conversion_rates) {
                    $('#right').append(
                        ` <option value = "${data.conversion_rates[key]}">
                    ${key}</option>
                `)
                }
            })
            .catch(err => console.log(err));
    })

    $("#right").change(function () {
        $("input").val("");
    })
});

async function init() {
    await fetch("https://v6.exchangerate-api.com/v6/1b16561de65cbe2e5770b0c0/latest/USD")
        .then(res => res.json())
        .then(data => {
            for (const key in data.conversion_rates) {
                // console.log(data)
                $('#left').append(
                    ` <option value = "${data.conversion_rates[key]}">
                            ${key}</option>
                        `
                )
            }

            for (const key in data.conversion_rates) {
                $('#right').append(
                    ` <option value = "${data.conversion_rates[key]}">
                            ${key}</option>
                        `
                )
            }
        })
        .catch(err => console.log(err));
}


