//main div declaration
const main = document.getElementById('main');
const inputBtn = () => {
    const input = document.getElementById('input-value');// input value of Search option
    const error = document.getElementById('error-text');// error messenger id 


    const inputValue = parseInt(input.value);// input-value parseInt 
    
    if(isNaN(inputValue) || inputValue == ""){ // input-value condition 
        error.innerText = "Please gave a number"
        input.value = "";
        main.innerHTML = "";
    }
    else if (inputValue <= 0){
        error.innerText = "Please give a positive number";
        input.value = "";
        main.innerHTML = "";
    }
    else if(inputValue > 52){
        error.innerText = "Has a value less than 52, So give a lower number";
        input.value = "";
        main.innerHTML = "";
    }
    else{
        fetch(`https://deckofcardsapi.com/api/deck/new/draw/?count=${inputValue}`)
          .then(Response => Response.json())
          .then(data => cardsdisplay(data.cards))  

          input.value = "";
          main.innerHTML = "";
          error.innerHTML = "";
    }

}

const cardsdisplay = (cards) => { // card style and show 
        for(const card of cards){
            const div = document.createElement('div');
            div.classList.add("col-lg-4");   
            div.classList.add("mt-4")
            div.classList.add("mb-5")                                  
            div.innerHTML = `
            <div class="card" style="width: 18rem;">
                <img src="${card.image}" class="card-img-top" alt="...">
                <div class="card-body">
                    <h5 class="card-title">${card.code}</h5>
                    <p class="card-text">${card.suit}</p>
                    <p class="card-text">${card.value}</p>
                    <button onclick = "cardDetails('${card.code}')" class="btn btn-primary">See More</button>
                </div>
            </div>
            `
            main.appendChild(div)
        }
       
    }

    const cardDetails = (code) => { //card detals 
       fetch(`https://deckofcardsapi.com/api/deck/new/draw/?count=52`)
          .then(Response => Response.json())
          .then(data => {
            const allCards = (data.cards)
            
            const singleCard = allCards.find(card => card.code === code)
            
            const div = document.createElement('div');
            main.innerHTML = "";
            div.innerHTML = `
            <div class="card" style="width: 18rem;">
                <img src="${singleCard.image}" class="card-img-top" alt="...">
                <div class="card-body">
                    <h5 class="card-title">${singleCard.code}</h5>
                    <p class="card-text">${singleCard.suit}</p>
                    <p class="card-text">${singleCard.value}</p>
                </div>
            </div>
            `
            main.appendChild(div);
        
        })  
    }



