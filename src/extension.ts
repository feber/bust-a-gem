import * as goTo from './goTo';
import * as open from './open';
import * as vscode from 'vscode';

// TODO
//
// status bar
// reload / rebuild
// great error handling (ripper-tags, bad gem names, escaping, etc.)
// detect if gem list is out of date or Gemfile.lock changed
// README
// release
//

//
// Extension activation
//

export function activate(context: vscode.ExtensionContext) {
  context.subscriptions.push(vscode.commands.registerCommand('extension.open', open.open));
  context.subscriptions.push(vscode.commands.registerCommand('extension.rebuild', goTo.rebuild));
  context.subscriptions.push(vscode.languages.registerDefinitionProvider('ruby', goTo.goTo));
}
