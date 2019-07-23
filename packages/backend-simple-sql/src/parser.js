import { Parser, Grammar } from 'nearley';
import grammar from './grammer.generated.js';

export default () => new Parser(
	Grammar.fromCompiled(grammar)
);
