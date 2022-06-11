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
        // const matchObj = fetch("http://51.158.122.33:8080/getOdds/100")
        // .then((res) => {
        //     console.log(res.json());
        //     // return res.json()
        // })
        let value :number;
        let mise :number;

        const currentPopup1 = await WA.ui.openPopup("parisBlock",`What your bet ?`,[ 
            // {
            //     label:"Evaluate",
            //     className:"normal",
            //     callback: () => {
            //         evaluate_paris("ID-match2")
            //     }
            // },
            {
                label:"Win",
                className:"success",
                callback: () => {
                    value = 1;
                    currentPopup1.close();
                    const currentPopup2 = WA.ui.openPopup("parisBlock",`How much ?`,[ 
                        {
                            label:"10",
                            className:"normal",
                            callback: () => {
                                mise = 10;
                                currentPopup2.close();
                                action_paris(value,mise,2.32)
                            }
                        },
                        {
                            label:"50",
                            className:"normal",
                            callback: () => {
                                mise = 50;
                                currentPopup2.close();
                                action_paris(value,mise,2.32)
                            }
                        },
                        {
                            label:"100",
                            className:"normal",
                            callback: () => {
                                mise = 100;
                                currentPopup2.close();
                                action_paris(value,mise,2.32)
                            }
                        }
                    ])
                }
            },
            {
                label:"Lose",
                className:"error",
                callback: () => {
                    value = 2;
                    currentPopup1.close();
                    const currentPopup2 = WA.ui.openPopup("parisBlock",`How much ?`,[ 
                        {
                            label:"10",
                            className:"normal",
                            callback: () => {
                                mise = 10;
                                currentPopup2.close();
                                action_paris(value,mise,2.32)
                            }
                        },
                        {
                            label:"50",
                            className:"normal",
                            callback: () => {
                                mise = 50;
                                currentPopup2.close();
                                action_paris(value,mise,2.32)

                            }
                        },
                        {
                            label:"100",
                            className:"normal",
                            callback: () => {
                                mise = 100;
                                currentPopup2.close();
                                action_paris(value,mise,2.32)

                            }
                        }
                    ])
                }
            },
            {
                label:"Draw",
                className:"normal",
                callback: () => {
                    value = 0;
                    currentPopup1.close();
                    const currentPopup2 = WA.ui.openPopup("parisBlock",`How much ?`,[ 
                        {
                            label:"10",
                            className:"normal",
                            callback: () => {
                                mise = 10;
                                currentPopup2.close();
                                action_paris(value,mise,2.32)

                            }
                        },
                        {
                            label:"50",
                            className:"normal",
                            callback: () => {
                                mise = 50;
                                currentPopup2.close();
                                action_paris(value,mise,2.32)

                            }
                        },
                        {
                            label:"100",
                            className:"normal",
                            callback: () => {
                                mise = 100;
                                currentPopup2.close();
                                action_paris(value,mise,2.32)
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
