import { red } from "https://deno.land/std@0.100.0/fmt/colors.ts";
import { parse } from "https://deno.land/std@0.100.0/flags/mod.ts";

//const message = red("Hola soy Claudio")

const args = parse ( Deno.args )



console.log(  red ( ` ${args}` ));


