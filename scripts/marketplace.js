const apiUrl = `https://awesome-nft-app.herokuapp.com/`;
var filterStatus = "allBtn";

function fetchByPage(in_page = null, filter = '') {
    load();
    let page = 1;
    if (in_page == 'next') page = document.getElementById('next_pos').textContent;
    else if (in_page == 'previous') page = document.getElementById('previous_pos').textContent;

    let URL = apiUrl+'?page='+page;

    if (filter == '') filter = filterStatus;
    resetFilter(filter);
    if (filter == 'allBtn') {
        filterStatus = 'allBtn';
        console.log('%cNfts : ' + URL, "color:red");
    }
    else if (filter == 'salesBtn') {
        filterStatus = 'salesBtn';
        URL+="&sales=true";
        console.log('%cNfts by sales : ' + URL, "color:lightblue");
    }

    fetchData(URL, page);
}


function fetchData(URL, page) {
    clearCards();
    const container = document.getElementById('nftCollectionContainer');
    fetch(URL).then(function(response) {return response.json();})
    .then(function(oData) {
        // console.log(oData);
        oData.assets.forEach(e => {
            console.log(e);
            if (e.name != '') {
                const card = document.createElement('div');
    
                const desc = (e.description.length > 53 ? e.description.slice(0, 50).padEnd(53, '...') : e.description);
                const creator = (e.creator.username.length > 0 ? `By <strong>${e.creator.username}</strong>` : "");
    
                const content = `
                <div class="max-w-sm rounded-lg border bg-gray-800 border-gray-700 hover:border-gray-500" id="card_${e.id}" style="width: 350px;">
                    <a href="#${e.id}">
                        <img class="rounded-t-lg m-auto" src="${e.image_url}" alt="${e.name}" />
                    </a>
                    <div class="p-5">
                        <a href="#" class="text-white hover:text-gray-300">
                            <h5 class="mb-2 text-2xl font-bold tracking-tight">${e.name}</h5>
                        </a>
                        <p class="mb-3 font-normal text-gray-400">${desc}</p>
                        <div class="flex justify-between items-center">
                            <a href="#${e.id}" class="inline-flex items-center py-2 px-3 text-sm font-medium text-center text-white bg-custom-blue rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                                Read more&nbsp;
                                <span class="material-symbols-rounded">arrow_right_alt</span>
                            </a>
                            <small class="text-gray-200">${creator}</small>
                        </div>
                    </div>
                </div>
                `;
    
                container.innerHTML += content;
            }
        });
        if (page != oData.previous) {
            const previous = document.getElementById('previous_pos');
            previous.textContent = oData.previous;
            previous.classList.remove('hidden');
        } else {document.getElementById('previous_pos').classList.add('hidden');}
        document.getElementById('current_pos').textContent = page;
        document.getElementById('next_pos').textContent = oData.next;
        unLoad();
    });
}

function clearCards() {
    const container = document.getElementById('nftCollectionContainer');
    let tDiv = container.querySelectorAll('div');
    for (let div of tDiv) {
        div.remove();
    }
}
function resetFilter(selected) {
    const allBtn = document.getElementById('allBtn');
    const creatorsBtn = document.getElementById('creatorsBtn');
    const salesBtn = document.getElementById('salesBtn');
    const filtersArray = [allBtn, creatorsBtn, salesBtn];
    filtersArray.forEach(e => {
        if (selected == e.getAttribute('id')) e.classList.add('bg-custom-'+e.getAttribute('data-color'));
        else e.classList.remove('bg-custom-'+e.getAttribute('data-color'));
    });
}