(async ()=>{
  const menuBtn = document.getElementById('menu-cta');
  const menu = document.getElementById('menu');
  menuBtn?.addEventListener('click', ()=>{
    menuBtn.querySelectorAll('svg')?.forEach((svg)=>{
      svg.classList.toggle('active');
    });
    menu?.classList.toggle('active');
  });
})();

(async ()=>{
  const form = document.getElementById('newsletter');
  const label = form?.querySelector('label');
  const input = form?.querySelector('input');
  const error = form?.querySelector('#error');
  const success = form?.querySelector('#success');
  const mailformat = /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
  const activeLabel = () => {
    label?.style.setProperty('top', '-25px');
    label?.style.setProperty('left', '-5px');
    label?.style.setProperty('transform', 'scale(80%)');
  };
  const inactiveLabel = () => {
    label?.removeAttribute('style');
  };
  const activeError = () => {
    error?.classList.remove("hidden");
    error?.classList.add("block");
  };
  const inactiveError = () => {
    error.textContent = "";
    error?.classList.add("hidden");
    error?.classList.remove("block");
  };
  const activeSuccess = () => {
    success?.classList.remove("hidden");
    success?.classList.add("block");
  };
  const inactiveSuccess = () => {
    success.textContent = "";
    success?.classList.add("hidden");
    success?.classList.remove("block");
  };
  const activeErrorInput = () => {
    input?.classList.remove("border-transparent");
    input?.classList.add("border-rose-600");
  };
  const activeSuccessInput = () => {
    input?.classList.remove("border-transparent");
    input?.classList.add("border-lime-600");
  };
  const inactiveInput = () => {
    input?.classList.add("border-transparent");
    input?.classList.remove("border-rose-600");
    input?.classList.remove("border-lime-600");
  };
  if (input.value.trim().length > 0) {
    activeLabel();
  }
  input?.addEventListener('input', ()=>{
    inactiveError();
    inactiveSuccess();
    inactiveInput();
    if (input.value.trim().length > 0) {
      activeLabel();
    } else {
      inactiveLabel();
    }
  });
  form?.addEventListener('submit', (e)=>{
    e.preventDefault();
    if (input.value.trim().length == 0) {
      error.textContent = "Your e-mail is empty.";
      activeError();
      activeErrorInput();
    } else if (input.value.trim().length > 0 && !input.value.match(mailformat)) {
      error.textContent = "Your e-mail is wrong.";
      activeError();
      activeErrorInput();
    } else {
      success.textContent = "Your e-mail is subscribed !"
      success?.classList.remove("hidden");
      success?.classList.add("block");
      activeSuccess();
      activeSuccessInput();
    }
  });
})();

(async function getNFTs() {
  if (!localStorage.getItem("NFTs")) {
    const response = await fetch('https://awesome-nft-app.herokuapp.com/');
    const data = await response.json();
    localStorage.setItem("NFTs", JSON.stringify(data));
  }

  const NFTs = JSON.parse(localStorage.getItem("NFTs"));
  const { assets } = NFTs;
  assets.sort((a,b) => {
    // return Date(a.contract.created_at) - Date(b.contract.created_at);
    // Sort by date but the date of creation is the same for all NFTs so sort by ID
    return a.id - b.id;
  });
  const fakeCards = document.querySelectorAll('.fake-card__wrapper');
  assets.forEach((NFT, index) => {
    if (index > 2) return;
    const desc = (NFT.description.length > 53 ? NFT.description.slice(0, 50).padEnd(53, '...') : NFT.description);
    const creator = (NFT.creator.username.length > 0 ? `By <strong>${NFT.creator.username}</strong>` : "");
    fakeCards[index].innerHTML  = `
    <div class="flex flex-wrap gap-3 w-full h-full rounded-lg border bg-gray-800 border-gray-700 hover:border-gray-500" id="card_${NFT.id}">
        <a class="w-full h-max" href="#${NFT.id}">
            <img class="rounded-t-lg w-full" src="${NFT.image_url}" alt="${NFT.name}" />
        </a>
        <div class="self-start flex flex-wrap gap-3 p-5 h-1/3">
            <a href="#${NFT.id}" class="text-white hover:text-gray-300">
                <h5 class="mb-2 text-2xl font-bold tracking-tight">${NFT.name}</h5>
            </a>
            <p class="font-normal text-gray-400">${desc}</p>
            <div class="mt-auto flex justify-between items-center flex-wrap gap-2">
                <a href="#${NFT.id}" class="inline-flex items-center py-2 px-3 text-sm font-medium text-center text-white bg-custom-blue rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                  Read more&nbsp;
                  <span class="material-symbols-rounded">arrow_right_alt</span>
                </a>
                <small class="text-gray-200">${creator}</small>
            </div>
        </div>
    </div>
    `;
  })
})();