@{%
const { lexer } = require('./lexer.js');
const first = d => d[0];
const second = d => d[1];
%}

@lexer lexer

main -> statements                                       {% ([ statements ]) => ({ statements }) %}

statements -> statement:+                                {% first %}

statement -> selectStatement %statementEnd               {% first %}

selectStatement -> select from where:? orderBy:?         {% ([ select, from, where, orderBy]) => ({ select, from, where, orderBy }) %}

from -> %from fieldList                                  {% second %}

select -> %select %wildcard                              {% ([ _, wildcard]) => [ wildcard ] %}
       |  %select fieldList                              {% second %}

fieldList -> fieldList %comma fieldOptionalRename        {% ([ fieldList, _, field ]) => [ ...fieldList, field] %}
          |  fieldOptionalRename                         {% ([ field ]) => [ field ] %}

fieldOptionalRename -> field %as field                   {% ([ field, _, field2 ]) => ({ field, as: field }) %}
                    | field                              {% ([ field ]) => field %}

where -> %where matchExpression                          {% second %}

orderBy -> %orderBy field %asc                           {% ([ _, field, asc ])    => ({ op: 'orderBy', field, asc }) %}
        |  %orderBy field %desc                          {% ([ _, field, desc ])   => ({ op: 'orderBy', field, desc }) %}
		  |  %orderBy field                                {% ([ _, field ])         => ({ op: 'orderBy', field }) %}

matchExpression -> %not matchExpression                  {% ([ _,    expr ])       => ({ op: 'not', expr }) %}
                |  matchExpression %and matchExpression  {% ([ expr, _, expr2 ])   => ({ op: 'and', expr, expr2 }) %}
					 |  matchExpression %or matchExpression   {% ([ expr, _, expr2 ])   => ({ op: 'or', expr, expr2 }) %}
					 |  fieldEqual                            {% first %}

fieldEqual -> field %equal expr                          {% ([expr,  _, expr2])    => ({ op: 'eq', expr, expr2 }) %}

expr -> %string                                          {% first %}
     |  %number                                          {% first %}
	  |  field                                            {% first %}

field -> %field %dot %field                              {% ([ field, _, field2 ]) => ({ field, dot: field2 }) %}
      |  %field                                          {% ([ field ]) => field %}
