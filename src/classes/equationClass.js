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
        //this.unknowns = -1; /currently replaced with just varNames.length since they are same
    }
    
    setNewEquationStr(eqStr = this.eqStr){
        this.eqStr = eqStr;
        this.isValid = eqStringValid(this.eqStr);
        this.varNames = getVariables(this.eqStr);
        if(this.isValid){this.statusIndex = 2;}
        else this.statusIndex = getStatusIndexFromString(eqStr);
    }
    updateUnknowns(unknowns){
        ret = []
        this.unknowns = 0;
        for (let i =0;i<this.varNames;i++){
            if (unknowns.includes(this.varNames[i]))
                ret.add(this.varNames[i]);
                this.unknowns ++;
        }
        return ret;
    }
    getAmountSharedVariables(list){
        //this checks if the list contains anything in the Varnames and if it does then 
        //amountShared counts up to allow us to know how many variables are the same
        let amountShared=0;
        for (let i =0;i<this.varNames.length;i++){
            if (list.includes(this.varNames[i]))
                amountShared++;
        }
        return amountShared;
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