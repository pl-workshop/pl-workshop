import { Box, Button, Textarea } from "@chakra-ui/react";
import { useState } from "react";
import { generate } from "pegjs";
import { Tree, TreeNode } from "react-organizational-chart";
import AceEditor from "react-ace";
import "ace-builds/src-noconflict/mode-javascript";
import "ace-builds/src-noconflict/theme-chrome";

function App() {
  let [input, setInput] = useState("");
  let [parserDef, setParserDef] = useState(initial_definition);
  let [result, setResult] = useState();
  let [evalcode, setEvalcode] = useState(initial_evalcode);
  let [evalResult, setEvalResult] = useState("");
  return (
    <>
      <Box>grammer</Box>
      <AceEditor
        mode="javascript"
        theme="chrome"
        value={parserDef}
        width="100%"
        minLines={10}
        maxLines={50}
        readOnly={false}
        fontSize={16}
        enableBasicAutocompletion={true}
        onChange={(s) => {
          setParserDef(s);
        }}
      />
      <Box>input</Box>
      <Textarea
        placeholder="peg.js"
        value={input}
        onChange={(e) => setInput(e.target.value)}
      />
      <Button
        colorScheme="green"
        onClick={() => {
          try {
            const parser = generate(parserDef + integer_whitespace_definition);
            setResult(parser.parse(input));
          } catch (e) {
            alert(e);
          }
        }}
      >
        Parse!
      </Button>
      <Box>result: {JSON.stringify(result)}</Box>
      <Box>tree</Box>
      {result && <Tree label={<div>Root</div>}>{ast2tree(result)}</Tree>}
      <Box>eval</Box>
      <AceEditor
        mode="javascript"
        theme="chrome"
        value={evalcode}
        width="100%"
        minLines={10}
        maxLines={50}
        readOnly={false}
        fontSize={16}
        enableBasicAutocompletion={true}
        onChange={(s) => {
          setEvalcode(s);
        }}
      />
      <Button
        colorScheme="green"
        onClick={() => {
          setEvalResult(Function(evalcode + `;return eval;`)()(result));
        }}
      >
        eval!
      </Button>
      <Box>eval result: {evalResult}</Box>
    </>
  );
}

const initial_definition = `start = Expression
Expression = Factor
Factor = num: Integer {
    return {tag: "Number", value: num}
}`;

const integer_whitespace_definition = `
Integer "integer"
  = _ [0-9]+ { return parseInt(text(), 10); }

Ident "ident"
  = _ [a-z]+ { return text() }

_ "whitespace"
  = [ \\t\\n\\r]*
`;

const initial_evalcode = `const eval = (ast) => {
    switch (ast.tag) {
        case "Number": return ast.value
    }
}`;

type AST = { tag: string; [key: string]: AST } | number | string | boolean;

function ast2tree(ast: AST) {
  if (
    typeof ast === "number" ||
    typeof ast === "string" ||
    typeof ast === "boolean"
  ) {
    return <TreeNode label={<div>{ast}</div>} />;
  } else {
    return (
      <TreeNode label={<div>{ast.tag}</div>}>
        {Object.keys(ast)
          .filter((key: string) => key !== "tag")
          .map((key: string, index) => (
            <TreeNode key={index} label={<div>{key}</div>}>
              {ast2tree(ast[key])}
            </TreeNode>
          ))}
      </TreeNode>
    );
  }
}

export default App;
