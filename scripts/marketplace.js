function fetchByPage(in_page = 1) {
    fetch('https://awesome-nft-app.herokuapp.com/?page='+in_page).then(function(response) {return response.json();})
    .then(function(myJson) {
        
    });
}