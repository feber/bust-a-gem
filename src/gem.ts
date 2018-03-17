import * as path from 'path';
import * as util from './util';
import * as vscode from 'vscode';

//
// Gem class that knows where a gem lives and its label.
//

export default class Gem {
  // where is the gem?
  readonly dir: string;

  constructor(dir: string) {
    this.dir = dir;
  }

  // What is this gem called?
  get label() {
    if (!this._label) {
      this._label = path.basename(this.dir);
    }
    return this._label;
  }
  private _label: string | undefined;

  // Label without the version, if possible.
  get labelWithoutVersion() {
    if (!this._labelWithoutVersion) {
      // attempt to strip off version info for labelWithoutVersion
      const match = this.label.match(/^(.*)-\d+(\.\d)+$/);
      this._labelWithoutVersion = match ? match[1] : this.label;
    }
    return this._labelWithoutVersion;
  }
  private _labelWithoutVersion: string | undefined;

  // List gems using bundle show --paths.
  static async list(rootPath: string): Promise<Gem[]> {
    const cmd = <string>vscode.workspace.getConfiguration('bustagem.cmd').get('bundle');
    const options = { timeout: 3000, cwd: rootPath };
    const stdout = await util.exec(cmd, options);
    const dirs = stdout.trim().split('\n');
    if (dirs.length === 0) {
      throw new Error(`${cmd} didn't return anything.`);
    }
    return dirs.map(dir => new Gem(dir));
  }
}
