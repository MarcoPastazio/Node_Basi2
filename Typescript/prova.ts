interface Customer{
    surname: string;
    password: string;
}

//type aliases
type alfanumerico = number | string;

let ciao: alfanumerico;
ciao = 7;

console.log(ciao);

ciao = "ciao";

console.log(ciao);

//literals types 
let clickEvent: "click" | "dblclick";

clickEvent = "click";

//type guardas
/*
function isNumber(x: any): x is number{
    //
}
*/

//overloading

function saluta(nome: string, saluto?: string): string{
    return `${saluto} ${nome}`;
}

console.log(saluta("Marco"));
console.log(saluta("Marco", "Ue"));

//overload (dichiarazione di funzione)
function somma(a: number, b: number):number;
function somma(a: string, b: string):string;
//funzione da implementare
function somma(a: any, b: any): any{
    return a + b;
};

console.log(1+4);
console.log("Marco", "è Brutto");


class Cuounter{
    contatore: number = 0;

    increment(this: Cuounter) {
        this.contatore++;
    };
}

let counter = new Cuounter();
counter.increment();
counter.increment();

console.log(counter.contatore);
counter.increment();

console.log(counter.contatore);
counter.increment();
counter.increment();

console.log(counter.contatore);

function listaNomi(capo: string, ...other: string[]): string{
    return capo + " " + other.join(" ");
}

let team = listaNomi("Marco", "Pino", "KekkoTagliatella");

console.log(team);