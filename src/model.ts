export interface Action {
    dices?: Array<number>;
    sum?: number;
    label: string;
    drink: boolean;
}
  
export interface Result {
    dices: Array<number>;
    actions: Array<Action>;
}
  