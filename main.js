const cardPack = { //Paquet de carte d'origin
    coeur: ["As", 2, 3, 4, 5, 6, 7, 8, 9, 10, "Valet", "Dame", "Roi"],
    pique: ["As", 2, 3, 4, 5, 6, 7, 8, 9, 10, "Valet", "Dame", "Roi"],
    carreau: ["As", 2, 3, 4, 5, 6, 7, 8, 9, 10, "Valet", "Dame", "Roi"],
    trèfle: ["As", 2, 3, 4, 5, 6, 7, 8, 9, 10, "Valet", "Dame", "Roi"],

}
const cardPackShuffle = [] // Nouveau paquet de carte mélangé

const randomNumber = function (min, max) {
    return Math.floor(Math.random() * max); // function qui génère un chiffre aléatoire entre min et max
}


const cardSeries = function (nbCarte) {

    while (cardPackShuffle.length < nbCarte) { // Un boucle qui génére se répète tant que le nouveau paquet de contient pas le bon nbCarte

        const typeCardPack = Object.keys(cardPack); // Récupère le type de carte (heart, spade, diamond, club)

        let typeCard = randomNumber(1, typeCardPack.length); // Génére un chiffre qui deviendra le type de carte
        let numCard = randomNumber(1, cardPack[typeCardPack[typeCard]].length); // Génère un chiffre qui deviendra la valeur de la carte

        if (cardPack[typeCardPack[typeCard]].length === 0) { //S'il ne reste plus de cartes de la bonne "couleur" (heart, spade, diamond, club)
            delete cardPack[typeCardPack];  // Supprime la couleur si la liste de cette couleur est vide (heart, spade, diamond, club)
            typeCard = randomNumber(1, typeCardPack.length); // Re-Génére un chiffre qui deviendra le type de carte
            numCard = randomNumber(1, cardPack[typeCardPack[typeCard]].length); // Re-énère un chiffre qui deviendra la valeur de la carte
        } else {
            cardPackShuffle.push(cardPack[typeCardPack[typeCard]][numCard] + " de " + typeCardPack[typeCard]); // Ajoute la couleur et la valeur de la carte dans le nouveau paquet de carte
            cardPack[typeCardPack[typeCard]].splice(numCard, 1); // Supprime la carte du paquet d'origine pour ne pas avoir 2 fois la même carte
        }
    }


    alert(cardPackShuffle.join("\n\n")); // Transforme le tableau en une chaine de carractère en mettant 2 retour à la ligne en chaque élément
}

const proposalRandom = function (trueValue) { // Génère des fausses cartes pour le mode easy
    const proposalArray = []; // créer un array
    const typeCardPack = Object.keys(cardPack); //Récupère le type de carte (heart, spade, diamond, club)
    for (let i = 0; i < 2; i++) {
        let typeCard = randomNumber(1, typeCardPack.length); // Génére un chiffre qui deviendra le type de carte
        let numCard = randomNumber(1, cardPack[typeCardPack[typeCard]].length); // Génère un chiffre qui deviendra la valeur de la carte      
        proposalArray.push(cardPack[typeCardPack[typeCard]][numCard] + " de " + typeCardPack[typeCard]); // Ajoute la couleur et la valeur de la carte dans le nouveau paquet de carte
    }
    proposalArray.push(trueValue); // ajoute la vraie carte
    return proposalArray; // retourne le tableau
}


let life = 3; // compteur de vie

const testAnswers = function (mode) {  // Fonction pour tester les réponses du joueur
    let answer = "";
    let currentSerie = 0; // Compteur pour la série actuelle
    let bestSerie = 0; // Compteur pour la meilleure série
    for (let j = 0; j < cardPackShuffle.length; j++) { // Une boucle qui se répète tant qu'il reste des cartes dans le paquet
        if (life > 0) { //Verifie s'il reste des vies
            if (mode === "hard") {
                answer = prompt("carte n°" + (j + 1)); // Affiche la question au joueur
            }
            else if (mode === "easy") {
                let keyAlea = randomNumber(1, 3); // Génère un nombre aléatoire pour définir la place de vraie réponse.
                let propposalArray = proposalRandom(cardPackShuffle[j]); // Créer un tableau avec les deux fausses réponses + la vraie
                if (keyAlea === 1) {
                    answer = prompt("EASY MODE carte n°" + (j + 1) + "\n\n Proposition 1 : " + propposalArray[2] + "\n\n Proposition 2 : " + propposalArray[0] + "\n\n Proposition 3 : " + propposalArray[1]); // Affiche la question au joueur avec la vraie carte en 1ère position
                } else if (keyAlea === 2) {
                    answer = prompt("EASY MODE carte n°" + (j + 1) + "\n\n Proposition 1 : " + propposalArray[0] + "\n\n Proposition 2 : " + propposalArray[2] + "\n\n Proposition 3 : " + propposalArray[1]); // Affiche la question au joueur avec la vraie carte en 2ème position
                } else {

                    answer = prompt("EASY MODE carte n°" + (j + 1) + "\n\n Proposition 1 : " + propposalArray[0] + "\n\n Proposition 2 : " + propposalArray[1] + "\n\n Proposition 3 : " + propposalArray[2]); // Affiche la question au joueuravec la vraie carte en 3ème position
                }

            }
            if (cardPackShuffle[j] === answer) { // Vérifie si la réponse est juste
                currentSerie++; // Incrémente la série actuelle
                if (currentSerie > bestSerie) { // Si la série actuelle est supérieure à la meilleure série
                    bestSerie = currentSerie; // On met à jour la meilleure série
                }
                alert('Good!');

            } else if (life > 2) { // Si la réponse est fausse et qu'il reste moins de 2 vie.
                life--; //Retire une vie
                currentSerie = 0;  // Remet la série actuelle à 0 
                alert('FAUX, il te reste : ' + life + " vies");
                j = -1; // Remet la boucle for à zéro pour à la question 1 
            }
            else if (life > 1) { // Si la réponse est fausse et qu'il reste moins de 1 vie.
                life--; //Retire une vie
                currentSerie = 0;  // Remet la série actuelle à 0
                alert("Dernière chance");
                j = -1; // Remet la boucle for à zéro pour à la question 1 


            } else { // Sinon c'est que la partie est perdue
                life = 0;
                if (bestSerie <= 1) { // Si la meilleur série est inférieur ou égale à 1
                    alert("Tu as perdu !\nMais ne te décourage pas et retente ta chance");
                }
                else if (bestSerie === (cardPackShuffle.length - 1)) { // S'il ne restait qu'une carte a trouvé
                    alert("Tu as perdu !\nMais ne te décourage pas il ne te restait qu'une seule carte à trouver !");

                } else if (bestSerie > (cardPackShuffle.length) / 2) { // Si plus de la moitié du paquet a été trouvé
                    alert("Tu as perdu !\nMais ne te décourage pas il ne te manquait que : " + (cardPackShuffle.length - bestSerie) + "carte(s) à trouver!");
                }
                else { // Si non affiche la meilleure série
                    alert("Tu as perdu !\nMais ne te décourage pas tu as réussi une série de : " + bestSerie + "cartes !");
                }
                break // Termine la boucle
            }
        }

    }
    if (life > 0) {  //S'il reste des vies à la fin de la boucle c'est que c'est gagné.

        alert("GG ! Tu as gagné !");
    }
}

const messageChoiseNbCard = "Choisissez le nombre de carte, tapez un nombre entre 1 et 52 : ";
const messageChoiseDifficult = "Choisissez la difficulté, tapez : easy OU hard ";

let choiseNbCard = parseInt(prompt(messageChoiseNbCard)); // Demande à l'utilisateur de choisir le nombre de carte à générer

while ((Number.isInteger(choiseNbCard) === false || choiseNbCard < 1 || choiseNbCard > 52)) { // Une boucle qui recommence tant que ce que l'utilisateur à taper n'est pas un nombre OU est inférieur à 1 OU est supérieur à 52

    choiseNbCard = parseInt(prompt("ERREUR ! " + messageChoiseNbCard)); // Re-demande à l'utilisateur de choisir le nombre de carte à générer
}
let choiseDifficult = prompt(messageChoiseDifficult); // Demande à l'utilisateur de choisir la difficulté
while (choiseDifficult !== "easy" && choiseDifficult !== "hard") { // Une boucle qui recommence tant que ce que l'utilisateur à taper est différent de easy ou hard
    choiseDifficult = prompt("ERREUR ! " + messageChoiseDifficult); //Re-demande à l'utilisateur de choisir la difficulté
}

alert("Have fun !");
cardSeries(choiseNbCard); // Génère le paquet de carte
testAnswers(choiseDifficult); // Lance le questionnaire 

