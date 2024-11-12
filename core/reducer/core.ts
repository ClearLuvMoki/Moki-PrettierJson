import {useReducer} from "react";

interface State {
    selectedNodeId: string;
}

enum ActionTypeEnum {
    "UpdateSelectNodeId" = 0
}

type ActionType = {
    type: ActionTypeEnum
    payload: number
}
const initState: State = {
    selectedNodeId: ""
}

const reducer = (state: State, action: ActionType) => {
    switch (action.type) {
        case ActionTypeEnum.UpdateSelectNodeId: {
            // TODO
            return state;
        }
    }
}


export const useStore = () => {
    const [state, dispatch] = useReducer(reducer, initState)

    return {
        state,
        dispatch
    }
}