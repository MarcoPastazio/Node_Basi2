interface Customer{
    surname: string;
    password: string;
}

//type aliases
type alfanumerico = number | string;

let ciao: alfanumerico;
ciao = 7;
ciao = "ciao";

//literals types 
let clickEvent: "click" | "dblclick";

clickEvent = "click";

//type guardas
/*
function isNumber(x: any): x is number{
    //
}
*/

//generics
