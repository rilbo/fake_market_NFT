window.addEventListener('DOMContentLoaded', async () => {
    const apiUrl = `https://awesome-nft-app.herokuapp.com`;
    const id = window.location.search.split('=')[1]
    const url = `${apiUrl}/nft/${id}`;

    await fetch(url)
        .then(function(response) {
            return response.json();
        })
        .then(function(myJson) {
            console.log(myJson);
            const title = document.querySelector("h1");
            const image = document.querySelector("img#img-nft");
            const description = document.querySelector("p#p-nft");
            const creator = document.querySelector("p#creator-nft");
            const imageCollect = document.querySelector("img#img-banner-nft");
            const pCollection = document.querySelector("p#p-banner-nft");
            const owner = document.querySelector("p#p-owner-nft");
            const price = document.querySelector("p#price-nft");
            const imgOwner = document.querySelector("img#img-owner-nft");

            title.innerHTML = myJson.name;
            image.src = myJson.image_url;
            if(myJson.description == "" || myJson.description == null){
                description.innerHTML = "Aucune description";
            }else{
                description.innerHTML = myJson.description;
            }

            if(myJson.creator.name == "" || myJson.creator.name == null){
                creator.innerHTML = "Créateur inconnu";
            }else{
                creator.innerHTML = myJson.creator.name;
            }

            if(myJson.collection.image_url == "" || myJson.collection.image_url == null){
                imageCollect.src = "https://via.placeholder.com/728x90";
            }else{
                imageCollect.src = myJson.collection.image_url;
            }

            if(myJson.collection.description == "" || myJson.collection.description == null){
                pCollection.innerHTML = "Aucune description";
            }else{
                pCollection.innerHTML = myJson.collection.description;
            }

            if(myJson.owner.username == "" || myJson.owner.username == null){
                owner.innerHTML = "Propriétaire inconnu";
            }else{
                owner.innerHTML = myJson.owner.username;
            }

            if(myJson.owner.profile_url == "" || myJson.owner.profile_url == null){
                imgOwner.src = "https://via.placeholder.com/150";
            }else{
                imgOwner.src = myJson.owner.profile_url;
            }

            if(myJson.sales == "" || myJson.sales == null){
                price.innerHTML = "Non disponible";
            }else{
                price.innerHTML = myJson.sales + " ETH";
            }
        })
})