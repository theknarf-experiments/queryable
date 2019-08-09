@{%
const { lexer } = require('./lexer.js');
const first = d => d[0];
const second = d => d[1];
%}

@lexer lexer

main            -> arrayConstruct
                |  objectConstruct
                |  filters

arrayConstruct  -> %lbracket filters %rbracket

objectConstruct -> %lcurly objectArgs %rcurly

objectArgs      -> objectArgs %comma objectArg
                |  objectArg

objectArg       -> objectKey %colon exprM
                |  %field

objectKey       -> %field
                |  %lbracket exprM %rbracket

filters ->  filters %comma exprM
        |   exprM

exprM   ->  exprM %pipe expr
        |   exprM expr
        |   expr

expr    ->  exprB
		  |   expr %optional
		  |   %lbracket exprM %rbracket
		  |   %lparen exprM %rparen
		  |   exprM %addition exprM
		  |   exprM %subtraction exprM
		  |   exprM %multiplication exprM
		  |   exprM %division exprM

exprB   ->  %descend
        |   %identity
		  |   %null
		  |   func
        |   %string
		  |   %number
        |   %field
		  |   %number %colon %number
		  |   %lbracket %rbracket

func    ->  %length
        |   %utf8bytelength
		  |   %keys
