/// <reference types="@workadventure/iframe-api-typings" />


// -----  STATE USER ------

// initialisation des données
function _createVariable(){
    WA.player.state.coins = 100
    WA.player.state.nbrParis = 0
    WA.player.state.listParis = []
    console.log("state: %o", WA.player.state);
}

// verify si l'initialisation des données est faite
function IsVariableUser() {
    console.log("verfify : %o ", WA.player.state.coins !== undefined && WA.player.state.nbrParis !== undefined);
    if(WA.player.state.coins !== undefined && WA.player.state.nbrParis !== undefined){
        console.log("Exist variable");
        console.log("state: %o", WA.player.state);
    }
    else{
        _createVariable()
    }
}

// -----  COINS ------

function get_coins() {
    return parseInt(WA.player.state.coins)
}

function _set_coins(coins: number) {
    WA.player.state.coins = coins
    console.log("New Coins: %o", get_coins());
}

// verify si le joueur a assez de coins
function _IsCoins_after_betting(value:number) {
    return (get_coins()- value) < 0 ? false : true
}


// -----  PARIS ------

function get_nbrParis() {
    return WA.player.state.nbrParis
}

// nombre de match win
function get_ParisWin() {
    const tab = WA.player.state.listParis
    const paris_find = tab.filter((paris) => paris.status === "win")
    return paris_find.length
}

// nombre de match lose
function get_ParisLose() {
    const tab = WA.player.state.listParis
    const paris_find = tab.filter((paris) => paris.status === "lose")
    return paris_find.length
}

function _add_nbrParis() {
    return ++WA.player.state.nbrParis
}

// -----  LIST PARIS ------

function get_listParis() {
    return WA.player.state.listParis
}

// Ajouter un paris dans la list de paris
function _push_listParis(newParis:Object) {
    const tab = WA.player.state.listParis
    tab.push(newParis)
    WA.player.state.listParis = tab
}

// Créer un Object paris
function _createVariableParis(value: number, mise: number, cote_match: number){
    const newParis = {
        idMatch: "ID-match2",
        dateTime: new Date(),
        value: value,
        mise: mise,
        cote_match: cote_match,
        status: "actif" //(actif ou win ou lose)
    }
    // console.log("Created variable idParis: %o", newParis);
    _push_listParis(newParis)
    _add_nbrParis()
}

// Parier sur un match
function action_paris(value: number, mise: number, cote_match: number) {
    if(_IsCoins_after_betting(mise)){
        _createVariableParis(value, mise, cote_match)
        var mySound = WA.sound.loadSound("assets/son/sf_sifflet_05.mp3");
        mySound.play();
        WA.chat.sendChatMessage(`I bet ${mise} coins`, WA.player.name);
        _set_coins(get_coins()- mise)
    }
    else {
        console.log("Pas assez de coins");
    }
}

// Trouver un paris selon id du Match
function find_ParisByMatchID(id:string) {
    const tab = WA.player.state.listParis
    const paris_find = tab.filter((paris) => paris.idMatch === id)
    return paris_find[0]
}

// Changer le status d'un paris de la list
function changeStatus_paris(id:string, status:string) {
    // changer status du paris
    const paris = find_ParisByMatchID(id)
    if(paris){
        paris.status = status
        // MaJ list de Paris
        const tab = WA.player.state.listParis
        const paris_find = tab.filter((paris) => paris.idMatch !== id)
        paris_find.push(paris)
        WA.player.state.listParis = paris_find
    }
    else console.log("Not found");

}

// Gestion d'un paris en fonction de son statues
function evaluate_paris(id:string,) {
    const paris = find_ParisByMatchID(id)
    if(paris){
        switch (paris.status) {
            case "finish":
                console.log("finish - no result");
                break;
            case "win":
                console.log("win");
                const solde_win = paris.mise * paris.cote_match
                WA.chat.sendChatMessage(`I win ${solde_win} coins`, WA.player.name);
                var mySound = WA.sound.loadSound("assets/son/563.mp3");
                mySound.play();
                _set_coins(get_coins()+ solde_win)
                break;
            case "lose":
                console.log("Lose");
                break;
            case "actif":
                console.log("no finish");
                break;
            default:
                console.log("autres ???");
                break;
        }
    }
    else console.log("Not found");
}


// Match

// function start_match() {
//     if (getCurrentMatch.match.started)
//     return {
//         label:"betting",
//         className:"normal",
//         callback: () => {
//             action_paris(1,20,2.32)
//         }
//     }
//     else
//     return {
//         label:"betting",
//         className:"disabled",
//         callback: () => {
//             console.log("disabled");
//         }
//     }
// }


export {IsVariableUser, action_paris, get_coins, get_nbrParis, evaluate_paris, changeStatus_paris, start_match, get_ParisWin, get_ParisLose};
