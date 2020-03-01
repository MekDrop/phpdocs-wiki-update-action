import {EOL} from 'os'
import ActionInterface from '../ActionInterface'
import {debug, getInput} from '@actions/core'
import {readFileSync, writeFileSync} from 'fs'
import readDirSync = require('recursive-readdir-sync')

export default class PrefixAction implements ActionInterface {
  /**
   * @inheritDoc
   */
  getDescription(): string | null {
    return 'Prefixing file lines...'
  }

  /**
   * @inheritDoc
   */
  shouldRun(): boolean {
    return this.getPrefixLines().length > 0
  }

  /**
   * @inheritDoc
   */
  exec(): void {
    const newDocs = getInput('temp_docs_folder')
    const prefix = this.getPrefixLines()
    for (const file of readDirSync(newDocs)) {
      debug(' '.concat(file.toString()))
      writeFileSync(
        file.toString(),
        prefix.concat(readFileSync(file.toString()).toString())
      )
    }
  }

  /**
   * Gets prefix that should be used for each file
   */
  protected getPrefixLines(): string {
    let lines = getInput('prefix_lines')
    if (typeof lines == 'string' && lines.length > 0) {
      lines = lines.concat(EOL)
    } else {
      lines = ''
    }
    return lines
  }
}
