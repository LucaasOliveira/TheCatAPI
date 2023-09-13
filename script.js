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

        const breedInfo = document.querySelector(".breed-info");
        breedInfo.innerHTML = "";

        const name = document.createElement("h3");
        name.textContent = `Nome da Raça: ${breedData.name}`;
        name.style.marginBottom = "1rem";
        breedInfo.appendChild(name);

        const description = document.createElement("p");
        description.textContent = `Descrição: ${breedData.description}`;
        breedInfo.appendChild(description);
    } catch {
        alert("Erro ao acessar informações da raça:");
    }
}

const breedSelect = document.querySelector("select");

breedSelect.addEventListener("change", () => {
    const selectedBreedId = breedSelect.value;
    const cards = document.querySelector(".cards");
    const breedInfo = document.querySelector(".breed-info");
    const testeGambiarra = document.querySelector(".container-card");


    if (selectedBreedId) {
        fetchCatImages(selectedBreedId);
        fetchBreedInfo(selectedBreedId);
        testeGambiarra.style.display = "flex";

    } else {
        cards.innerHTML = "";
        breedInfo.innerHTML = "";
        testeGambiarra.style.display = "none";
    }
});

start();
