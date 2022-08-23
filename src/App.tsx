import { Box, Button, Textarea } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { generate } from "pegjs";

function App() {
  let [peg, setPeg] = useState("");
  let [input, setInput] = useState("");
  let [parser, setParser] = useState(generate('start = ""'));
  let [result, setResult] = useState("");
  return (
    <>
      <Box>grammer</Box>
      <Textarea
        placeholder="peg.js"
        value={peg}
        onChange={(e) => {
          setPeg(e.target.value);
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
    </>
  );
}

export default App;
