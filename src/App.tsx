import { Box, Button, Textarea } from "@chakra-ui/react";
import {
  JSXElementConstructor,
  ReactElement,
  ReactFragment,
  useState,
} from "react";
import { generate } from "pegjs";
import { Tree, TreeNode } from "react-organizational-chart";

function App() {
  let [input, setInput] = useState("");
  let [parser, setParser] = useState(
    generate(initial_definition + integer_whitespace_definition)
  );
  let [result, setResult] = useState();
  let [evalcode, setEvalcode] = useState(initial_evalcode);
  let [evalResult, setEvalResult] = useState("");
  return (
    <>
      <Box>grammer</Box>
      <Textarea
        placeholder="peg.js"
        defaultValue={initial_definition}
        onChange={(e) => {
          console.log(e.target.value + integer_whitespace_definition);
          setParser(generate(e.target.value + integer_whitespace_definition));
        }}
      />
      <Box>input</Box>
      <Textarea
        placeholder="peg.js"
        value={input}
        onChange={(e) => setInput(e.target.value)}
      />
      <Button
        onClick={() => {
          setResult(parser.parse(input));
        }}
      >
        Parse!
      </Button>
      <Box>result: {JSON.stringify(result)}</Box>
      <Box>tree</Box>
      {result && <Tree label={<div>Root</div>}>{ast2tree(result)}</Tree>}
      <Box>eval</Box>
      <Textarea
        placeholder="eval"
        defaultValue={initial_evalcode}
        onChange={(e) => {
          setEvalcode(e.target.value);
        }}
      />
      <Button
        onClick={() => {
          setEvalResult(
            Function(evalcode + `;return eval(${JSON.stringify(result)});`)()
          );
        }}
      >
        eval!
      </Button>
      <Box>eval result: {evalResult}</Box>
    </>
  );
}

const initial_definition = `start = Expression
Expression = head: Factor tail: ("+" Factor)* {
return tail.reduce((result, element) => {return {tag: "Add", lh: result, rh: element[1]}}, head)
}

Factor = num: Integer {
return {tag: "Number", value: num}
}`;

const integer_whitespace_definition = `
Integer "integer"
  = _ [0-9]+ { return parseInt(text(), 10); }

_ "whitespace"
  = [ \\t\\n\\r]*
`;

const initial_evalcode = `const eval = (ast) => {
    switch (ast.tag) {
        case "Number": return ast.value
    }
}`;

type AST = { tag: string } | number;

function ast2tree(ast: any) {
  if (typeof ast === "number") {
    return <TreeNode label={<div>{ast}</div>} />;
  } else {
    return (
      <TreeNode label={<div>{ast.tag}</div>}>
        {Object.keys(ast)
          .filter((key: string) => key !== "tag")
          .map((key: string) => (
            <TreeNode label={<div>{key}</div>}>{ast2tree(ast[key])}</TreeNode>
          ))}
      </TreeNode>
    );
  }
}

export default App;
