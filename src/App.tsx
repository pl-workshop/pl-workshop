import { Box, Button, Textarea } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { generate } from "pegjs";
import Blockly from "blockly";

function App() {
  let [input, setInput] = useState("");
  let [parser, setParser] = useState(generate('start = ""'));
  let [result, setResult] = useState("");
  let [javascriptCode, setJavascriptCode] = useState("");
  useEffect(() => {
    //@ts-ignore
    const workspace = Blockly.inject("blocklyDiv", { toolbox: toolbox });
    workspace.addChangeListener(() => {
      const code = Blockly.JavaScript.workspaceToCode(workspace);
      setJavascriptCode(code);
    });
  }, [toolbox]);
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
      <div id="blocklyDiv" style={{ height: "480px", width: "600px" }}></div>
      <Box>code: {javascriptCode}</Box>
    </>
  );
}

const toolbox = {
  kind: "flyoutToolbox",
  contents: [
    {
      kind: "block",
      type: "controls_if",
    },
    {
      kind: "block",
      type: "controls_repeat_ext",
    },
    {
      kind: "block",
      type: "logic_compare",
    },
    {
      kind: "block",
      type: "math_number",
    },
    {
      kind: "block",
      type: "math_arithmetic",
    },
    {
      kind: "block",
      type: "text",
    },
    {
      kind: "block",
      type: "text_print",
    },
  ],
};

export default App;
