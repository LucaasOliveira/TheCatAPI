
axios.get("https://api.thecatapi.com/v1/images/search?api_key=live_SZgisQ7fCM4pD5We0Bbyj0CdX58Hy0mtGoMwMNrxP8uUM3VtRDpxd8XjRjvEKydZ")
    .then((response) => {
        //manipular reposta
        console.log(response.data)
    })
    .catch((error) => {
        //manipular erro
    })


const card = document.querySelector(".card");








