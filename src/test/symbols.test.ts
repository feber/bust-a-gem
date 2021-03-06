import { Symbols } from '../symbols';
import * as assert from 'assert';
import * as testHelpers from './testHelpers';
import * as vscode from 'vscode';

describe('Symbols', () => {
  it('finds symbols', async () => {
    // Create fake document. Saves 100ms vs calling openDocument.
    const document = <vscode.TextDocument>{
      getText: () => testHelpers.readFixture('something.rb'),
      uri: vscode.Uri.file('/ignore'),
    };

    let symbols = new Symbols();
    const list = await symbols.provideDocumentSymbols(document, <vscode.CancellationToken>{});
    const names = list.map(i => i.name);
    assert.deepEqual(names, [
      'module Hello',
      'class World',
      'attr_reader :a, :b',
      'attr_writer :c, :d',
      'attr_accessor :e, :f',
      'def a_real_method',
      'def self.class_method',
      'def gub',
      'def question?',
      'def exclamation!',
      'def with_comment',
    ]);
  });
});
