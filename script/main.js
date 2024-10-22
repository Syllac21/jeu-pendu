const clickButton = document.getElementById("demarrer");
const inputLettre = document.getElementById('lettre');
const lblLettre =  document.getElementById('lblLettre');
const zoneDeJeu = document.getElementById('zoneJeu');
const Message = document.getElementById('Message');
const imagePendu = document.getElementById('imagePendu');
const buttonQuitter = document.getElementById('quitter');
const zoneFin = document.getElementById('zoneFin');
const afficheLettreUtilisee = document.getElementById('lettresUtilisees');
const motTrouve = document.getElementById('motTrouve');

const alphabet = 'abcdefghijklmnopqrstuvwxyz';
let lettre ="";
let erreurs_commises = 0;
let erreurs_autorisees = 6;
let lettresUtilisees = [];
let mot_a_trouver = "";
let mot_trouve = "";
let nbCoup = 0;
let listeResultats = [];

let divErreur = document.createElement('div');
divErreur.innerHTML = 'on attend une lettre';


function init(){
    // je défini mon mot à trouver de manière aléatoire dans la liste wordsArray
    let alea = Math.floor(Math.random() * wordsArray.length);
    mot_a_trouver = wordsArray[alea];
    mot_trouve = "";
    mot_trouve = '-'.repeat(mot_a_trouver.length);
    inputLettre.innerHTML = "";
    lettresUtilisees = [];
    erreurs_commises = 0;
    imagePendu.src = `/images/pendu${7-erreurs_commises}.png`;
    Message.innerHTML = "";
    motTrouve.innerHTML = mot_trouve;
    afficheLettreUtilisee.innerHTML = "";
}

function finJeu(resultat){
    zoneDeJeu.classList.add('hidden');
    clickButton.classList.remove('hidden');
    buttonQuitter.classList.remove('hidden');
    if(resultat){
        Message.innerHTML = `Vous avez gagné en ${erreurs_autorisees-erreurs_commises+1} coups`;
    }else{
        Message.innerHTML = `Vous avez perdu en ${erreurs_autorisees-erreurs_commises+1} coups`;
    }
    listeResultats.push(erreurs_autorisees-erreurs_commises+1);
}
function lancerjeu(){
    // je créé le mot trouvé par l'utilisateur :
    
    console.log('mot à trouver', mot_a_trouver);

    // Boucle du jeu
    if(verifierLettre(lettre)){
        nouveauMot = "";
        if(mot_a_trouver.includes(lettre)){
            for(let i = 0 ; i < mot_a_trouver.length ; i++){
                
                if(mot_a_trouver[i] === lettre){
                    nouveauMot += lettre;
                }else{
                    
                    nouveauMot += mot_trouve[i];
                }
            }
            mot_trouve = nouveauMot;
            motTrouve.innerHTML = mot_trouve;
            inputLettre.value = "";
        }else{
            erreurs_commises++;
            imagePendu.src = `/images/pendu${7-erreurs_commises}.png`;
            inputLettre.value = "";
        }
        nbCoup++;
    }

    // Condition victoire
    if(mot_a_trouver === mot_trouve){
        finJeu(true);
    // Condition défaite
    }else if(erreurs_commises>erreurs_autorisees){
        finJeu(false);
    }

}



function verifierLettre(lettre){
    Message.innerHTML = "";
    if(lettresUtilisees.includes(lettre)){
        Message.innerHTML = 'vous avez déjà utilisé cette lettre';
        inputLettre.value ="";
        return false;
    }else if(!alphabet.includes(lettre)){
        Message.innerHTML = 'veuillez saisir une lettre';
        inputLettre.value = "";
        return false;
    }else {
        lettresUtilisees.push(lettre);
        afficheLettreUtilisee.innerHTML = `Voici les lettres déjà utilisées : ${lettresUtilisees}`;
        return true;
    }
}

const onClickDemarrer = clickButton.addEventListener('click', ()=>{
    clickButton.classList.add('hidden');
    buttonQuitter.classList.add('hidden');
    zoneDeJeu.classList.remove('hidden');
    init();
})

const onChangeInput = inputLettre.addEventListener('input' , ()=>{
    lettre = inputLettre.value;
    lancerjeu();
})

const clickQuitter = buttonQuitter.addEventListener('click' , ()=>{
    buttonQuitter.classList.add('hidden');
    clickButton.classList.add('hidden');
    zoneFin.classList.remove('hidden');
    afficheLettreUtilisee.innerHTML = "";
    let somme= 0;
    Message.innerHTML = "";
    for(i=0 ; i<listeResultats.length ; i++){
        
        somme += listeResultats[i];
    }
    zoneFin.innerHTML =`Vous avez eu une moyenne de  ${Math.floor(somme/(listeResultats.length))} avec un score minimum de ${Math.floor(...listeResultats)} coups et un score minimum ${Math.floor(...listeResultats)} coups`;
})
