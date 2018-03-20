import { Symbols } from '../symbols';
import * as assert from 'assert';
import * as testHelpers from './testHelpers';
import * as vscode from 'vscode';

describe('Symbols', () => {
  it('finds symbols', async () => {
    const document = await vscode.workspace.openTextDocument(
      testHelpers.fixtureFile('something.rb')
    );

    let symbols = new Symbols();
    const list = await symbols.provideDocumentSymbols(document, <vscode.CancellationToken>{});
    const names = list.map(i => i.name);
    assert.deepEqual(names, [
      'module Hello',
      'class World',
      'attr_reader :a, :b',
      'attr_writer :c, :d',
      'attr_accessor :e, :f',
      'def self.class_method',
      'def question?',
      'def exclamation!',
      'def with_comment',
    ]);
  });
});
