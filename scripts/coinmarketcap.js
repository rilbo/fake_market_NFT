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
                li.classList.add("flex", "items-center", "justify-between", "max-w-2xl", "px-8", "py-4", "mx-auto", "border", "border-blue-500", "cursor-pointer", "rounded-xl");
                li.innerHTML = `
                    <div class="flex items-center">
                        <div>
                            <h2 class="text-lg font-medium text-gray-700 sm:text-2xl">${myJson.data[i].name}</h2>
                            <div class=" text-xs text-blue-500">
                            ${myJson.data[i].symbol}
                            </div>
                        </div>
                    </div>
                    <h2 class="text-2xl font-semibold text-blue-600 sm:text-4xl">${price}$</h2>  
                `;
            }else{
                li.classList.add("flex", "items-center", "justify-between", "max-w-2xl", "px-8", "py-4", "mx-auto", "border",  "cursor-pointer", "rounded-xl", "dark:border-gray-700")
                li.innerHTML = ` 
                      <div class="flex items-center">
                            <div>
                                <h2 class="text-lg font-medium text-gray-700 sm:text-2xl ">${myJson.data[i].name}</h2>
                                <div class="text-xs text-blue-500  ">
                                    ${myJson.data[i].symbol}
                                </div>
                            </div>
                      </div>
                      <h2 class="text-2xl font-semibold text-gray-500 sm:text-4xl dark:text-gray-500">${price}$</h2>   
                `;
            }
            ul.appendChild(li);
            } 
    });


