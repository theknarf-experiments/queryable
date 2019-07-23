@{%
const { lexer } = require('./lexer.js');
%}

@lexer lexer

statement -> selectStatement %statementEnd

selectStatement -> %keyword %all from where

from -> %keyword %field

where -> %keyword fieldEqual %keyword fieldEqual

fieldEqual -> %field %equal %string
