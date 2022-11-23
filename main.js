const cardPack = { //Paquet de carte d'origin
    coeur: ["As", 2, 3, 4, 5, 6, 7, 8, 9, 10, "Valet", "Dame", "Roi"],
    pique: ["As", 2, 3, 4, 5, 6, 7, 8, 9, 10, "Valet", "Dame", "Roi"],
    carreau: ["As", 2, 3, 4, 5, 6, 7, 8, 9, 10, "Valet", "Dame", "Roi"],
    trèfle: ["As", 2, 3, 4, 5, 6, 7, 8, 9, 10, "Valet", "Dame", "Roi"],

}
const cardPackShuffle = [] // Nouveau paquet de carte mélangé

const randomCard = function (min, max) {
    return Math.floor(Math.random() * max) // function qui génère un chiffre aléatoire entre min et max
}


const cardSeries = function (nbCarte) {

    while (cardPackShuffle.length < nbCarte) { // Un boucle qui génére se répète tant que le nouveau paquet de contient pas le bon nbCarte

        const typeCardPack = Object.keys(cardPack) // Génére le type de carte (heart, spade, diamond, club)

        let typeCard = randomCard(1, typeCardPack.length) // Génére un chiffre qui deviendra le type de carte
        let numCard = randomCard(1, cardPack[typeCardPack[typeCard]].length) // Génère un chiffre qui deviendra la valeur de la carte

        if (cardPack[typeCardPack[typeCard]].length === 0) { //S'il ne reste plus de cartes de la bonne "couleur" (heart, spade, diamond, club)
            delete cardPack[typeCardPack]; // Supprime la couleur si la liste de cette couleur est vide (heart, spade, diamond, club)
            typeCard = randomCard(1, typeCardPack.length) // Re-Génére un chiffre qui deviendra le type de carte
            numCard = randomCard(1, cardPack[typeCardPack[typeCard]].length)// Re-énère un chiffre qui deviendra la valeur de la carte
        } else {
            cardPackShuffle.push(cardPack[typeCardPack[typeCard]][numCard] + " de " + typeCardPack[typeCard]) // Ajoute la couleur et la valeur de la carte dans le nouveau paquet de carte
            cardPack[typeCardPack[typeCard]].splice(numCard, 1) // Supprime la carte du paquet d'origine pour ne pas avoir 2 fois la même carte
        }
    }
    /*   for (let i = 0; i < cardPackShuffle.length; i++) { // Une boucle qui se répete tant qu'il reste des cartes dans le nouveau paquet
           console.log(cardPackShuffle[i])  //Affiche chaque carte du nouveau paquet les une après les autres
       }
   */
    alert(cardPackShuffle.join("\n\n")) // Transforme le tableau en une chaine de carractère en mettant 2 retour à la ligne en chaque élément
}
let life = 3; // compteur de vie

const testAnswers = function () {  // Fonction pour tester les réponses du joueur
    for (let j = 0; j < cardPackShuffle.length; j++) { // Une boucle qui se répète tant qu'il reste des cartes dans le paquet
        if (life > 0) { //Verifie s'il reste des vies
            let answer = prompt("carte n°" + (j + 1)) // Affiche la question au joueur
            if (cardPackShuffle[j] === answer) { // Vérifie si la réponse est juste
                alert('Good!');

            } else if (life > 2) { // Si la réponse est fausse et qu'il reste moins de 2 vie.
                life-- //Retire une vie
                alert('FAUX, il te reste : ' + life + " vies")
                testAnswers() // Relance le test pour repartir à la question 1 

            }
            else if (life > 1) { // Si la réponse est fausse et qu'il reste moins de 1 vie.
                life-- //Retire une vie
                alert("Dernière chance")
                testAnswers() // Relance le test pour repartir à la question 1 

            } else { // Sinon c'est que la partie est perdue
                life = 0
                alert("TU as perdu !")
                break // Termine la boucle
            }
        }
    }
    if (life > 0) {  //S'il reste des vies à la fin de la boucle c'est que c'est gagné

        alert("GG ! Tu as gagné !")
    }
}
cardSeries(2)
testAnswers()
