import ActionInterface from "../ActionInterface";
import {getInput} from "@actions/core";
import GeneratorInterface from "../GeneratorInterface";
import GitInfo from "../GitInfo";
import GeneratorActionStepDefinition from "../GeneratorActionStepDefinition";
import execCommand from "../helpers/execCommand";

export default class implements ActionInterface {

    /**
     * @inheritDoc
     */
    getDescription(): string|null {
        return "Pushing docs update...";
    }

    /**
     * @inheritDoc
     */
    shouldRun(generator: GeneratorInterface, info: GitInfo): boolean {
        return true;
    }

    /**
     * @inheritDoc
     */
    exec(generator: GeneratorInterface, info: GitInfo): void {
        const cwd = getInput('TEMP_DOCS_FOLDER');
        execCommand('git', [
            'push',
            '-u',
            'origin',
            info.branchOrTagName
        ], cwd);
    }
};