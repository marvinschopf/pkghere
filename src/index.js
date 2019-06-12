import { yellow } from "chalk";
import { updateRepo } from './lib/pkglist'
import "core-js/stable"
import "regenerator-runtime/runtime"

async function main() {
    await updateRepo()
}

console.log(yellow.bold("Starting..."))
main()