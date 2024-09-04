        document.addEventListener("DOMContentLoaded", function() {
            const submit  = document.getElementById("search");

            submit.addEventListener('click', () => {
                const input = document.getElementById("input").value;
                const result = document.getElementById('result');

                if (input.trim() === "") {
                    result.innerHTML = `Please enter something!`;
                    result.style.cssText = "color: red; font-weight: bold;";
                    return;
                }

                // Fetch the data from the API
                fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${input}`)
                    .then(response => response.json())
                    .then(data => {
                        if (data.title === "No Definitions Found") {
                            result.innerHTML = "No definition found!";
                        } else {
                            result.innerHTML = `
                                <p style="font-size:10px; text-decoration: underline">Definitions from Oxford Languages</p>
                                <p style="font-size:40px; margin-top:20px; font-style:italic">${data[0].word}</p>
                                <p style="font-size:15px; margin-top:-40px; color:grey; font-style:italic">${data[0].phonetic}</p>
                                <strong>Definition:</strong><br> ${data[0].meanings[0].definitions[0].definition}<br>
                                <strong></strong><br> ${data[0].meanings[0].definitions[1].definition}<br><br>
                                <strong>Part Of Speach:</strong><br> ${data[0].meanings[0].partOfSpeech}

                            `;
                            result.style.cssText = "background-color: white;";
                            console.log(data[0]);
                        }
                    })
                    .catch(error => {
                        result.innerHTML = "Error fetching the definition.";
                        console.error(error);
                    });
            });
        });