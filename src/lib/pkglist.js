import { GitProcess } from 'dugite'
import { existsSync, mkdirSync } from 'fs'
import { yellow, red, bold, green } from 'chalk'

const pathToRepository = '~/.pkghere/repo'

updateRepo = () => {
    console.log(yellow("Updating the repository..."))
    if(existsSync('~/.pkghere/repo')) {
        if(existsSync('~/.pkghere/repo/.git')) {
            console.log(yellow("Repository exists, updating it..."))
            const result = await GitProcess.exec([ 'pull' ], pathToRepository)
            if (result.exitCode === 0) {
                const output = result.stdout
                // do some things with the output
                console.log(bold.green("Successfully updated repository."))
              } else {
                const error = result.stderr
                // error handling
                console.log(red.bold("An error occured while updating the repository."))
              }
        } else {
            console.log(yellow("Repository not existing, downloading it..."))
            const result = await GitProcess.exec([ 'clone', 'https://github.com/MagicMarvMan/pkghere-list.git', pathToRepository ], pathToRepository)
            if (result.exitCode === 0) {
                const output = result.stdout
                // do some things with the output
                console.log(green.bold("Successfully cloned repository."))
              } else {
                const error = result.stderr
                console.log(red.bold("An error occured while cloning the repository."))
              }
        }
    } else {
        if(existsSync('~/.pkghere')) {
            mkdirSync('~/.pkghere/repo')
            updateRepo()
        } else {
            mkdirSync('~/.pkghere')
            updateRepo()
        }
    }
}