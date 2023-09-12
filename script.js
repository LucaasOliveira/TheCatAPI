async function fetchCatImagesByBreed(breedId) {
    const apiUrl = `https://api.thecatapi.com/v1/images/search?limit=10&breed_ids=${breedId}&api_key=live_SZgisQ7fCM4pD5We0Bbyj0CdX58Hy0mtGoMwMNrxP8uUM3VtRDpxd8XjRjvEKydZ`;

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
        console.error("Erro ao acessar a API:", error);
    }
}

const breedSelect = document.querySelector("select");

breedSelect.addEventListener("change", () => {
    const selectedBreedId = breedSelect.value;
    if (selectedBreedId) {
        fetchCatImagesByBreed(selectedBreedId);
    }
});

async function loadBreeds() {
    const breedsUrl = "https://api.thecatapi.com/v1/breeds";

    try {
        const response = await axios.get(breedsUrl);
        const breedsData = response.data;


        const defaultOption = document.createElement("option");
        defaultOption.value = "";
        defaultOption.text = "Escolha uma raça";
        breedSelect.appendChild(defaultOption);

        breedsData.forEach((breed) => {
            const option = document.createElement("option");
            option.value = breed.id;
            option.text = breed.name;
            breedSelect.appendChild(option);
        });
    } catch (error) {
        console.error("Erro ao carregar as raças:", error);
    }
}

loadBreeds();



