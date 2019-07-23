@{%
const { lexer } = require('./lexer.js');
%}

@lexer lexer

statement -> selectStatement %statementEnd

selectStatement -> select from where:? orderBy:?

from -> %from fieldList

select -> %select %all
       |  %select fieldList

fieldList -> fieldList %comma fieldOptionalRename
          |  fieldOptionalRename

fieldOptionalRename -> fieldOptionalRename %as field
                    | field

field -> %field %dot %field
      |  %field

where -> %where matchExpression

matchExpression -> %not matchExpression
                |  matchExpression %and matchExpression
					 |  matchExpression %or matchExpression
					 | fieldEqual

fieldEqual -> field %equal %string
           |  field %equal %number
			  |  field %equal field

orderBy -> %orderBy %field orderAscOrDesc:?
orderAscOrDesc -> %asc | %desc
