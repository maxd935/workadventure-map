/// <reference types="@workadventure/iframe-api-typings" />

import { bootstrapExtra } from "@workadventure/scripting-api-extra";
import {IsVariableUser, action_paris, get_coins, evaluate_paris, changeStatus_paris, start_match} from './betting';
import match1 from '../getCurrentMatch.json';
import match2 from '../getNextMatch.json';


console.log('Script started successfully');

let currentPopup: any = undefined;

// Waiting for the API to be ready
WA.onInit().then(async () => {
    console.log('Scripting API ready');
    IsVariableUser()


    const buttonParis = start_match()

    const parisBlock =   WA.ui.openPopup("parisBlock",`Do you bet this match ?`,[ 
        buttonParis,
        {
            label:"Evaluate",
            className:"normal",
            callback: () => {
                evaluate_paris("ID-match2")
            }
        },
        {
            label:"Win",
            className:"primary",
            callback: () => {
                changeStatus_paris("ID-match2", "win")
            }
        },
    ]);

    

    WA.room.onEnterLayer('clockZone').subscribe(() => {
        const today = new Date();
        const time = today.getHours() + ":" + today.getMinutes();
        currentPopup = WA.ui.openPopup("clockPopup","It's " + time,[]);
    })

    await WA.room.onEnterLayer('pointZone').subscribe(() => {
        currentPopup = WA.ui.openPopup("pointPopup",`I have ${get_coins()} coins`,[]);
    })

    WA.room.onLeaveLayer('clockZone').subscribe(closePopUp)
    WA.room.onLeaveLayer('pointZone').subscribe(closePopUp)

    // The line below bootstraps the Scripting API Extra library that adds a number of advanced properties/features to WorkAdventure
    bootstrapExtra().then(() => {
        console.log('Scripting API Extra ready');
    }).catch(e => console.error(e));

}).catch(e => console.error(e));

function closePopUp(){
    if (currentPopup !== undefined) {
        currentPopup.close();
        currentPopup = undefined;
    }
}

export {};
