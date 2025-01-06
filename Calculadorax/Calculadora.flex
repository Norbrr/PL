import java_cup.runtime.*;
%%   
%cup 
%debug

%%   

/* Expresiones y reglas */
    
    "x"                { return new Symbol(sym.EQUIS);}
    "+"                { return new Symbol(sym.PLUS); }
    "-"                { return new Symbol(sym.MINUS); }
    "*"                { return new Symbol(sym.POR); }
    "/"                { return new Symbol(sym.DIV); }
    "("                { return new Symbol(sym.AP); }
    ")"                { return new Symbol(sym.CP); }
    ";"                { return new Symbol(sym.PYC); }
    "="               { return new Symbol(sym.EQ);}
    0|[1-9][0-9]*      { return new Symbol(sym.NUMERO, Integer.parseInt(yytext()) ); }
    \r|\n              { return new Symbol(sym.EOLN); }   
    \ |\t\f            {  }  
    .                { throw new Error("Illegal character <"+yytext()+">"); }
