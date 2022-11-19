const apiKey = "51abae1f-5e75-4d96-8911-f1436145a2c3"
let url = "https://pro-api.coinmarketcap.com/v1/cryptocurrency/listings/latest"
let qString = "?CMC_PRO_API_KEY=" + apiKey + "&sort=market_cap&start=1&limit=5";

// const getCoinPrice = async function () {
//     const ResponseData = await fetch(url + qString);
//     const Response = await ResponseData.json();
//     console.log(Response);
//     return Response;
// };


fetch(url + qString)
    .then(function(response) {
        return response.json();
    })
    .then(function(myJson) {
       let ul = document.querySelector("ul#coinList");
         for (let i = 0; i < myJson.data.length; i++) {
            let li = document.createElement("li");
            let price = myJson.data[i].quote.USD.price.toFixed(2);
            if(i == 0){
                li.classList.add("flex","flex-row","justify-between","items-center","py-2","px-4","hover:bg-gray-100");
                li.innerHTML = `
                      <div>
                        <h3 class="text-4xl">${myJson.data[i].name}</h3>
                        <span class="">${myJson.data[i].symbol}</span>
                      </div>
                      <p class="text-4xl">${price}$</p>    
                `;
            }else{
                li.classList.add("flex","flex-row","justify-between","items-center","py-2","px-4","hover:bg-gray-100");
                li.innerHTML = `
                      <div>
                      <h4 class="text-2xl">${myJson.data[i].name}</h4>
                      <span>${myJson.data[i].symbol}</span>
                      </div>
                      <p class="text-2xl">${price}$</p>    
                `;
            }
            ul.appendChild(li);
            } 
    });


