import { red } from "https://deno.land/std@0.100.0/fmt/colors.ts";
import { parse } from "https://deno.land/std@0.100.0/flags/mod.ts";

//const message = red("Hola soy Claudio")

const args = parse ( Deno.args )

const argsStringify = red (`${JSON.stringify(args)}`)

console.log(  red ( ` ${ argsStringify }` ));
//console.log(  red ( ` ${args[0]}` ));
//console.log(  red ( ` ${JSON.stringify(args[0])}` ));



