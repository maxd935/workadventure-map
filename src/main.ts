/// <reference types="@workadventure/iframe-api-typings" />

import { bootstrapExtra } from "@workadventure/scripting-api-extra";
import {IsVariableUser, get_coins, evaluate_paris, changeStatus_paris, start_match, get_ParisWin, get_ParisLose, action_paris} from './betting';


console.log('Script started successfully');

let currentPopup: any = undefined;


// Waiting for the API to be ready
WA.onInit().then(async () => {
    console.log('Scripting API ready');
    IsVariableUser()


    await WA.room.onEnterLayer('parisZone').subscribe(async () => {
        // 100 PSG / 83 OM
        const matchObj = await fetch("https://api.foot.kreyzix.com/getOdds/100")
        .then(async (res) => {
            const message = await res.text()
            if(message === "The next match of this team has not started yet."){
                console.log("res %o",message);
            }
            else{
                return JSON.parse(message)
            }
        })

        console.log(matchObj);
        
        // const {win, lose, draw, match_id} = matchObj;
        const win = 1
        const lose = 2
        const draw = 4
        const match_id = "1164"

        

        let value :number;
        let mise :number;

        currentPopup = await WA.ui.openPopup("parisBlock",`What your bet ?`,[ 
            // {
            //     label:"Evaluate",
            //     className:"normal",
            //     callback: () => {
            //         evaluate_paris("ID-match2")
            //     }
            // },
            {
                label:"1",
                className:"success",
                callback: () => {
                    value = 1;
                    currentPopup.close();
                    currentPopup = WA.ui.openPopup("parisBlock",`How much ?`,[ 
                        {
                            label:"10",
                            className:"normal",
                            callback: () => {
                                mise = 10;
                                currentPopup.close();
                                action_paris(match_id, value,mise,win)
                            }
                        },
                        {
                            label:"50",
                            className:"normal",
                            callback: () => {
                                mise = 50;
                                currentPopup.close();
                                action_paris(match_id, value,mise,win)
                            }
                        },
                        {
                            label:"100",
                            className:"normal",
                            callback: () => {
                                mise = 100;
                                currentPopup.close();
                                action_paris(match_id, value,mise,win)
                            }
                        }
                    ])
                }
            },
            {
                label:"2",
                className:"error",
                callback: () => {
                    value = 2;
                    currentPopup.close();
                    currentPopup = WA.ui.openPopup("parisBlock",`How much ?`,[ 
                        {
                            label:"10",
                            className:"normal",
                            callback: () => {
                                mise = 10;
                                currentPopup.close();
                                action_paris(match_id, value,mise,lose)
                            }
                        },
                        {
                            label:"50",
                            className:"normal",
                            callback: () => {
                                mise = 50;
                                currentPopup.close();
                                action_paris(match_id, value,mise,lose)

                            }
                        },
                        {
                            label:"100",
                            className:"normal",
                            callback: () => {
                                mise = 100;
                                currentPopup.close();
                                action_paris(match_id, value,mise,lose)

                            }
                        }
                    ])
                }
            },
            {
                label:"x",
                className:"normal",
                callback: () => {
                    value = 0;
                    currentPopup.close();
                    currentPopup = WA.ui.openPopup("parisBlock",`How much ?`,[ 
                        {
                            label:"10",
                            className:"normal",
                            callback: () => {
                                mise = 10;
                                currentPopup.close();
                                action_paris(match_id, value,mise,draw)

                            }
                        },
                        {
                            label:"50",
                            className:"normal",
                            callback: () => {
                                mise = 50;
                                currentPopup.close();
                                action_paris(match_id, value,mise,draw)

                            }
                        },
                        {
                            label:"100",
                            className:"normal",
                            callback: () => {
                                mise = 100;
                                currentPopup.close();
                                action_paris(match_id, value,mise,draw)
                            }
                        }
                    ])

                }
            }
        ])

    })


    

    await WA.room.onEnterLayer('pointZone').subscribe(() => {
        currentPopup = WA.ui.openPopup("pointPopup",`I have ${get_coins()} coins`,[]);
    })

    await WA.room.onEnterLayer('parisStatZone').subscribe(() => {
        currentPopup = WA.ui.openPopup("parisStatPopup",`win ${get_ParisWin()} - lose ${get_ParisLose()}`,[]);
    })

    WA.room.onLeaveLayer('parisZone').subscribe(closePopUp)
    WA.room.onLeaveLayer('pointZone').subscribe(closePopUp)
    WA.room.onLeaveLayer('parisStatZone').subscribe(closePopUp)

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
