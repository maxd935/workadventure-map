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
        // const matchObj = await fetch("https://api.foot.kreyzix.com/getOdds/100")
        // .then((res) => {
        //     console.log("res %o",res);
        //     console.log("res.json %o",res.json());
        //     // return res.json()
        // }).then((data) => {
        //     console.log("res %o",data);
        //     // return res.json()
        // })
        // console.log("matchObj %o",matchObj);

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
                label:"Win",
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
                                action_paris(value,mise,2.32)
                            }
                        },
                        {
                            label:"50",
                            className:"normal",
                            callback: () => {
                                mise = 50;
                                currentPopup.close();
                                action_paris(value,mise,2.32)
                            }
                        },
                        {
                            label:"100",
                            className:"normal",
                            callback: () => {
                                mise = 100;
                                currentPopup.close();
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
                    currentPopup.close();
                    const currentPopup = WA.ui.openPopup("parisBlock",`How much ?`,[
                        {
                            label:"10",
                            className:"normal",
                            callback: () => {
                                mise = 10;
                                currentPopup.close();
                                action_paris(value,mise,2.32)
                            }
                        },
                        {
                            label:"50",
                            className:"normal",
                            callback: () => {
                                mise = 50;
                                currentPopup.close();
                                action_paris(value,mise,2.32)

                            }
                        },
                        {
                            label:"100",
                            className:"normal",
                            callback: () => {
                                mise = 100;
                                currentPopup.close();
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
                    currentPopup.close();
                    const currentPopup = WA.ui.openPopup("parisBlock",`How much ?`,[
                        {
                            label:"10",
                            className:"normal",
                            callback: () => {
                                mise = 10;
                                currentPopup.close();
                                action_paris(value,mise,2.32)

                            }
                        },
                        {
                            label:"50",
                            className:"normal",
                            callback: () => {
                                mise = 50;
                                currentPopup.close();
                                action_paris(value,mise,2.32)

                            }
                        },
                        {
                            label:"100",
                            className:"normal",
                            callback: () => {
                                mise = 100;
                                currentPopup.close();
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
