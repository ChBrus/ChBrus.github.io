const ahorcado = document.querySelector(".ahorcado img"),
      wordguess = document.querySelector(".wordguess"),
      validator = document.querySelector(".validator"),
      letter = document.querySelector(".letter"),
      clue = document.querySelector(".clue"),
      cluesImages = document.querySelector(".cluesImages");

const wordKey = [
    {
        name: "Industrial revolution",
        images: [
            "https://www.worldhistory.org/img/r/p/500x600/17015.png?v=1678665309",
            "https://eurotransis.com/wp-content/uploads/2020/06/La-Revoluci%C3%B3n-Industrial.jpg"
        ]
    },
    {
        name: "Environmental pollution",
        images: [
            "https://ofs-cdn.italki.com/u/7658943/galaxy/post/bv497te4qv0f7nu87j00_680,fit.jpg",
            "https://images.nationalgeographic.org/image/upload/t_edhub_resource_key_image/v1638886283/EducationHub/photos/landfill.jpg"
        ]
    },
]

const ahorcadoImg = [
    "./img/Ahorcado.png",
    "./img/Ahorcado_mistake1.png",
    "./img/Ahorcado_mistake2.png",
    "./img/Ahorcado_mistake3.png",
    "./img/Ahorcado_mistake4.png",
    "./img/Ahorcado_mistake5.png",
    "./img/Ahorcado_mistake6.png",
]

function wordKeyNameToUpperCase(wordKeyIndex) {
    return wordKeyIndex.name.toUpperCase();
}