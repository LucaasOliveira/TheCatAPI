
async function start() {
    const breedsUrl = "https://api.thecatapi.com/v1/breeds";

    try {
        const response = await axios.get(breedsUrl);
        const breedsData = response.data;

        const defaultOption = document.createElement("option");
        defaultOption.value = "";
        defaultOption.text = "Escolha aqui";
        breedSelect.appendChild(defaultOption);

        breedsData.forEach((breed) => {
            const option = document.createElement("option");
            option.value = breed.id;
            option.text = breed.name;

            breedSelect.appendChild(option);
        });
    } catch {
        alert("Erro ao carregar as raças:");
    }
}

async function fetchCatImages(selectedBreedId) {
    const apiUrl = `https://api.thecatapi.com/v1/images/search?limit=1&breed_ids=${selectedBreedId}&api_key=live_SZgisQ7fCM4pD5We0Bbyj0CdX58Hy0mtGoMwMNrxP8uUM3VtRDpxd8XjRjvEKydZ`;

    try {
        const response = await axios.get(apiUrl);
        const data = response.data;

        const cards = document.querySelector(".cards");
        cards.innerHTML = "";

        data.forEach((cat) => {
            const catImage = document.createElement("img");
            catImage.src = cat.url;
            cards.appendChild(catImage);
        });
    } catch (error) {
        alert("Erro ao acessar a API:");
    }
}

async function fetchBreedInfo(selectedBreedId) {
    const breedInfoUrl = `https://api.thecatapi.com/v1/breeds/${selectedBreedId}`;

    try {
        const response = await axios.get(breedInfoUrl);
        const breedData = response.data;

        const translatedName = await translateText(breedData.name, "en", "pt-br");

        const translatedDescription = await translateText(breedData.description, "en", "pt-br");

        const breedInfo = document.querySelector(".breed-info");
        breedInfo.innerHTML = "";

        const name = document.createElement("h3");
        name.textContent = `Nome da Raça: ${translatedName}`;
        name.style.marginBottom = "1rem";
        breedInfo.appendChild(name);

        const description = document.createElement("p");
        description.textContent = `Descrição: ${translatedDescription}`;
        breedInfo.appendChild(description);
    } catch (error) {
        alert("Erro ao acessar informações da raça:", error);
    }
}

async function translateText(text, sourceLanguage, targetLanguage) {
    const translationUrl = "https://api.edenai.run/v2/translation/automatic_translation";

    try {
        const response = await axios.post(translationUrl, {
            providers: "amazon,google,ibm,microsoft",
            text: text,
            source_language: sourceLanguage,
            target_language: targetLanguage,
        }, {
            headers: {
                authorization: "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoiOTFmMjYzMmUtYmYwOS00MDk5LWFhZDYtNWI4ZDNiMTc3Y2E2IiwidHlwZSI6ImFwaV90b2tlbiJ9.UoF8wXN1gbpn4kPb7IUxX8y709PucOkcNLF-y8ANtPs",
            },
        });

        return response.data.ibm.text;
    } catch (error) {
        console.log("Erro na tradução:", error);
        return text; 
    }
}


const breedSelect = document.querySelector("select");

breedSelect.addEventListener("change", () => {
    const selectedBreedId = breedSelect.value;
    const cards = document.querySelector(".cards");
    const breedInfo = document.querySelector(".breed-info");
    const showCards = document.querySelector(".container-card");


    if (selectedBreedId) {
        fetchCatImages(selectedBreedId);
        fetchBreedInfo(selectedBreedId);
        showCards.style.display = "flex";

    } else {
        cards.innerHTML = "";
        breedInfo.innerHTML = "";
        showCards.style.display = "none";
    }
});

start();
