document.addEventListener('DOMContentLoaded', async () => {
    const id = window.location.search.split('=')[1]
    let btnCookie = document.querySelector("button#btn-cookie");
    btnCookie.classList.add("data_btn_"+id, "btn-not-favorite");

    if(document.cookie.indexOf("nft_"+id) >= 0){
        btnCookie.classList.remove("btn-not-favorite", "hover:bg-custom-blue", "border-custom-blue");
        btnCookie.classList.add("btn-favorite", "bg-custom-red", "border-custom-red");
        btnCookie.innerHTML = "Retirer des favoris";
        btnCookie.onclick = removecookie;
    }   
});

function addcookie(){
    const id = window.location.search.split('=')[1]
    let btn = document.querySelector("button.data_btn_"+id);
    btn.classList.add("btn-favorite", "bg-custom-red", "border-custom-red");
    btn.classList.remove("btn-not-favorite", "hover:bg-custom-blue", "border-custom-blue");
    btn.textContent = "Retirer des favoris";
    btn.onclick = removecookie;
    //ajouter au cookie le nft id
    document.cookie = "nft_"+id+"=true; expires=Thu, 31 Dec 2022 23:59:00 UTC, path=/";
}

function removecookie(){
    const id = window.location.search.split('=')[1]
    let btn = document.querySelector("button.data_btn_"+id);
    //supprimer du cookie le nft id
    if (document.cookie.indexOf("nft_"+id) >= 0) {
        document.cookie = "nft_"+id+"=; expires=Thu, 01 Jan 1970 00:00:00 GMT; SameSite=None; Secure";
    }
    
    btn.classList.add("btn-not-favorite", "hover:bg-custom-blue", "border-custom-blue");
    btn.classList.remove("btn-favorite", "bg-custom-red", "border-custom-red");
    btn.textContent = "Ajouter aux favoris";
    btn.onclick = addcookie;
}