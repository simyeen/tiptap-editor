export enum ActionTypes {
  ADD_ITEM = 'ADD_ITEM',
  REMOVE_ITEM = 'REMOVE_ITEM',
}

export type Action =
  | {type: ActionTypes.ADD_ITEM; payload: string}
  | {type: ActionTypes.REMOVE_ITEM; payload: string};

export function selectedItemsReducer(state: string[], action: Action): string[] {
  switch (action.type) {
    case ActionTypes.ADD_ITEM:
      return [...state, action.payload];
    case ActionTypes.REMOVE_ITEM:
      return state.filter((item) => item !== action.payload);
    default:
      return state;
  }
}
