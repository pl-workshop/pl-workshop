import {
    Text,
        Box,
        Button,
        Textarea,
        Flex,
        Stack,
        Center,
        Divider,
} from "@chakra-ui/react";
import { useState } from "react";
import { generate } from "pegjs";
import { Tree, TreeNode } from "react-organizational-chart";
import AceEditor from "react-ace";
import "ace-builds/src-noconflict/mode-javascript";
import "ace-builds/src-noconflict/theme-chrome";
import ResultBox from "./assets/components/ResultBox";

function App() {
    let [input, setInput] = useState("");
    let [parserDef, setParserDef] = useState(initial_definition);
    let [result, setResult] = useState();
    let [evalcode, setEvalcode] = useState(initial_evalcode);
    let [evalResult, setEvalResult] = useState("");
    return (
            <Stack h="100vh">
            <Flex h="full" gap={4} paddingX={4} paddingY={2}>
            <Stack spacing={8} width="full" height="full">
            <Stack spacing={2}>
            <Text fontSize="3xl" color="blackAlpha.900">
            文法定義部
            </Text>
            <AceEditor
            mode="javascript"
            theme="chrome"
            value={parserDef}
            width="100%"
            minLines={20}
            maxLines={20}
            readOnly={false}
            fontSize={16}
            enableBasicAutocompletion={true}
            onChange={(s) => {
            setParserDef(s);
            }}
            />
                </Stack>
                <Stack spacing={2} h="full">
                <Text fontSize="3xl" color="blackAlpha.900">
                入力
                </Text>
                <Textarea
                h="full"
                maxH={200}
            placeholder="peg.js"
                value={input}
            onChange={(e) => setInput(e.target.value)}
            />
                <Button
                colorScheme="green"
                w={20}
            minH={10}
            onClick={() => {
                try {
                    const parser = generate(
                            parserDef + integer_whitespace_definition
                            );
                    setResult(parser.parse(input));
                } catch (e) {
                    alert(e);
                }
            }}
            >
                Parse!
                </Button>
                </Stack>
                </Stack>
                <Stack width="full" h="full">
                <ResultBox label="構文解析の結果">{JSON.stringify(result)}</ResultBox>
                <Box>
                <Text
                fontSize="2xl"
                paddingX={2}
            paddingY={1}
            borderTop="1px"
                borderX="1px"
                borderColor="green"
                >
                AST Viewer
                </Text>
                <Box padding={2} border="1px" borderColor="green" minH={300}>
                {result && (
                        <Tree label={<div>Root</div>}>{ast2tree(result)}</Tree>
                        )}
            </Box>
                </Box>
                </Stack>
                </Flex>
                <Divider />
                <Flex gap={4} paddingX={4} paddingBottom={4}>
                <Stack spacing={2} width="full">
                <Text fontSize="3xl" color="blackAlpha.900">
                評価部
                </Text>
                <AceEditor
                mode="javascript"
                theme="chrome"
                value={evalcode}
            width="100%"
                minLines={16}
            maxLines={16}
            readOnly={false}
            fontSize={16}
            enableBasicAutocompletion={true}
            onChange={(s) => {
                setEvalcode(s);
            }}
            />
                <Button
                w={20}
            h={10}
            colorScheme="green"
                onClick={() => {try {
                    setEvalResult(Function(evalcode + `;return eval;`)()(result));
                } catch (e) {
                    alert(e)
                }}}
            >
                Eval!
                </Button>
                </Stack>
                <Stack width="full">
                <ResultBox label="評価結果">{evalResult.toString()}</ResultBox>
                </Stack>
                </Flex>
                </Stack>
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

type AST =
| { tag: string; [key: string]: AST }
| number
| string
| boolean
| AST[];

function ast2tree(ast: AST) {
    if (
            typeof ast === "number" ||
            typeof ast === "string" ||
            typeof ast === "boolean"
       ) {
        return <TreeNode label={<Text>{ast}</Text>} />;
    } else if (ast instanceof Array) {
        return (
                <>
                {ast.map((x, index) => (
                            <TreeNode key={index} label={<>{ast2tree(x)}</>} />
                            ))}
                </>
               );
    } else {
        return (
                <TreeNode label={<Text color="brown">{ast.tag}</Text>}>
                {Object.keys(ast)
                .filter((key: string) => key !== "tag")
                .map((key: string, index) => (
                            <TreeNode key={index} label={<Text color="green">{key}</Text>}>
                            {ast2tree(ast[key])}
                            </TreeNode>
                            ))}
                </TreeNode>
               );
    }
}

export default App;
