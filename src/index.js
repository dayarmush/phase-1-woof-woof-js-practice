//declare global variables
const pupDiv = document.querySelector('#dog-bar')
const displayPup = document.querySelector('#dog-info')
const goodDogBtn = document.querySelector('#good-dog-filter')

//get the dogs from the server
fetch('http://localhost:3000/pups')
.then(resp => resp.json())
.then(dogData => dogData.forEach(renderDog))

// renders the dog to page
function renderDog(dog) {
    const dogSpan = document.createElement('span')
    dogSpan.textContent = dog.name
    pupDiv.appendChild(dogSpan)

    const pupObj = {
        "id": dog.id,
        "name": dog.name,
        "isGoodDog": dog.isGoodDog,
        "image": dog.image
    }
    
    //event listener to display details of clicked dog
    const dogEvent = dogSpan.addEventListener('click', (e) => {

        if (!displayPup.hasChildNodes()) {
                return;
            } 

        const pupImg = document.createElement('img')
        const pupName = document.createElement('h2')
        const pupBtn = document.createElement('button')

        pupBtn.setAttribute('class', 'puppyButton')
            
        pupImg.src = dog.image
        pupName.textContent = dog.name
        pupBtn.textContent = dog.isGoodDog === true? 'Good Dog!': 'Bad Dog!'

        
        displayPup.appendChild(pupImg)
        displayPup.appendChild(pupName)
        displayPup.appendChild(pupBtn)

        //event listener to change good dog/ bad dog and persist
        const puppyButton = document.querySelector('.puppyButton')
        puppyButton.addEventListener('click', () => {
            const pupBtnText = pupBtn.textContent === 'Good Dog!'? pupBtn.textContent = 'Bad Dog!': pupBtn.textContent = 'Good Dog!';
            fetch(`http://localhost:3000/pups/${pupObj.id}`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    'isGoodDog': pupBtnText
                })
            })
        })
    })

}

