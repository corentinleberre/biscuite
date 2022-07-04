import { useEffect, useState } from "react";
import { Action } from "../../common/model/action.model";

function GameCard(props: { action: Action}){

    return  (
        <div className="bg-white w-5/6 rounded-lg drop-shadow-2xl p-2 m-1 md:w-1/3">
            <p className="m-2 text-xl font-medium text-center">{props.action.label}</p>
        </div>
    );
}

export default GameCard;