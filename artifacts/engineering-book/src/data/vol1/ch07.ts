import type { Section } from '../types';

export const CH07_SECTIONS: Section[] = [
  {
    id: "7-1",
    number: "7.1",
    title: "Why Every Engineer Should Understand Compilation",
    content: `When you write x = 5 + 3 in Python and see 8 on the screen, a staggering amount of engineering has happened between your keystroke and that output. Understanding that pipeline — not superficially but completely — gives you powers that engineers who skip this knowledge never have.
You will understand why Python is slow for certain workloads and fast for others. You will understand what the JVM's JIT compiler is actually doing when it 'warms up'. You will understand why Rust can match C performance without garbage collection. You will understand why TypeScript catches errors that JavaScript misses. You will understand why your program behaves differently with and without optimization flags. You will understand security vulnerabilities rooted in compilation assumptions.
More fundamentally: understanding how languages are implemented teaches you how to think about language design, type systems, and the semantics of the code you write. Engineers who understand their language's runtime write dramatically better code in it.


---`
  },
  {
    id: "7-2",
    number: "7.2",
    title: "Lexical Analysis: From Characters to Tokens",
    content: `The first phase of compilation is lexical analysis, performed by the lexer (also called a scanner or tokenizer). The lexer reads the source file as a stream of characters and groups them into tokens — the atomic units of meaning in the programming language.
A token is a pair: a token type (what kind of syntactic element it is) and a lexeme (the actual characters that form it). For example, the expression x = 5 + y produces four tokens: an IDENTIFIER token with lexeme 'x', an ASSIGN token with lexeme '=', an INTEGER token with lexeme '5', an OPERATOR token with lexeme '+', and another IDENTIFIER token with lexeme 'y'.

### 7.2.1 Implementing a Lexer


\`\`\`python
# A complete lexer for a subset of Python
from enum import Enum, auto
from dataclasses import dataclass
from typing import List, Optional

class TokenType(Enum):
# Literals
INTEGER = auto() # 42, 0, -5
FLOAT = auto() # 3.14, 2.0e10
STRING = auto() # 'hello', "world"
BOOL = auto() # True, False
NONE = auto() # None
# Identifiers and keywords
IDENTIFIER = auto() # x, my_var, calculate_total
DEF = auto() # def
RETURN = auto() # return
IF = auto() # if
ELSE = auto() # else
WHILE = auto() # while
FOR = auto() # for
IN = auto() # in
AND = auto() # and
OR = auto() # or
NOT = auto() # not
IMPORT = auto() # import
CLASS = auto() # class
# Operators
PLUS = auto() # +
MINUS = auto() # -
STAR = auto() # *
SLASH = auto() # /
PERCENT = auto() # %
STARSTAR = auto() # **
EQ = auto() # ==
NEQ = auto() # !=
LT = auto() # <
GT = auto() # >
LEQ = auto() # <=
GEQ = auto() # >=
ASSIGN = auto() # =
PLUS_EQ = auto() # +=
MINUS_EQ = auto() # -=
# Delimiters
LPAREN = auto() # (
RPAREN = auto() # )
LBRACKET = auto() # [
RBRACKET = auto() # ]
LBRACE = auto() # {
RBRACE = auto() # }
COMMA = auto() # ,
COLON = auto() # :
DOT = auto() # .
NEWLINE = auto() # \\n (significant in Python!)
INDENT = auto() # indentation increase
DEDENT = auto() # indentation decrease
EOF = auto() # end of file

@dataclass
class Token:
\`\`\`

type: TokenType
lexeme: str
line: int # for error messages
column: int # for error messages


\`\`\`python
def __repr__(self):
return f'Token({self.type.name}, {self.lexeme!r}, {self.line}:{self.column})'

KEYWORDS = {
\`\`\`

'def': TokenType.DEF, 'return': TokenType.RETURN,
'if': TokenType.IF, 'else': TokenType.ELSE,
'while': TokenType.WHILE, 'for': TokenType.FOR,
'in': TokenType.IN, 'and': TokenType.AND,
'or': TokenType.OR, 'not': TokenType.NOT,
'True': TokenType.BOOL, 'False': TokenType.BOOL,
'None': TokenType.NONE, 'import': TokenType.IMPORT,
'class': TokenType.CLASS,
}


\`\`\`python
class Lexer:
def __init__(self, source: str):
\`\`\`

self.source = source
self.pos = 0
self.line = 1
self.column = 1
self.tokens: List[Token] = []
self.indent_stack = [0] # stack of indentation levels


\`\`\`python
def current(self) -> Optional[str]:
return self.source[self.pos] if self.pos < len(self.source) else None

def advance(self) -> str:
ch = self.source[self.pos]
\`\`\`

self.pos += 1

\`\`\`python
if ch == '\\n': self.line += 1; self.column = 1
else: self.column += 1
return ch

def peek(self, offset=1) -> Optional[str]:
idx = self.pos + offset
return self.source[idx] if idx < len(self.source) else None

def tokenize(self) -> List[Token]:
while self.pos < len(self.source):
\`\`\`

self.skip_whitespace_and_comments()

\`\`\`python
if self.pos >= len(self.source): break
ch = self.current()

if ch == '\\n':
\`\`\`

self.handle_newline_and_indent()

\`\`\`python
elif ch.isdigit() or (ch == '-' and self.peek() and self.peek().isdigit()):
\`\`\`

self.read_number()

\`\`\`python
elif ch in ('"', "'"):
\`\`\`

self.read_string()

\`\`\`python
elif ch.isalpha() or ch == '_':
\`\`\`

self.read_identifier_or_keyword()

\`\`\`python
else:
\`\`\`

self.read_operator_or_delimiter()


\`\`\`python
# Emit DEDENT tokens for any remaining indentation
while len(self.indent_stack) > 1:
\`\`\`

self.indent_stack.pop()
self.tokens.append(Token(TokenType.DEDENT, '', self.line, self.column))
self.tokens.append(Token(TokenType.EOF, '', self.line, self.column))

\`\`\`python
return self.tokens

def read_number(self):
start_col = self.column
start = self.pos
is_float = False
while self.current() and (self.current().isdigit() or self.current() == '.'):
if self.current() == '.':
is_float = True
\`\`\`

self.advance()

\`\`\`python
# Handle scientific notation: 2.0e10
if self.current() in ('e', 'E'):
is_float = True
\`\`\`

self.advance()

\`\`\`python
if self.current() in ('+', '-'): self.advance()
while self.current() and self.current().isdigit(): self.advance()
lexeme = self.source[start:self.pos]
tok_type = TokenType.FLOAT if is_float else TokenType.INTEGER
\`\`\`

self.tokens.append(Token(tok_type, lexeme, self.line, start_col))


\`\`\`python
def read_identifier_or_keyword(self):
start_col = self.column
start = self.pos
while self.current() and (self.current().isalnum() or self.current() == '_'):
\`\`\`

self.advance()

\`\`\`python
lexeme = self.source[start:self.pos]
tok_type = KEYWORDS.get(lexeme, TokenType.IDENTIFIER)
\`\`\`

self.tokens.append(Token(tok_type, lexeme, self.line, start_col))


\`\`\`python
def skip_whitespace_and_comments(self):
while self.current() and self.current() in (' ', '\\t', '\\r'):
\`\`\`

self.advance()

\`\`\`python
if self.current() == '#': # comment: skip to end of line
while self.current() and self.current() != '\\n':
\`\`\`

self.advance()


\`\`\`python
# USAGE:
source = '''
def factorial(n):
if n <= 1:
return 1
return n * factorial(n - 1)
\`\`\`

'''

\`\`\`python
lexer = Lexer(source)
tokens = lexer.tokenize()
for tok in tokens[:15]: # show first 15 tokens
print(tok)
\`\`\``
  },
  {
    id: "7-3",
    number: "7.3",
    title: "Parsing: From Tokens to Abstract Syntax Trees",
    content: `The parser takes the stream of tokens from the lexer and builds an Abstract Syntax Tree (AST) — a tree data structure that represents the grammatical structure of the program. The AST abstracts away syntactic details (parentheses, semicolons, whitespace) and preserves only the semantic structure.
Parsers are defined by grammars — formal specifications of what sequences of tokens are valid programs. The most common grammar formalism for programming languages is Context-Free Grammar (CFG). Understanding CFGs and parsing algorithms is essential for anyone who wants to build languages, DSLs, or sophisticated code analysis tools.

### 7.3.1 Context-Free Grammars


\`\`\`python
# CONTEXT-FREE GRAMMAR for a simple expression language
# Written in BNF (Backus-Naur Form) notation:
\`\`\`

#

\`\`\`python
# <program> ::= <statement>*
# <statement> ::= <assignment> | <if_stmt> | <while_stmt> | <expr_stmt>
# <assignment> ::= IDENTIFIER '=' <expression>
# <if_stmt> ::= 'if' <expression> ':' NEWLINE INDENT <statement>+ DEDENT
# ('else' ':' NEWLINE INDENT <statement>+ DEDENT)?
# <expression> ::= <or_expr>
# <or_expr> ::= <and_expr> ('or' <and_expr>)*
# <and_expr> ::= <not_expr> ('and' <not_expr>)*
# <not_expr> ::= 'not' <not_expr> | <comparison>
# <comparison> ::= <add_expr> (('=='|'!='|'<'|'>'|'<='|'>=') <add_expr>)*
# <add_expr> ::= <mul_expr> (('+'|'-') <mul_expr>)*
# <mul_expr> ::= <unary> (('*'|'/'|'%') <unary>)*
# <unary> ::= '-' <unary> | <power>
# <power> ::= <primary> ('**' <unary>)*
# <primary> ::= INTEGER | FLOAT | STRING | BOOL | NONE
# | IDENTIFIER | '(' <expression> ')'
# | <call_expr>
# <call_expr> ::= IDENTIFIER '(' (<expression> (',' <expression>)*)? ')'

# WHY THIS ORDERING MATTERS: operator precedence
# Expressions lower in the grammar bind TIGHTER (higher precedence).
# <mul_expr> is lower than <add_expr>:
# 2 + 3 * 4 is parsed as 2 + (3 * 4) = 14, not (2+3) * 4 = 20
# This is exactly Python's operator precedence rules!

# RECURSIVE DESCENT PARSING: the most readable parsing approach
# Each grammar rule becomes a method.
# The method 'tries' to match its rule and returns an AST node.
\`\`\`

### 7.3.2 Building the AST


\`\`\`python
from dataclasses import dataclass, field
from typing import List, Optional, Any

# AST NODE DEFINITIONS
@dataclass
class ASTNode: pass

@dataclass
class NumberLiteral(ASTNode):
\`\`\`

value: float


\`\`\`python
@dataclass
class StringLiteral(ASTNode):
\`\`\`

value: str


\`\`\`python
@dataclass
class BoolLiteral(ASTNode):
\`\`\`

value: bool


\`\`\`python
@dataclass
class NoneLiteral(ASTNode): pass

@dataclass
class Identifier(ASTNode):
\`\`\`

name: str


\`\`\`python
@dataclass
class BinaryOp(ASTNode):
\`\`\`

operator: str # '+', '-', '*', '/', '==', '!=' etc.
left: ASTNode
right: ASTNode


\`\`\`python
@dataclass
class UnaryOp(ASTNode):
\`\`\`

operator: str # '-', 'not'
operand: ASTNode


\`\`\`python
@dataclass
class Assignment(ASTNode):
\`\`\`

target: str # variable name
value: ASTNode


\`\`\`python
@dataclass
class IfStatement(ASTNode):
\`\`\`

condition: ASTNode
then_body: List[ASTNode]
else_body: Optional[List[ASTNode]] = None


\`\`\`python
@dataclass
class WhileStatement(ASTNode):
\`\`\`

condition: ASTNode
body: List[ASTNode]


\`\`\`python
@dataclass
class FunctionDef(ASTNode):
\`\`\`

name: str
params: List[str]
body: List[ASTNode]


\`\`\`python
@dataclass
class FunctionCall(ASTNode):
\`\`\`

name: str
args: List[ASTNode]


\`\`\`python
@dataclass
class ReturnStatement(ASTNode):
\`\`\`

value: Optional[ASTNode]


\`\`\`python
@dataclass
class Program(ASTNode):
\`\`\`

statements: List[ASTNode]


\`\`\`python
# RECURSIVE DESCENT PARSER
class Parser:
def __init__(self, tokens: List[Token]):
\`\`\`

self.tokens = [t for t in tokens if t.type not in
(TokenType.NEWLINE,)] # simplify for demo
self.pos = 0


\`\`\`python
def current(self) -> Token:
return self.tokens[self.pos] if self.pos < len(self.tokens) else self.tokens[-1]

def peek(self, offset=1) -> Token:
idx = self.pos + offset
return self.tokens[idx] if idx < len(self.tokens) else self.tokens[-1]

def consume(self, expected_type: TokenType = None) -> Token:
tok = self.current()
if expected_type and tok.type != expected_type:
raise SyntaxError(
\`\`\`

f'Expected {expected_type.name} but got {tok.type.name} ',
f"'{tok.lexeme}' at line {tok.line}:{tok.column}"
)
self.pos += 1

\`\`\`python
return tok

def parse_program(self) -> Program:
statements = []
while self.current().type != TokenType.EOF:
\`\`\`

statements.append(self.parse_statement())

\`\`\`python
return Program(statements)

def parse_expression(self) -> ASTNode:
return self.parse_or_expr()

def parse_or_expr(self) -> ASTNode:
left = self.parse_and_expr()
while self.current().type == TokenType.OR:
op = self.consume().lexeme
right = self.parse_and_expr()
left = BinaryOp(op, left, right)
return left

def parse_and_expr(self) -> ASTNode:
left = self.parse_comparison()
while self.current().type == TokenType.AND:
op = self.consume().lexeme
right = self.parse_comparison()
left = BinaryOp(op, left, right)
return left

def parse_comparison(self) -> ASTNode:
left = self.parse_add_expr()
while self.current().type in (TokenType.EQ, TokenType.NEQ,
\`\`\`

TokenType.LT, TokenType.GT,
TokenType.LEQ, TokenType.GEQ):

\`\`\`python
op = self.consume().lexeme
right = self.parse_add_expr()
left = BinaryOp(op, left, right)
return left

def parse_add_expr(self) -> ASTNode:
left = self.parse_mul_expr()
while self.current().type in (TokenType.PLUS, TokenType.MINUS):
op = self.consume().lexeme
right = self.parse_mul_expr()
left = BinaryOp(op, left, right)
return left

def parse_mul_expr(self) -> ASTNode:
left = self.parse_unary()
while self.current().type in (TokenType.STAR, TokenType.SLASH,
\`\`\`

TokenType.PERCENT):

\`\`\`python
op = self.consume().lexeme
right = self.parse_unary()
left = BinaryOp(op, left, right)
return left

def parse_unary(self) -> ASTNode:
if self.current().type == TokenType.MINUS:
op = self.consume().lexeme
return UnaryOp(op, self.parse_unary())
if self.current().type == TokenType.NOT:
op = self.consume().lexeme
return UnaryOp(op, self.parse_unary())
return self.parse_primary()

def parse_primary(self) -> ASTNode:
tok = self.current()
if tok.type == TokenType.INTEGER:
\`\`\`

self.consume()

\`\`\`python
return NumberLiteral(int(tok.lexeme))
elif tok.type == TokenType.FLOAT:
\`\`\`

self.consume()

\`\`\`python
return NumberLiteral(float(tok.lexeme))
elif tok.type == TokenType.STRING:
\`\`\`

self.consume()

\`\`\`python
return StringLiteral(tok.lexeme[1:-1]) # strip quotes
elif tok.type == TokenType.BOOL:
\`\`\`

self.consume()

\`\`\`python
return BoolLiteral(tok.lexeme == 'True')
elif tok.type == TokenType.NONE:
\`\`\`

self.consume()

\`\`\`python
return NoneLiteral()
elif tok.type == TokenType.IDENTIFIER:
# Could be: identifier, function call
name = self.consume().lexeme
if self.current().type == TokenType.LPAREN:
return self.parse_call(name)
return Identifier(name)
elif tok.type == TokenType.LPAREN:
\`\`\`

self.consume() # consume '('

\`\`\`python
expr = self.parse_expression()
\`\`\`

self.consume(TokenType.RPAREN) # expect ')'

\`\`\`python
return expr
raise SyntaxError(f'Unexpected token: {tok}')

def parse_call(self, name: str) -> FunctionCall:
\`\`\`

self.consume(TokenType.LPAREN)

\`\`\`python
args = []
while self.current().type != TokenType.RPAREN:
\`\`\`

args.append(self.parse_expression())

\`\`\`python
if self.current().type == TokenType.COMMA:
\`\`\`

self.consume()
self.consume(TokenType.RPAREN)

\`\`\`python
return FunctionCall(name, args)

# Example: parse '2 + 3 * 4'
# Tokens: [INT(2), PLUS, INT(3), STAR, INT(4)]
# AST result:
# BinaryOp('+',
# NumberLiteral(2),
# BinaryOp('*',
# NumberLiteral(3),
# NumberLiteral(4)
# )
# )
# Notice: * binds tighter than + due to grammar hierarchy
\`\`\``
  },
  {
    id: "7-4",
    number: "7.4",
    title: "Semantic Analysis: Type Checking and Symbol Tables",
    content: `After building the AST, the compiler performs semantic analysis — checking that the program is meaningful, not just syntactically correct. A program can be syntactically valid but semantically wrong: calling a function that does not exist, adding a string and a number without explicit conversion, or using a variable before defining it.

### 7.4.1 Symbol Tables and Type Checking


\`\`\`python
# Semantic analysis: type checking and symbol resolution
from typing import Dict, Optional

class Symbol:
def __init__(self, name: str, sym_type: str, defined_at: int):
\`\`\`

self.name = name
self.type = sym_type # 'int', 'float', 'str', 'function', etc.
self.defined_at = defined_at # line number


\`\`\`python
class SymbolTable:
\`\`\`

'''Scoped symbol table — supports nested scopes (functions, classes)'''

\`\`\`python
def __init__(self, parent: Optional['SymbolTable'] = None):
\`\`\`

self.symbols: Dict[str, Symbol] = {}
self.parent = parent # enclosing scope


\`\`\`python
def define(self, name: str, sym_type: str, line: int) -> None:
\`\`\`

self.symbols[name] = Symbol(name, sym_type, line)


\`\`\`python
def lookup(self, name: str) -> Optional[Symbol]:
\`\`\`

'''Look up in current scope, then parent scopes (lexical scoping)'''

\`\`\`python
if name in self.symbols:
return self.symbols[name]
if self.parent:
return self.parent.lookup(name) # walk up scope chain
return None # not found in any scope

def lookup_local(self, name: str) -> Optional[Symbol]:
\`\`\`

'''Look up in current scope only (for checking redefinitions)'''

\`\`\`python
return self.symbols.get(name)

class SemanticAnalyzer:
def __init__(self):
\`\`\`

self.global_scope = SymbolTable()
self.current_scope = self.global_scope
self.errors: List[str] = []


\`\`\`python
def error(self, message: str):
\`\`\`

self.errors.append(message)


\`\`\`python
def analyze(self, node: ASTNode) -> Optional[str]:
\`\`\`

'''Returns the inferred type of the expression.'''

\`\`\`python
if isinstance(node, Program):
for stmt in node.statements:
\`\`\`

self.analyze(stmt)

\`\`\`python
return None

elif isinstance(node, NumberLiteral):
return 'float' if isinstance(node.value, float) else 'int'

elif isinstance(node, StringLiteral):
return 'str'

elif isinstance(node, BoolLiteral):
return 'bool'

elif isinstance(node, Identifier):
sym = self.current_scope.lookup(node.name)
if sym is None:
\`\`\`

self.error(f"Undefined variable: '{node.name}'")

\`\`\`python
return 'unknown'
return sym.type

elif isinstance(node, Assignment):
val_type = self.analyze(node.value)
# Define or redefine in current scope
\`\`\`

self.current_scope.define(node.target, val_type, 0)

\`\`\`python
return None

elif isinstance(node, BinaryOp):
left_type = self.analyze(node.left)
right_type = self.analyze(node.right)
return self.check_binary_op(node.operator, left_type, right_type)

elif isinstance(node, FunctionDef):
# Define function in current scope
\`\`\`

self.current_scope.define(node.name, 'function', 0)

\`\`\`python
# Create new scope for function body
func_scope = SymbolTable(parent=self.current_scope)
\`\`\`

self.current_scope = func_scope

\`\`\`python
for param in node.params:
\`\`\`

func_scope.define(param, 'unknown', 0) # params: type unknown

\`\`\`python
for stmt in node.body:
\`\`\`

self.analyze(stmt)
self.current_scope = self.current_scope.parent # restore scope

\`\`\`python
return None

elif isinstance(node, FunctionCall):
sym = self.current_scope.lookup(node.name)
if sym is None:
\`\`\`

self.error(f"Undefined function: '{node.name}'")

\`\`\`python
elif sym.type != 'function':
\`\`\`

self.error(f"'{node.name}' is not callable")

\`\`\`python
for arg in node.args:
\`\`\`

self.analyze(arg)

\`\`\`python
return 'unknown' # return type not tracked in this simple analyzer

return None

def check_binary_op(self, op: str, left: str, right: str) -> str:
numeric = {'int', 'float'}
if op in ('+', '-', '*', '/', '%', '**'):
if left in numeric and right in numeric:
return 'float' if 'float' in (left, right) else 'int'
if op == '+' and left == 'str' and right == 'str':
return 'str' # string concatenation
\`\`\`

self.error(f"Type error: cannot apply '{op}' to {left} and {right}")

\`\`\`python
return 'unknown'
if op in ('==', '!=', '<', '>', '<=', '>='):
return 'bool'
return 'unknown'
\`\`\``
  },
  {
    id: "7-5",
    number: "7.5",
    title: "Intermediate Representations: LLVM IR, Three-Address Code",
    content: `After semantic analysis, the compiler translates the AST into an Intermediate Representation (IR) — a lower-level, language-independent representation that is easier to optimize than either source code or machine code. Most modern compilers use an IR called SSA (Static Single Assignment form), where each variable is assigned exactly once.
LLVM IR is the most widely used compiler IR in the world. Clang (C/C++/Objective-C), Rust, Swift, Kotlin, Julia, and dozens of other languages compile to LLVM IR. The LLVM optimizer then applies dozens of optimization passes to the IR before generating machine code for the target CPU.

### 7.5.1 Three-Address Code and SSA Form


\`\`\`python
# THREE-ADDRESS CODE: each instruction has at most 3 operands
# The basis of most modern compiler IRs

# Source Python:
# def compute(x, y):
# a = x + y
# b = a * 2
# if b > 10:
# return b
# return a

# THREE-ADDRESS CODE (before SSA):
# t1 = x + y ; a = x + y
# t2 = t1 * 2 ; b = a * 2
# t3 = t2 > 10 ; compare b > 10
# if_false t3 goto L1 ; if not (b>10), skip
# return t2 ; return b
# L1:
# return t1 ; return a

# SSA FORM (Static Single Assignment):
# Each variable assigned EXACTLY ONCE.
# Where control flow merges, use φ (phi) functions.

# LLVM IR (actual LLVM syntax):
# define i64 @compute(i64 %x, i64 %y) {
# entry:
# %a = add i64 %x, %y ; a = x + y
# %b = mul i64 %a, 2 ; b = a * 2
# %cmp = icmp sgt i64 %b, 10 ; cmp = (b > 10)
# br i1 %cmp, label %then, label %else ; branch on comparison
# then:
# ret i64 %b ; return b
# else:
# ret i64 %a ; return a
# }

# WHY SSA MAKES OPTIMIZATION EASIER:
# Each variable has exactly one definition.
# Reaching definition analysis becomes trivial.
# Many optimizations are dramatically simpler:
# - Constant propagation: if %x = 5, replace all uses of %x with 5
# - Dead code elimination: if a variable has no uses, remove its definition
# - Value numbering: if %t1 = a+b and %t2 = a+b in same block, t1=t2

# Building a simple IR generator from our AST:
class IRGenerator:
def __init__(self):
\`\`\`

self.instructions = []
self.temp_count = 0
self.label_count = 0


\`\`\`python
def new_temp(self) -> str:
\`\`\`

self.temp_count += 1

\`\`\`python
return f't{self.temp_count}'

def new_label(self) -> str:
\`\`\`

self.label_count += 1

\`\`\`python
return f'L{self.label_count}'

def emit(self, instr: str) -> None:
\`\`\`

self.instructions.append(instr)


\`\`\`python
def generate(self, node: ASTNode) -> Optional[str]:
if isinstance(node, NumberLiteral):
t = self.new_temp()
\`\`\`

self.emit(f'{t} = {node.value}')

\`\`\`python
return t

elif isinstance(node, Identifier):
return node.name # variables are their own temporaries

elif isinstance(node, BinaryOp):
left_t = self.generate(node.left)
right_t = self.generate(node.right)
result_t = self.new_temp()
\`\`\`

self.emit(f'{result_t} = {left_t} {node.operator} {right_t}')

\`\`\`python
return result_t

elif isinstance(node, Assignment):
val_t = self.generate(node.value)
\`\`\`

self.emit(f'{node.target} = {val_t}')

\`\`\`python
return node.target

elif isinstance(node, IfStatement):
cond_t = self.generate(node.condition)
else_label = self.new_label()
end_label = self.new_label()
\`\`\`

self.emit(f'if_false {cond_t} goto {else_label}')

\`\`\`python
for stmt in node.then_body:
\`\`\`

self.generate(stmt)
self.emit(f'goto {end_label}')
self.emit(f'{else_label}:')

\`\`\`python
if node.else_body:
for stmt in node.else_body:
\`\`\`

self.generate(stmt)
self.emit(f'{end_label}:')

\`\`\`python
return None

return None
\`\`\``
  },
  {
    id: "7-6",
    number: "7.6",
    title: "Optimization: Dead Code, Inlining, Loop Unrolling, Vectorization",
    content: `Compiler optimization transforms the IR into equivalent but more efficient code. Modern optimizing compilers (GCC, Clang, LLVM) apply dozens of optimization passes. Understanding them explains why code compiled with -O2 or -O3 runs dramatically faster than unoptimized code, and why certain coding patterns enable or prevent optimization.

### 7.6.1 The Major Optimization Passes

Optimization
What It Does
Speedup Example
Enabled By
Constant Folding
Evaluate constant expressions at compile time: 2*3 → 6
100% — zero runtime cost for constants
Simple AST/IR pass
Constant Propagation
Replace variable with its constant value: x=5; y=x+1 → y=6
Eliminates loads, enables further optimization
Data flow analysis
Dead Code Elimination
Remove code whose results are never used
Reduces code size and register pressure
Liveness analysis
Common Subexpression Elimination
Compute a+b once, reuse result
Eliminates redundant computation
Value numbering
Loop Invariant Code Motion
Move loop-invariant computations outside the loop
n × speedup for n iterations
Dominance + loop analysis
Inlining
Replace function call with function body
5-30% overall, 10× for tiny functions
Call graph analysis
Loop Unrolling
Execute loop body 2/4/8 times per iteration
10-30% for short loops (reduces branch overhead)
Loop analysis + backend
Vectorization (Auto-SIMD)
Generate SIMD instructions for data-parallel loops
4-16× for float/int array operations
Loop dependence analysis
Register Allocation
Keep hot variables in CPU registers
50-200% — eliminates memory load/stores
Graph coloring
Strength Reduction
Replace expensive ops with cheaper: x*8 → x<<3
3-90× for div/mul replaced by shift
Algebraic identities


\`\`\`python
# DEMONSTRATING COMPILER OPTIMIZATIONS

# 1. CONSTANT FOLDING AND PROPAGATION
# Source:
# x = 2 * 3 # constant expression
# y = x + 10 # x is constant → y = 6 + 10 = 16
# if y > 5: # 16 > 5 is always true → eliminate dead branch
# print(y)
\`\`\`

#

\`\`\`python
# After optimization: compiler generates code for print(16) only.
# The if statement and both assignments disappear entirely.

# 2. LOOP INVARIANT CODE MOTION
# Source:
# for i in range(1000000):
# result += data[i] * (width * height) # width*height is loop invariant!
\`\`\`

#

\`\`\`python
# After optimization:
# _invariant = width * height # computed ONCE outside the loop
# for i in range(1000000):
# result += data[i] * _invariant
# Speedup: eliminates 999,999 multiplications

# 3. FUNCTION INLINING
# Source:
# def square(x): return x * x
# total = 0
# for i in range(1000000):
# total += square(i) # function call overhead: push args, jump, pop
\`\`\`

#

\`\`\`python
# After inlining:
# total = 0
# for i in range(1000000):
# total += i * i # no function call — just the multiplication
# Speedup: eliminates 1,000,000 function call overheads

# 4. AUTO-VECTORIZATION
# Source (C):
# float a[1024], b[1024], c[1024];
# for (int i = 0; i < 1024; i++) {
# c[i] = a[i] + b[i];
# }
\`\`\`

#

\`\`\`python
# With AVX2 (-O3 -mavx2), compiler generates:
# ; Process 8 floats at a time with VADDPS
# loop:
# vmovups ymm0, [a + i*4] ; load 8 floats from a
# vmovups ymm1, [b + i*4] ; load 8 floats from b
# vaddps ymm2, ymm0, ymm1 ; add 8 floats in parallel
# vmovups [c + i*4], ymm2 ; store 8 floats to c
# add i, 8 ; advance by 8
# cmp i, 1024
# jl loop
# Speedup: 8× compared to scalar loop

# 5. WHAT PREVENTS VECTORIZATION
# Loop-carried dependence (each iteration depends on previous):
# for i in range(1, n):
# a[i] = a[i-1] + b[i] # a[i] depends on a[i-1]
# Cannot vectorize: must compute sequentially

# Aliasing (compiler doesn't know if pointers overlap):
# void add(float *a, float *b, float *c, int n) {
# for (int i=0; i<n; i++) c[i] = a[i] + b[i];
# }
# Use 'restrict' keyword to tell compiler no aliasing → enables vectorization

# Help the compiler vectorize: use numpy (pre-vectorized C code),
# avoid data dependencies between iterations, use restrict in C/C++
\`\`\``
  },
  {
    id: "7-7",
    number: "7.7",
    title: "Register Allocation: The Graph Coloring Problem",
    content: `The final compilation phase translates the optimized IR into machine code for the target CPU architecture. This involves: instruction selection (which machine instructions implement each IR operation), register allocation (assigning variables to CPU registers), and instruction scheduling (ordering instructions to maximize CPU pipeline utilization).

### 7.7.1 Instruction Selection and Register Allocation


\`\`\`python
# FROM IR TO x86-64 ASSEMBLY: a concrete example

# Source Python (conceptual C equivalent):
# int add(int a, int b) { return a + b; }

# IR (three-address code):
# define i32 @add(i32 %a, i32 %b):
# %result = add i32 %a, %b
# ret i32 %result

# x86-64 System V ABI calling convention:
# Arguments: RDI (a), RSI (b), RDX, RCX, R8, R9 (first 6 integer args)
# Return value: RAX

# Generated x86-64 assembly (clang -O2):
# add:
# lea eax, [rdi + rsi] ; EAX = RDI + RSI (LEA = load effective address)
# ; LEA is used here because it's 1 cycle vs 2 for ADD
# ret ; return (EAX is the return value)

# Notice: the compiler used LEA instead of ADD.
# LEA computes address arithmetic (base + index) in 1 cycle.
# ADD takes 1 cycle but also sets flags (ZF, CF, OF, SF).
# Since we don't need the flags here, LEA is equally fast AND
# doesn't modify flags, which may allow better scheduling.
# This is the kind of micro-optimization compilers do automatically.

# REGISTER ALLOCATION: graph coloring
# The register allocator must fit all live variables into the limited
# set of CPU registers (16 on x86-64).

# INTERFERENCE GRAPH:
# Create a node for each variable.
# Add an edge between two variables if they are simultaneously live
# (both needed at the same point in the program).
# The register allocation problem = graph coloring with k colors,
# where k = number of available registers.

# If a variable can't get a register, it's 'spilled' to the stack.
# Spilling means: every access to that variable is a memory load/store.
# Too many spills dramatically slow the generated code.
# This is why compilers sometimes produce better code for functions
# with fewer local variables (more fit in registers).

# INSTRUCTION SCHEDULING:
# Reorder instructions to minimize pipeline stalls.
# Especially important for memory operations (long latency).
# If instruction B depends on a load from instruction A,
# schedule other independent instructions between A and B
# so the CPU can hide the load latency with useful work.

# Example (scheduling to hide load latency):
# UNSCHEDULED (bad):
# LOAD RAX, [address_A] ; 60ns if cache miss
# ADD RBX, RAX ; must wait 60ns for RAX to be ready
\`\`\`

#

\`\`\`python
# SCHEDULED (good — interleave independent work):
# LOAD RAX, [address_A] ; start load (60ns in flight)
# LOAD RCX, [address_B] ; start another independent load
# ADD RDX, R8 ; do independent addition while both loads happen
# ADD RBX, RAX ; RAX ready by now (60ns has passed)
\`\`\`

---`
  },
  {
    id: "7-8",
    number: "7.8",
    title: "Code Generation: From IR to Machine Code",
    content: `Python is not compiled to native machine code (by default). The CPython reference implementation compiles Python source to bytecode — a sequence of instructions for a virtual machine (VM) — and then interprets the bytecode at runtime. Understanding CPython's VM explains Python's performance characteristics and guides optimization decisions.

### 7.8.1 Python Bytecode: What Actually Executes


\`\`\`python
import dis, sys

def add_numbers(a, b):
result = a + b
return result

# dis.dis() shows the bytecode CPython will execute:
\`\`\`

dis.dis(add_numbers)


\`\`\`python
# Output:
# 2 0 RESUME 0
\`\`\`

#

\`\`\`python
# 3 2 LOAD_FAST 0 (a) ← push 'a' onto eval stack
# 4 LOAD_FAST 1 (b) ← push 'b' onto eval stack
# 6 BINARY_OP 0 (+) ← pop a,b; push a+b
# 10 STORE_FAST 2 (result) ← pop; store in 'result'
\`\`\`

#

\`\`\`python
# 4 12 LOAD_FAST 2 (result) ← push 'result'
# 14 RETURN_VALUE ← return top of stack

# CPYTHON EXECUTION MODEL:
# The CPython VM uses a STACK-BASED evaluation model.
# All operations work on a virtual 'evaluation stack'.
# LOAD_FAST pushes a local variable onto the stack.
# BINARY_OP pops two values, performs the operation, pushes result.
# STORE_FAST pops a value and stores it in a local variable slot.

# WHY THIS IS SLOW:
# 1. Dispatch overhead: for each bytecode, CPython executes a C switch
# statement to find the handler. This is 5-20 CPU instructions overhead
# per Python bytecode, BEFORE doing any actual work.
\`\`\`

#

\`\`\`python
# 2. Dynamic dispatch for EVERY operation:
# BINARY_OP for '+' must check: are both objects integers? Both floats?
# One string? Call __add__? Call __radd__? This flexibility requires
# multiple pointer dereferences and type checks for every operation.
# In C: a + b is 1 instruction. In Python: a + b is ~50 instructions.
\`\`\`

#

\`\`\`python
# 3. Reference counting on every operation:
# Every LOAD_FAST increments ob_refcnt. Every STORE_FAST decrements.
# This adds atomic memory operations to every variable access.

# PYTHON 3.11+ IMPROVEMENTS:
# Specializing adaptive interpreter: after observing that a BINARY_OP
# has always been called with two integers, it replaces the generic
# BINARY_OP with BINARY_OP_ADD_INT — a specialized version that skips
# the type checks. This is a form of inline caching.
# Result: 10-60% speedup on CPU-bound Python code (Python 3.11 benchmark).

# PYTHON 3.13 NO-GIL:
# Experimental build that removes the Global Interpreter Lock.
# Allows true CPU parallelism with threads.
# Uses per-object biased reference counting to reduce synchronization overhead.
# Expected to become stable around Python 3.14.

# Inspecting bytecode of any Python code:
import dis
code_str = 'x = [i**2 for i in range(10)]'
compiled = compile(code_str, '<string>', 'exec')
\`\`\`

dis.dis(compiled) # shows all bytecode including list comprehension`
  },
  {
    id: "7-9",
    number: "7.9",
    title: "Linking: Static and Dynamic",
    content: `Just-In-Time (JIT) compilation bridges the gap between interpretation (slow, flexible) and ahead-of-time compilation (fast, inflexible). A JIT compiler monitors program execution, identifies hot code paths (code executed frequently), compiles them to native machine code at runtime, and replaces the interpreted execution with the compiled code — all without stopping the program.

### 7.9.1 The JVM HotSpot JIT


\`\`\`python
# THE JVM EXECUTION MODEL:

# Phase 1: Source → Bytecode (at development time, by javac)
# Java source: int add(int a, int b) { return a + b; }
# Bytecode: iload_0 iload_1 iadd ireturn
# This bytecode is platform-independent (runs on any JVM)

# Phase 2: Bytecode → Interpreted execution (at startup)
# The JVM interpreter runs bytecode directly.
# This is slow but starts immediately.
# Simultaneously: the JVM PROFILES execution.

# Phase 3: Hot code detection
# The JVM counts how many times each method is called.
# Default threshold: 10,000 invocations (or 10,000 loop iterations).
# When a method hits the threshold: it's 'hot'.

# Phase 4: JIT compilation of hot methods
# The HotSpot C1 (client) compiler: fast compilation, moderate optimization.
# The HotSpot C2 (server) compiler: slow compilation, heavy optimization.
# Tiered compilation: C1 first (fast startup), then C2 (maximum performance).

# Phase 5: Optimistic optimization using RUNTIME PROFILES
# This is what makes JITs potentially FASTER than AOT compilers!
\`\`\`

#

\`\`\`python
# Example: polymorphic dispatch
# interface Shape { double area(); }
# class Circle implements Shape { ... }
# class Square implements Shape { ... }
\`\`\`

#

\`\`\`python
# In AOT compilation: shape.area() must be a virtual dispatch.
# Can't inline — don't know the concrete type at compile time.
\`\`\`

#

\`\`\`python
# In JIT compilation: the JVM observes that in practice,
# 99.9% of calls to shape.area() are on Circle objects.
# It generates: if (shape is Circle) { inlined_circle_area }
# else { slow_path_virtual_dispatch }
# This is called 'inline caching' or 'speculative inlining'.
# Result: the common case (Circle) runs WITHOUT a virtual dispatch.
# This can be FASTER than C++ with static dispatch!

# DEOPTIMIZATION:
# The JVM's speculation can be wrong.
# If shape.area() is called with a Square after the JIT assumed Circle,
# the JVM 'deoptimizes': discards the compiled code and falls back
# to interpretation or recompiles with more general assumptions.
# Deoptimization is expensive but rare if the speculations are good.

# JVM WARMUP IMPLICATIONS FOR PRODUCTION:
# JIT compilation takes time and CPU.
# For the first 1-5 seconds after JVM startup:
# - Bytecode is interpreted (slow)
# - JIT compiler is running in background threads
# - Memory use is higher (bytecode + compiled code both present)
# After warmup: JIT-compiled code can match or exceed C performance
# for many workloads.
\`\`\`

#

\`\`\`python
# BEST PRACTICES for JVM services:
# 1. Warm up before exposing to production traffic
# (send synthetic requests to trigger JIT compilation of hot paths)
# 2. Don't benchmark JVM code without warmup
# 3. Use -XX:+PrintCompilation to see what the JIT is compiling
# 4. Use async-profiler to see flame graph including JIT decisions
# 5. Use GraalVM Native Image for serverless (AOT compilation, no JIT overhead)

# JVM JIT flags that matter:
# -server: Enable C2 (server) compiler
# -XX:+PrintCompilation: Log JIT compilation activity
# -XX:CompileThreshold=N: Set hot method threshold (default 10000)
# -XX:+OptimizeStringConcat: Optimize string concatenation
# -XX:+EliminateLocks: Eliminate locks on non-shared objects (lock elision)
\`\`\`

### 7.9.2 V8: JavaScript's JIT Compiler


\`\`\`python
# V8 (Chrome, Node.js) is one of the most sophisticated JIT compilers ever built.
# Its design reveals deep insights about dynamic language optimization.

# V8 COMPILATION PIPELINE (2023):
# 1. Parser: JavaScript → AST
# 2. Ignition interpreter: AST → bytecode; starts executing immediately
# 3. SparkPlug: simple one-pass compiler; fast non-optimizing compilation
# 4. Maglev: mid-tier optimizing JIT (new in 2023)
# 5. TurboFan: full optimizing JIT (most sophisticated, slowest to compile)

# V8's HIDDEN CLASSES: the key to JavaScript performance
\`\`\`

#

\`\`\`python
# JavaScript is dynamically typed. Objects can have any properties.
# This would seem to require a dictionary lookup for every property access.
# V8 avoids this with 'hidden classes' (also called 'shapes' or 'maps').
\`\`\`

#

\`\`\`python
# When you write: const p = { x: 1, y: 2 }
# V8 creates a hidden class C0: { x at offset 0, y at offset 8 }
# p's properties are stored in a fixed array: [1, 2]
# Property access p.x: just array[0] — no dictionary lookup!

# When you add a property: p.z = 3
# V8 creates a new hidden class C1: { x at 0, y at 8, z at 16 }
# Transitions: C0 --'add z'--> C1
# All objects that follow the same creation pattern share the same hidden class.

# INLINE CACHING in V8:
# The first time V8 executes: obj.toString()
# It checks obj's hidden class, finds the toString method.
# It then stores: 'for hidden class HC42, toString is at offset 24'
# Next time (same hidden class): skip the lookup entirely.
# This makes property access O(1) in practice, not O(dictionary_size).

# WHAT BREAKS V8 OPTIMIZATION (makes JavaScript slow):

# 1. Adding properties after object creation (changes hidden class):
# SLOW:
\`\`\`

function Point(x, y) {
this.x = x; // hidden class C0: {x}
this.y = y; // hidden class C1: {x, y}
}
const p = new Point(1, 2);
p.z = 3; // hidden class C2: {x, y, z} — DIFFERENT from other Points!


\`\`\`python
# 2. Changing property types (monomorphism → polymorphism):
\`\`\`

function add(a, b) { return a + b; }

\`\`\`python
add(1, 2); // V8 specializes for integer addition
add(1.5, 2.5); // V8 recompiles for float addition
add('a', 'b'); // V8 deoptimizes to generic (polymorphic) version
# Once polymorphic, stays polymorphic and loses optimization

# 3. Deleting properties:
\`\`\`

delete obj.x; // creates a 'holey' hidden class — much less optimizable


\`\`\`python
# BEST PRACTICES for fast JavaScript:
# - Always initialize all object properties in the constructor
# - Keep property types consistent (don't change from int to float to string)
# - Don't delete properties
# - Avoid mixing types in arrays (all-int arrays are faster than mixed)
\`\`\``
  },
  {
    id: "7-10",
    number: "7.10",
    title: "Just-In-Time Compilation: V8, HotSpot, PyPy",
    content: `The Rust compiler (rustc, built on LLVM) is unique among mainstream compilers because it enforces memory safety and data race freedom at compile time through the borrow checker. Understanding how the borrow checker works reveals why Rust can achieve C performance without garbage collection and without memory safety vulnerabilities.

### 7.10.1 How the Borrow Checker Works


\`\`\`python
# THE BORROW CHECKER: Rust's compile-time memory manager

# OWNERSHIP RULES (enforced at compile time):
# 1. Each value has exactly one owner.
# 2. When the owner goes out of scope, the value is dropped (freed).
# 3. Ownership can be transferred (moved) but not copied (unless implementing Copy).

# BORROW RULES:
# At any point: EITHER (any number of immutable references)
# OR (exactly one mutable reference)
# A reference must never outlive the value it refers to.

# HOW THE COMPILER ENFORCES THIS:

# Step 1: Parse → AST (same as any compiler)

# Step 2: Name resolution and type inference
# Infer types using Hindley-Milner type inference.
# Resolve all name references.

# Step 3: Lifetime analysis
# Assign a LIFETIME to every reference.
# Lifetime = the scope for which the reference is valid.
# Verify that references don't outlive their referents.
# This is done via constraint solving:
# collect all lifetime constraints from the code,
# solve the constraint system,
# if unsolvable: emit an error.

# Step 4: Borrow checking
# Track which variables are borrowed at each point.
# Verify that borrow rules are never violated.
# Uses a 'non-lexical lifetimes' (NLL) algorithm since Rust 2018.

# CONCRETE EXAMPLE: why this code is rejected by the borrow checker

# fn main() {
# let mut v = vec![1, 2, 3];
# let first = &v[0]; // immutable borrow of v
# v.push(4); // MUTABLE borrow of v -- ERROR!
# println!("{}", first); // first is still in scope
# }

# Error: cannot borrow \`v\` as mutable because it is also borrowed as immutable
# |
# | let first = &v[0]; // immutable borrow occurs here
# | v.push(4); // mutable borrow occurs here
# | println!("{}", first); // immutable borrow later used here

# WHY THIS IS CORRECT:
# Vec::push() may reallocate the backing array (if capacity is full).
# If the array is reallocated, 'first' points to FREED memory.
# Dereferencing 'first' after push() is a use-after-free bug.
# In C++: this is undefined behavior — program may crash or silently corrupt.
# In Rust: the compiler REFUSES to compile this code.
# No runtime check needed. No garbage collector needed.
# Pure compile-time analysis prevents the bug entirely.

# THE FIX: either clone the value or don't hold the reference across push():
# fn main() {
# let mut v = vec![1, 2, 3];
# let first = v[0]; // copy the value (i32 implements Copy)
# v.push(4); // fine: no reference to v exists
# println!("{}", first); // first is the copied value, always valid
# }

# WHAT THE BORROW CHECKER ENABLES:
# - No use-after-free bugs (caught at compile time)
# - No dangling pointers (lifetime system prevents it)
# - No data races in concurrent code (mutable aliasing prevented)
# - No double-free (exactly one owner, freed exactly once)
# ALL WITH ZERO RUNTIME OVERHEAD — it's all compile-time analysis.
# This is why Rust can match C performance with C++-level safety.
\`\`\``
  },
  {
    id: "7-11",
    number: "7.11",
    title: "Ahead-of-Time Compilation: GCC, Clang, Rust/LLVM",
    content: `WebAssembly (WASM) is a binary instruction format designed as a portable compilation target. It runs in web browsers, server-side (via Wasmtime, Wasmer), and in embedded systems. It provides near-native performance with strong sandboxing guarantees. C, C++, Rust, Go, Python, and dozens of other languages compile to WASM.

\`\`\`python
# WEBASSEMBLY: the universal portable binary format

# WASM key properties:
# - Binary format: compact, fast to parse (unlike JavaScript text)
# - Stack-based VM: simple, portable instruction set
# - Linear memory: flat byte array (no pointers outside the sandbox)
# - Sandboxed: cannot access host memory or APIs except through imports
# - Near-native performance: typically 10-50% slower than native
# - Platform-independent: same .wasm file runs on x86, ARM, RISC-V

# WASM in the browser (JavaScript interop):
# The WASM module gets a linear memory buffer.
# JS can read/write this memory: new Uint8Array(wasmModule.memory.buffer)
# WASM functions can be called from JS and vice versa (with type coercion).

# EXAMPLE: Compiling Rust to WASM
# Rust code:
# #[no_mangle]
# pub fn fibonacci(n: u32) -> u64 {
# if n <= 1 { return n as u64; }
# let mut a = 0u64; let mut b = 1u64;
# for _ in 2..=n { let c = a + b; a = b; b = c; }
# b
# }

# Compile: cargo build --target wasm32-unknown-unknown --release
# Use in browser:
# const wasm = await WebAssembly.instantiateStreaming(fetch('fib.wasm'));
# console.log(wasm.instance.exports.fibonacci(40)); // ~3.5M — fast!

# WASM OUTSIDE THE BROWSER (WASI):
# WASI = WebAssembly System Interface
# Provides: file I/O, networking, random numbers, clock
# through a standardized capability-based API.
# Docker: 'If WASM had existed in 2008, we would not have created Docker'
# — Solomon Hykes, Docker creator
# WASM containers: smaller than Docker images, faster startup, better isolation.

# WHERE WASM IS USED TODAY:
# - Figma: design tool rendered in browser via WASM (C++ → WASM)
# - Google Earth: geospatial rendering in browser
# - Cloudflare Workers: edge computing with WASM isolation
# - Fastly Compute@Edge: WASM-based serverless
# - Game streaming: run games in browser via WASM
# - Plugin systems: safe plugins in VS Code, Envoy proxy (WASM filters)
\`\`\``
  },
  {
    id: "7-12",
    number: "7.12",
    title: "Interpreter Architectures: AST Walkers, Bytecode VMs",
    content: `COMPLETE LEXER: Extend the lexer from this chapter to handle: multi-line strings with triple quotes, f-strings (just tokenize the outer structure), hex literals (0xFF), binary literals (0b1010), underscore separators in numbers (1_000_000). Write tests for all edge cases including: unterminated strings, invalid characters, empty file, file with only comments.
EXPRESSION EVALUATOR: Using the lexer and parser from this chapter, build a complete expression evaluator that handles: all arithmetic operators, comparison operators, boolean operators (and/or/not), variable assignment and lookup, function calls for built-in math functions (sin, cos, sqrt, abs). Test with at least 20 expressions including edge cases.
BYTECODE VM: Implement a stack-based virtual machine with the following instructions: PUSH (literal), LOAD (variable), STORE (variable), ADD, SUB, MUL, DIV, NEG, EQ, LT, JUMP, JUMP_IF_FALSE, CALL, RETURN, HALT. Write a compiler that translates your parser's AST into this bytecode. Execute: (a) recursive factorial, (b) iterative fibonacci, (c) bubble sort on a list.
OPTIMIZATION PASS: Implement constant folding as a tree transformation pass. Walk the AST after parsing. If you encounter BinaryOp('+', NumberLiteral(2), NumberLiteral(3)), replace it with NumberLiteral(5). Handle: all arithmetic operators, comparison operators (2 > 1 → True), boolean operators on literal values. Measure how many nodes are eliminated in a typical expression-heavy program.
HIDDEN CLASS EXPERIMENT (JavaScript): Write JavaScript benchmarks that demonstrate V8's hidden class optimization. Create 1 million objects (a) all with the same shape (same properties in same order) and (b) with different shapes (different property order). Access a property on each. Measure the performance difference. Explain the result in terms of inline caches and hidden classes.
WASM EXPERIMENT: Write a computationally intensive function in Rust (e.g., computing the first N primes using a sieve). Compile it to WASM. Implement the same algorithm in JavaScript. Benchmark both in Node.js (using the wasm file via fs.readFileSync). Measure the speedup. Explain the difference in terms of the JavaScript JIT vs WASM's pre-compiled structure.
Chapter 7 — Twelve Compiler Engineering Truths
Lexical analysis converts characters to tokens using regular expressions / DFAs. Every keyword, operator, and literal is a token with a type and lexeme.
Parsing converts tokens to an AST using a context-free grammar. Operator precedence emerges from grammar hierarchy, not special rules.
Semantic analysis catches meaning errors: undefined variables, type mismatches, wrong argument counts. The symbol table maps names to types and scopes.
SSA form (each variable assigned once) makes optimization passes dramatically simpler. Constant propagation and dead code elimination become trivial.
The major optimizations: constant folding, inlining, loop invariant code motion, vectorization, and register allocation. -O2 enables most of them.
CPython is slow because every operation involves dynamic dispatch, type checking, and reference counting — 50× more instructions than C for the same operation.
JIT compilers use runtime profiles to make optimistic optimizations (speculative inlining) that AOT compilers cannot. This is why Java can match C++ performance.
V8's hidden classes make JavaScript property access O(1) by giving dynamically-typed objects fixed-offset layouts. Violating shape consistency defeats this optimization.
The Rust borrow checker enforces memory safety at compile time via lifetime analysis and aliasing rules. Zero runtime overhead, zero garbage collector needed.
Vectorization (auto-SIMD) can give 4-16× speedup on array operations. It requires: no loop-carried dependencies, no aliasing, contiguous memory access.
Register allocation is graph coloring: variables are nodes, simultaneously-live variables get an edge, registers are colors. Spilling to memory is expensive.
WebAssembly is the new universal portable binary. It runs everywhere — browser, server, edge — with near-native performance and strong sandboxing.

CHAPTER 8
COMPUTATION THEORY
What Can and Cannot Be Computed — The Mathematical Foundation of All Software

"Computer science is no more about computers than astronomy is about telescopes." — Edsger W. Dijkstra`
  },
  {
    id: "7-13",
    number: "7.13",
    title: "CPython's Bytecode VM: A Complete Tour",
    content: `Python is often called an "interpreted" language, but it's more accurate to call it a **Bytecode-Compiled** language. When you run a \`.py\` file, Python compiles it to \`.pyc\` (bytecode) and then runs it on the **CPython VM**.

## The Dispatch Loop
The core of CPython is a file called \`ceval.c\`. It contains a massive loop that fetches the next bytecode instruction and executes it.

\`\`\`c
// Conceptual CPython Dispatch
for (;;) {
    opcode = NEXT_OPCODE();
    switch (opcode) {
        case TARGET(BINARY_ADD):
            PyObject *right = POP();
            PyObject *left = POP();
            PyObject *res = PyNumber_Add(left, right);
            PUSH(res);
            break;
        // ... hundreds more cases
    }
}
\`\`\`

## Key Characteristics
- **Stack-Based**: Uses a value stack for almost all operations.
- **Object Model**: Everything in the VM is a \`PyObject*\`. Even an integer is a heap-allocated object, which is why Python is slower than C.
- **The GIL**: The **Global Interpreter Lock** ensures that only one thread executes Python bytecode at a time, protecting the VM's internal state but limiting multi-core performance.

## Inspection
You can see the bytecode yourself using the \`dis\` module:
\`\`\`python
import dis
def example(a, b):
    return a + b

dis.dis(example)
# Output:
#  2           0 LOAD_FAST                0 (a)
#              2 LOAD_FAST                1 (b)
#              4 BINARY_ADD
#              6 RETURN_VALUE
\`\`\`
Understanding bytecode is essential for debugging weird performance issues or building advanced tools like debuggers and profilers.`
  },
  {
    id: "7-14",
    number: "7.14",
    title: "The JVM: Class Loading, JIT Tiers, Deoptimization",
    content: `The **Java Virtual Machine (JVM)** is arguably the most sophisticated piece of software ever written. It is a high-performance, industrial-grade runtime environment.

## Dynamic Class Loading
Unlike a C++ binary, the JVM loads code (\`.class\` files) lazily. When your code references a class for the first time, the **ClassLoader** finds the file, verifies the bytecode for safety, and links it into the running system. This allows for powerful features like **Reflection** and hot-swapping code.

## Multi-Tiered Compilation
The JVM doesn't just have one JIT; it has several:
1.  **Interpreter**: Runs code immediately.
2.  **C1 (Client) Compiler**: Quickly generates machine code with basic optimizations.
3.  **C2 (Server) Compiler**: The "Heavyweight" optimizer. It takes longer but produces code that rivals C++.

## Deoptimization and Guarding
The JVM makes "speculative" assumptions. For example, it might notice that a certain interface only ever has one implementation in the current program. It will then **Inline** that implementation directly.
If you later load a JAR that provides a *second* implementation, the JVM's assumptions are invalidated. It will **Deoptimize** (reverting the affected machine code back to interpreted mode) and then potentially re-compile it with the new information. This "Class Hierarchy Analysis" (CHA) is why Java can often inline virtual calls that C++ cannot.`
  },
  {
    id: "7-15",
    number: "7.15",
    title: "Language Runtime Services: Type System, Reflection, FFI",
    content: `A **Language Runtime** is the set of services that support the execution of a program. It is the environment in which your code lives.

## Type Systems
The runtime manages how types are represented in memory. In a language like Python or JavaScript, every value is "tagged" with its type. In Java, objects have a **Header** that points to their class definition.

## Reflection and Introspection
Reflection is the ability of a program to examine and modify its own structure at runtime.
- **Introspection**: "What fields does this object have?"
- **Modification**: "Set the field named 'id' to 5."
Reflection is powerful but usually slow, as it bypasses the compiler's optimizations and requires lookups in the runtime's metadata.

## Foreign Function Interface (FFI)
No language is an island. **FFI** allows a language (like Python) to call functions written in another language (like C). This is how libraries like **NumPy** or **TensorFlow** achieve high performance while remaining easy to use.
The runtime handles the "marshalling"—converting Python objects into C-compatible pointers and back.

## Exception Handling
The runtime also manages the "unwinding" of the stack when an exception is thrown. It must find the nearest \`try/catch\` block and ensure that resources (like memory or file handles) are cleaned up correctly. This "Zero-cost exception" model in C++ means you pay nothing until an exception actually occurs, but the binary size increases to store "unwind tables."`
  },
  {
    id: "7-16",
    number: "7.16",
    title: "WASM: The New Portable Binary",
    content: `**WebAssembly (WASM)** is a low-level, binary instruction format for a stack-based virtual machine. While originally designed for the web, it is rapidly becoming a universal sandboxing technology for servers and edge computing.

## Why WASM?
Before WASM, the only way to run code in the browser was JavaScript. JS is high-level and dynamically typed, which makes it hard for the browser's JIT to optimize quickly.
WASM is:
- **Fast**: It is designed to be mapped directly to machine code.
- **Secure**: It runs in a memory-safe sandbox (it cannot access the host's memory unless explicitly allowed).
- **Portable**: The same \`.wasm\` file runs on Windows, Mac, Linux, and inside the browser.

## The WASM Memory Model
WASM uses a **Linear Memory** model. The program sees a single, contiguous array of bytes. There is no heap or garbage collector built into the core spec; the language you compile to WASM (like Rust or C++) must bring its own memory allocator.

## Beyond the Browser (WASI)
The **WebAssembly System Interface (WASI)** provides a standardized API for WASM modules to interact with the OS (files, network, clock). This allows WASM to run on servers, potentially replacing Docker containers for some use cases because WASM modules start up in microseconds, compared to milliseconds or seconds for containers.

## Example Use Case
Figma moved their C++ engine to WASM, resulting in a 3x speedup over their previous asm.js implementation. Photoshop and Google Earth also run in the browser today thanks to WASM.`
  },
  {
    id: "7-17",
    number: "7.17",
    title: "Case Study: V8's Hidden Classes and Inline Caches",
    content: `JavaScript is a dynamic language where objects can change shape at any time:
\`\`\`js
let obj = { x: 1 };
obj.y = 2; // Shape changed!
\`\`\`
To optimize this, Google's V8 engine uses a technique called **Hidden Classes** (also known as Maps or Shapes).

## Hidden Classes
When you create an object, V8 assigns it a hidden class (e.g., \`C0\`). When you add a property \`y\`, V8 creates a *new* hidden class \`C1\` and sets up a "transition" from \`C0\` to \`C1\`.
If you create many objects with the same properties in the same order, they will share the same hidden class. This allows the engine to predict where a property is located in memory (offset) instead of doing a slow hash map lookup.

## Inline Caches (IC)
The first time a function accesses \`obj.x\`, V8 looks up the offset for \`x\` in the hidden class. It then **caches** that offset directly in the machine code of the function.
Next time the function runs, it checks: "Is this object's hidden class still \`C0\`?" If yes, it uses the cached offset. This turns a complex lookup into a single comparison and a memory load.

## The "Deopt" Trap
If you write "polymorphic" code where a function receives objects of many different shapes, the Inline Cache becomes "Megamorphic." V8 gives up on the fast path and falls back to a slow generic lookup.
**Engineering Lesson**: For maximum JS performance, always initialize your object properties in the constructor and in a consistent order. This ensures your objects share hidden classes and stay on the "Fast Path."`
  },
  {
    id: "7-18",
    number: "7.18",
    title: "Case Study: How Rust's Borrow Checker Works",
    content: `Rust's **Borrow Checker** is a unique compiler component that enforces memory safety without a Garbage Collector. It works during the **Semantic Analysis** phase.

## Ownership and Lifetimes
The borrow checker tracks the **Lifetime** of every variable. It ensures three rules are never broken:
1. Each value has a single owner.
2. You can have many immutable references (\`&T\`).
3. You can have exactly ONE mutable reference (\`&mut T\`), and no other references can exist at that time.

## Data Flow Analysis
The borrow checker doesn't just look at the code; it analyzes the **Control Flow Graph (CFG)**. It tracks "loans" across the graph.

\`\`\`rust
let mut x = 5;
let y = &x;     // Loan of x begins
println!("{}", y);
x = 10;         // Error! Cannot mutate while a loan is active
\`\`\`

## Non-Lexical Lifetimes (NLL)
Early Rust was too strict. It considered a loan active until the end of the block (\`}\`). Modern Rust (NLL) is smarter; it sees that \`y\` is not used after the \`println\`, so it "ends" the loan early, allowing \`x = 10\` to succeed.

## Zero-Cost Abstraction
The amazing thing about the borrow checker is that it's entirely **Compile-Time**. Once the code passes the check, all the lifetime information is stripped away. The final machine code is exactly the same as if you had written manual memory management in C, but with a mathematical guarantee that you won't have Use-After-Free or Data Races.`
  },
  {
    id: "7-19",
    number: "7.19",
    title: "Exercises",
    content: `Test your understanding of compilers and language runtimes with these exercises.

## Exercise 1: Lexical Analysis
**Question**: Given the following regexes for tokens:
- \`KEYWORD\`: \`if|else|while\`
- \`ID\`: \`[a-z]+\`
- \`NUM\`: \`[0-9]+\`
How would the string "while10" be lexed?
**Answer**: It would be lexed as a single \`ID\` token ("while10") because the regex for \`ID\` would likely be matched greedily or it would fail \`KEYWORD\` because "while10" != "while". (Actual behavior depends on "maximal munch" rules).

## Exercise 2: AST Construction
**Question**: Draw the AST for \`a = b + c * d\`.
**Answer**: 
\`\`\`text
    =
   / \\
  a   +
     / \\
    b   *
       / \\
      c   d
\`\`\`

## Exercise 3: Three-Address Code
**Question**: Convert \`y = (a + b) * (c - d)\` into 3AC.
**Answer**:
\`\`\`text
t1 = a + b
t2 = c - d
y = t1 * t2
\`\`\`

## Exercise 4: Optimization
**Question**: What optimization is being applied here?
Before: \`for(int i=0; i<x; i++) { printf("%d", 5 * 2); }\`
After: \`int tmp = 10; for(int i=0; i<x; i++) { printf("%d", tmp); }\`
**Answer**: **Loop-Invariant Code Motion** (moving calculations that don't change inside a loop to the outside) and **Constant Folding** (calculating \`5 * 2\` at compile time).

## Exercise 5: Register Allocation
**Question**: If variables A and B are never used at the same time, can they share a register?
**Answer**: Yes. Their live ranges do not overlap, so they do not "interfere" in the interference graph.

## Exercise 6: JIT vs AOT
**Question**: Why might a JIT-compiled program eventually run *faster* than an AOT-compiled one?
**Answer**: Because a JIT has access to runtime information (Profile-Guided Optimization) and can perform speculative optimizations based on actual data types and branch probabilities.

## Exercise 7: V8 Hidden Classes
**Question**: Why is \`{a:1, b:2}\` a different hidden class than \`{b:2, a:1}\`?
**Answer**: Because V8 tracks the *order* of property addition to build its transition graph. Different orders lead to different transition paths and different hidden classes.

## Exercise 8: Linking
**Question**: What is the primary difference between a "Symbol Not Found" error at compile time vs. at link time?
**Answer**: A compiler error means the *declaration* is missing (you didn't include the header). A linker error means the *definition* is missing (you didn't link the actual library containing the function).`
  }
];
