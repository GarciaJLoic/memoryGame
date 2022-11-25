let cardPackSave = { //Paquet de carte d'origine
    coeur: ["As", 2, 3, 4, 5, 6, 7, 8, 9, 10, "Valet", "Dame", "Roi"],
    pique: ["As", 2, 3, 4, 5, 6, 7, 8, 9, 10, "Valet", "Dame", "Roi"],
    carreau: ["As", 2, 3, 4, 5, 6, 7, 8, 9, 10, "Valet", "Dame", "Roi"],
    trèfle: ["As", 2, 3, 4, 5, 6, 7, 8, 9, 10, "Valet", "Dame", "Roi"],

}
let cardPack = JSON.parse(JSON.stringify(cardPackSave)); // Fait une copie de l'objet carParckSave qui pourra être manipuler sans modifier l'objet d'origine
let cardPackShuffle = [] // Nouveau paquet de carte mélangé


//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

const randomNumber = function (max) {
    return Math.floor(Math.random() * max); // function qui génère un chiffre aléatoire entre min et max
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

const cardSeries = function (nbCarte) {

    while (cardPackShuffle.length < nbCarte) { // Un boucle qui génére se répète tant que le nouveau paquet de contient pas le bon nbCarte

        const typeCardPack = Object.keys(cardPack); // Récupère le type de carte (heart, spade, diamond, club)
        let typeCard = randomNumber(typeCardPack.length); // Génére un chiffre qui deviendra le type de carte
        let numCard = randomNumber(cardPack[typeCardPack[typeCard]].length); // Génère un chiffre qui deviendra la valeur de la carte

        while (cardPack[typeCardPack[typeCard]].length === 0) { //Vérifie s'il reste des cartes de la bonne "couleur" (heart, spade, diamond, club)
            delete cardPack[typeCardPack];  // Supprime la couleur si la liste de cette couleur est vide (heart, spade, diamond, club)
            typeCard = randomNumber(typeCardPack.length); // Re-Génére un chiffre qui deviendra le type de carte
            numCard = randomNumber(cardPack[typeCardPack[typeCard]].length); // Re-énère un chiffre qui deviendra la valeur de la carte
        }

        cardPackShuffle.push(cardPack[typeCardPack[typeCard]][numCard] + " de " + typeCardPack[typeCard]); // Ajoute la couleur et la valeur de la carte dans le nouveau paquet de carte
        cardPack[typeCardPack[typeCard]].splice(numCard, 1); // Supprime la carte du paquet d'origine pour ne pas avoir 2 fois la même carte

    }

    alert(cardPackShuffle.join("\n\n")); // Transforme le tableau en une chaine de carractère en mettant 2 retour à la ligne en chaque élément
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

const proposalRandom = function (trueValue, nbAlea) { // Génère des fausses cartes pour le mode easy
    const cardPackForRandom = JSON.parse(JSON.stringify(cardPackSave)); // Fait une copie de l'objet carParckSave qui pourra être manipuler sans modifier l'objet d'origine
    let proposalArray = []; // créer un array
    const typeCardPack = Object.keys(cardPackForRandom); //Récupère le type de carte (heart, spade, diamond, club)

    for (let i = 0; i < 3; i++) {

        const typeCard = randomNumber(typeCardPack.length); // Génére un chiffre qui deviendra le type de carte
        const numCard = randomNumber(cardPackForRandom[typeCardPack[typeCard]].length); // Génère un chiffre qui deviendra la valeur de la carte   

        proposalArray.push(cardPackForRandom[typeCardPack[typeCard]][numCard] + " de " + typeCardPack[typeCard]); // Ajoute la couleur et la valeur de la carte dans le nouveau paquet de carte
    }

    proposalArray[nbAlea] = trueValue; // Place la vraie carte à la place d'une des fausses
    return proposalArray; // retourne le tableau
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

const testAnswers = function (mode) {  // Fonction pour tester les réponses du joueur
    let answer; // Réponse du joueur
    let life = 3; // Compteur de vie
    let currentSerie = 0; // Compteur pour la série actuelle
    let bestSerie = 0; // Compteur pour la meilleure série

    for (let j = 0; j < cardPackShuffle.length; j++) { // Une boucle qui se répète tant qu'il reste des cartes dans le paquet
        if (life > 0) { //Verifie s'il reste des vies
            // MODE HARD
            if (mode === "hard") {
                answer = prompt("carte n°" + (j + 1)); // Affiche la question au joueur
            }
            // MODE EASY
            else if (mode === "easy") {
                const keyAlea = randomNumber(3); // Génère un nombre aléatoire pour définir la place de vraie réponse.
                const propposalArray = proposalRandom(cardPackShuffle[j], keyAlea); // Créer un tableau avec les deux fausses réponses + la vraie
                answer = prompt("EASY MODE carte n°" + (j + 1) + "\n\n Proposition 1 : " + propposalArray[0] + "\n\n Proposition 2 : " + propposalArray[1] + "\n\n Proposition 3 : " + propposalArray[2]); // Affiche la question au joueur avec la vraie carte et deux fausses
            }

            if (cardPackShuffle[j] === answer) { // Vérifie si la réponse est juste
                currentSerie++; // Incrémente la série actuelle
                if (currentSerie > bestSerie) { // Si la série actuelle est supérieure à la meilleure série
                    bestSerie = currentSerie; // On met à jour la meilleure série
                }
                let cardLeft = (cardPackShuffle.length - currentSerie); // Stocke le nombre de cartes restantes
                if (cardLeft === 1) { // S'il ne reste plus qu'une carte
                    alert("Good! Plus qu'une carte à trouver !");
                } else if (cardLeft > 1) { // S'il reste des cartes
                    alert('Good! Plus que : ' + (cardPackShuffle.length - currentSerie) + ' cartes à trouver !');
                }

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
    let restartGame = confirm("Encore une partie ?"); // Demande au joueur s'il veut refaire une partie
    if (restartGame) {
        cardPackShuffle = []; // Vide le paquet mélangé 
        cardPack = JSON.parse(JSON.stringify(cardPackSave)); // Fait une copie de l'objet carParckSave qui pourra être manipuler sans modifier l'objet d'origine
        life = 3; // Remet le compteur de vie à 3
        gameStart(); // Relance le jeu
    }

}
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
const gameStart = function () {
    const messageChoiseNbCard = "Choisissez le nombre de carte, tapez un nombre entre 1 et 52 : "; // Message de la demande du nombre de carte
    const messageChoiseDifficult = "Choisissez la difficulté, tapez : easy OU hard ";// Message de la demande de la difficulté

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
}

gameStart();