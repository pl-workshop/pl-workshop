import { Box, Button, Textarea } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { generate } from "pegjs";
import Blockly from "blockly";
import GrammerDefWorkspace from "./components/GrammerDefWorkspace";

function App() {
  let [input, setInput] = useState("");
  let [parser, setParser] = useState(generate('start = ""'));
  let [result, setResult] = useState("");
  let [javascriptCode, setJavascriptCode] = useState("");
  return (
    <>
      <Box>grammer</Box>
      <Textarea
        placeholder="peg.js"
        onChange={(e) => {
          setParser(generate(e.target.value));
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
      <Box>result: {result}</Box>
      <Box>GrammerDefinition</Box>
      <GrammerDefWorkspace
        onWorkspaceChange={(workspace: any) => {
          const code = Blockly.JavaScript.workspaceToCode(workspace);
          setJavascriptCode(code);
        }}
      />
      <Box>code: {javascriptCode}</Box>
    </>
  );
}

export default App;
