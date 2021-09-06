import nerdamer from'nerdamer/nerdamer.core.js';
import { null_to_empty } from 'svelte/internal';
import { getVariables } from './variableClass';

const equationStates = ['empty','no = present','equation viable','missing variables','oversaturated explicit variables','solved'];

export class Equation{
    constructor(inputStr = "",valid = false,varNames = [],ndPtr=null_to_empty,statusIndex = 0){
        this.eqStr = inputStr;
        this.isValid = valid;
        this.varNames = varNames;
        this.ndPtr = ndPtr;
        this.statusIndex = statusIndex;
    }
    
    setNewEquationStr(eqStr = this.eqStr){
        this.eqStr = eqStr;
        this.isValid = eqStringValid(this.eqStr);
        this.varNames = getVariables(this.eqStr);
        if(this.isValid){this.statusIndex = 2;}
        else this.statusIndex = getStatusIndexFromString(eqStr);
    }
}

export function eqStringValid(inputString){
    return 2==getStatusIndexFromString(inputString);
}

export function getStatusIndexFromString(str){
    if(str == ""){
        return 0;
    }
    if(str.indexOf('=')<=0 || str.indexOf('=') == str.length-1)return 1;
    return 2;

}