const cards = document.querySelectorAll('.memory-card');

let hasFlippedCard = false;
let firstCard, secondCard;


function flipCard(){
    this.classList.add('flip');  //ads class flip when clicked

    if (!hasFlippedCard) {
        //first time clicking a card 
        hasFlippedCard = true;
        firstCard = this;

        // console.log({hasFlippedCard, firstCard});
    }else{
        //the second click
        hasFlippedCard = false;
        // secondCard = this.childNodes[1].alt; this is how we get the alt of each backphoto
        secondCard = this;
        // console.log({firstCard, secondCard});
        
        //check if cards match
        if(firstCard.childNodes[1].alt === secondCard.childNodes[1].alt){
           
            //remove clicking again if they match
            firstCard.removeEventListener('click', flipCard);
            secondCard.removeEventListener('click', flipCard);
           
            console.log("MATCH !!!!!!");
        }else{
            //not a match
            
            setTimeout(() => {  //timeout to see the back 
                //if not a match flip the cards back
                firstCard.classList.remove('flip'); 
                secondCard.classList.remove('flip');
            },300);
        }


    }
}
cards.forEach(card => card.addEventListener('click', flipCard));
