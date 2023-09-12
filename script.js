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

axios.get("https://api.thecatapi.com/v1/images/search?api_key=live_SZgisQ7fCM4pD5We0Bbyj0CdX58Hy0mtGoMwMNrxP8uUM3VtRDpxd8XjRjvEKydZ")
    .then((response) => {
        //manipular reposta
        console.log(response.data)
    })
    .catch((error) => {
        //manipular erro
    })

breedSelect.addEventListener("change", () => {
    const selectedBreedId = breedSelect.value;
    if (selectedBreedId) {
        fetchCatImagesByBreed(selectedBreedId);
    }
});

const card = document.querySelector(".card");








