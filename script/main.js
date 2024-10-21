const inputLettre = document.getElementById('lettre');
const alphabet = 'abcdefghijklmnopqrstuvwxyz';
let lettre =""
let erreurs_commises = 0;
let erreurs_autorisees = 7;


function demanderLettre(){
    lettre = " ";
    while(!alphabet.includes(lettre) || lettre.length>1){
        lettre = prompt('choisissez une lettre');
    }
    return lettre
}

function lancerjeu(){
    // je défini mon mot à trouver de manière aléatoire dans la liste wordsArray
    let alea = Math.floor(Math.random() * wordsArray.length);
    let mot_a_trouver = wordsArray[alea];
    let longueur = mot_a_trouver.length;
    // je créé le mot trouvé par l'utilisateur :
    let mot_trouve = '-'.repeat(longueur);
    console.log('mot à trouver', mot_a_trouver);
    // lettre = prompt('choisissez une lettre');
    
    lettre = demanderLettre();
    
    
    while(mot_a_trouver != mot_trouve && erreurs_commises < erreurs_autorisees){
        if(mot_a_trouver.includes(lettre)){
            let nouveauMotTrouve =""
            for(let i = 0 ; i < mot_a_trouver.length ; i++){
                if(mot_a_trouver[i] === lettre){
                    nouveauMotTrouve +=lettre;
                }else{
                    if(mot_trouve[i] === '-'){
                        nouveauMotTrouve += '-';
                    }else{
                        
                        nouveauMotTrouve += mot_trouve[i];
                    }
                }
            }
            mot_trouve = nouveauMotTrouve;
            
            
            console.log(mot_trouve);
            
        } else {
            erreurs_commises++;
            
        }
        lettre = demanderLettre();
        console.log('erreurs', erreurs_commises);
        
    }
console.log('sortie');

}

 lancerjeu();