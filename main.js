let resultCards = document.querySelector(".result__cards");
let resultText = document.querySelector(".result__about");

document.querySelector(".form__submit").addEventListener("click", () => {
    resultText.classList.add("hidden");

    let text = document.querySelector(".form__input").value;

    text = text.trim().toLowerCase();

    let xhr = new XMLHttpRequest();

    let url = `https://www.themealdb.com/api/json/v1/1/search.php?s=${text}`;

    xhr.open("GET", url, true);

    xhr.send();

    xhr.onreadystatechange = state => {
        if (event.target.readyState === 4) {
            console.log("Load!");
            let res = state.target.response;
            res = JSON.parse(res);
            if (res.meals != null) {
                addCards(res);
            } else {
                alert("Блюдо не найдено!");
            };
        };
    };
});

function addCards(response) {
    resultCards.innerHTML = "";
    response = response.meals;
    response.map(num => {
        let img = document.createElement("img");
        img.className = `result__card`;
        img.src = `${num.strMealThumb}`;
        img.onclick = aboutCard;
        img.setAttribute("instructions", num.strInstructions);
        img.setAttribute("title", num.strMeal);
        img.setAttribute("youtube", num.strYoutube);
        resultCards.appendChild(img);
    });
};

function aboutCard(event) {
    resultText.classList.remove("hidden");
    resultText.innerHTML = ``;

    let img = document.createElement("img");
    img.src = event.target.getAttribute("src");
    img.className = "result__card";
    
    let instructions = document.createElement("div");
    instructions.innerHTML = event.target.getAttribute("instructions");

    let title = document.createElement("div");
    title.innerHTML = event.target.getAttribute("title");
    title.className = `result__title`;

    let youtubeText = event.target.getAttribute("youtube");


    resultText.appendChild(img);
    resultText.appendChild(title);
    resultText.appendChild(instructions);
    if (youtubeText != "") {
        let youtube = document.createElement("a");
        youtube.textContent = `View the cooking process`;
        youtube.href = youtubeText;
        youtube.className = `result__youtube-link`;
        resultText.appendChild(document.createElement("br"));
        resultText.appendChild(youtube);
        console.log(youtubeText);
    };
    
}

