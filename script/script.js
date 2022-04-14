const cards = document.querySelector('#cards');

get_cards = () => JSON.parse(localStorage.getItem('cards')) || [];
add_card = card => localStorage.setItem('cards', JSON.stringify([...get_cards(), card]));
remove_card = card =>{
	const new_card = get_cards().filter(elem =>JSON.stringify(elem)!== JSON.stringify(card));
	localStorage.setItem('cards', JSON.stringify(new_card));
};

 render = (list)=>{
    cards.innerText ='';
    for(let elem of list){
        const card = document.createElement('div');
        const h2Elem = document.createElement('h2');
        const closeElem = document.createElement('div');

        card.append(h2Elem, closeElem);
        cards.appendChild(card);

        card.classList.add('card');
        closeElem.classList.add('close');
        
        closeElem.innerText = '✖';
        h2Elem.innerText = elem.word;
        card.style.backgroundColor = elem.color;

        closeElem.addEventListener('click', () =>{
            remove_card(elem);
            render(get_cards());
        });
        
        card.addEventListener('dblclick', event =>{
            if(h2Elem.innerText == elem.word){
                h2Elem.innerText = elem.translation;
            }else{ 
                h2Elem.innerText = elem.word; 
            }
        });
    };
};

document.forms[0].addEventListener('submit', event =>{
    event.preventDefault();
    const {word, translation, color} = event.target;
    if(word.value !== '' && translation.value !== '' && color.value !== ''){
        add_card({
			word: word.value,
			translation: translation.value,
			color: color.value,
		}); 
    };
    word.value = '';
	translation.value = '';
	color.value = '';
    
	render(get_cards());
});

render(get_cards());

document.forms[1].addEventListener('input', event=>{
        event.preventDefault();
        const value = event.target.value;
        const lst = get_cards().filter(elem => elem.word.startsWith(value));
        render(lst);
    });






