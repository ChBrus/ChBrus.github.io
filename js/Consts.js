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
            "https://images.nationalgeographic.org/image/upload/t_edhub_resource_key_image/v1638886283/EducationHub/photos/landfill.jpg",
            "https://dailynews.co.tz/wp-content/uploads/2023/07/environmental-pollution.jpg"
        ]
    },
    {
        name: "Friendship",
        images: [
            "https://media.npr.org/assets/img/2020/02/20/friendship-1_custom-7ac296535e581ded256a9c640d8d44f194e39d7e-s1100-c50.jpg",
            "https://nie-images.s3.amazonaws.com/gall_content/2017/1/2017_1$ugcphoto102_Monday_2017_201448774.jpg"
        ]
    },
    {
        name: "English course",
        images: [
            "https://assets.entrepreneur.com/content/3x2/2000/1658431270-294227200-5929585060418947-5380176751164151813-ncopy.jpg",
            "https://conexion360.mx/wp-content/uploads/2019/01/FOTO-WEB-HARMON-HALL-LOGO.jpg"
        ]
    },
    {
        name: "Nuclear bomb",
        images: [
            "https://as1.ftcdn.net/v2/jpg/01/52/04/14/1000_F_152041470_N8HPKU3Xp5vHromXNN4hBGEvrBtjmOp0.jpg",
            "https://www.nixonfoundation.org/wp-content/uploads/2022/07/419A6142-scaled.jpg"
        ]
    },
    {
        name: "University",
        images: [
            "https://upload.wikimedia.org/wikipedia/commons/6/6b/Explanada_dv.jpg",
            "https://www.uanl.mx/wp-content/uploads/2018/09/85-aniversario-uanl-torre-rectoria.jpg",
            "https://inmobiliare.com/himalaya/wp-content/uploads/2023/05/Ciudad-Universitaria-BUAP-ALT-scaled.jpg",
            "https://a.cdn-hotels.com/gdcs/production4/d1389/9fca4b00-708b-11e8-8a0f-0242ac11000c.jpg?impolicy=fcrop&w=800&h=533&q=medium"
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