@{%
const { lexer } = require('./lexer.js');
const first = d => d[0];
const second = d => d[1];
%}

@lexer lexer

main -> filters %comma filters
     |  filters

filters -> filters %pipe exprM
        |  exprM

exprM  -> exprM expr
       | expr

expr   -> exprB
		 |  expr %optional
		 |  %lbracket exprM %rbracket
		 |  %lparen exprM %rparen
		 |  exprM %addition exprM
		 |  exprM %subtraction exprM
		 |  exprM %multiplication exprM
		 |  exprM %division exprM

exprB ->  %descend
       |  %identity
		 |  %null
		 |  func
       |  %string
		 |  %number
       |  %field
		 |  %number %colon %number
		 |  %lbracket %rbracket

func  -> %length
      |  %utf8bytelength
		|  %keys
