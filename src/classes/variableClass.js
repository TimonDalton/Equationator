import nerdamer from "nerdamer";

export class Var {
    constructor(name, val = null, implicit = false, isKnown = false) {
        this.name = name;
        this.valueStr = "";
        this.valueAsExpressions = [];
        this.val = val;
        this.implicitlyDefined = implicit;
        this.isKnown = isKnown;
    }

    clear() {
        this.valueStr = "";
        this.valueAsExpressions = [];
        this.val = null;
        this.implicitlyDefined = false;
        this.isKnown = false;
    }

}

export class Var_obj {
    constructor() {
        this.varNames = [];
        this.variables = [];
        this.scope = {};
    }

    add(v) {
        this.varNames.push(v);
        this.variables.push(new Var(v));
        this.scope[v] = "";
    }
    clearValue(index) {
        this.variables[index] = new Var(this.varNames[index]);
        delete this.scope[this.varNames[index]];
    }
    deleteAtIndex(index) {
        console.log("deleted " + this.varNames[index]);
        delete this.scope[this.varNames[index]];
        this.varNames.splice(index, 1);
        this.variables.splice(index, 1);
    }
    implicitlySet(index, varValStr) {
        console.log("implicitly set "+this.varNames[index]);
        this.variables[index].val = varValStr;
        this.variables[index].valueStr = varValStr;
        this.variables[index].isKnown = true;
        this.variables[index].implicit = true;
        this.valueAsExpressions = [];
        this.scope[this.varNames[index]] = varValStr;
    }
    updateScope() {
        this.scope = {};
        for (let i = 0; i < this.variables.length; i++) {
            if (this.variables[i].isKnown) {
                this.scope[this.varNames[i]] = this.variables[i].val;
            }
        }
    }

    getValStrs() {
        let ret = [];
        for (let i = 0; i < this.variables.length; i++) {
            ret.push(this.variables[i].valueStr);
        }
        return ret;
    }

    getVarIndex(vName){
        return this.varNames.indexOf(vName);
    }



}

export function validVarValStr(str) {
    try {
        let a = nerdamer(str).evaluate();
        nerdamer.clear(nerdamer.expressions().length);//CHECK ERROR?
        return true;
    } catch (e) {
        return false;
    }
}

export function isNumber(n, scope) {
    if (!scope) return getVariables(n).length == 0;
    let vars = getVariables(n);
    let found = true;
    console.log("vars");
    console.log(vars);
    console.log("scope");
    console.log(scope);
    console.log("scope keys");
    console.log(Object.keys(scope));
    for (let i =0;i< vars.length;i++) {
        let v = vars[i];
        console.log("v: "+v);
        if (!Object.keys(scope).includes(v)) {
            console.log(v + " not in");
            console.log(scope);
            found = false;
            break;
        } else {
            if (!scope[v]) {
                console.log("scope["+v+"]("+scope[v]+")has no value");
                found = false;
            }
        }
    }

    return found;
}

export function getVariables(e) {
    let ret = nerdamer(e).variables();
    nerdamer.clear(nerdamer.expressions().length);
    return ret;
}