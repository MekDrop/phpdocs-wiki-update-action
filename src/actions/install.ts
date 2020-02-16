import ActionInterface from '../ActionInterface'
import GeneratorInterface from '../GeneratorInterface'
import GitInfo from '../GitInfo'
import execCommand from '../helpers/execCommand'

export default class implements ActionInterface {
  /**
   * @inheritDoc
   */
  getDescription(): string {
    return 'Installing required composer packages...'
  }

  /**
   * @inheritDoc
   */
  shouldRun(generator: GeneratorInterface, info: GitInfo): boolean {
    return generator.getComposerRequirements().length > 0
  }

  /**
   * @inheritDoc
   */
  exec(generator: GeneratorInterface, info: GitInfo): void {
    let packages = generator.getComposerRequirements()
    if (packages.length == 0) {
      return
    }
    execCommand(
      'composer',
      ['require', '--dev'].concat(packages),
      process.cwd()
    )
  }
}
