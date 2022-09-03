import Blockly from "blockly";
import { useEffect } from "react";

Blockly.defineBlocksWithJsonArray([
  {
    type: "grammer_def",
    message0: "%1 とは %2 %3 である",
    args0: [
      {
        type: "field_variable",
        name: "grammer_name",
        variable: "start",
      },
      {
        type: "input_dummy",
      },
      {
        type: "input_value",
        name: "grammer",
      },
    ],
    previousStatement: null,
    nextStatement: null,
    colour: 230,
    tooltip: "",
    helpUrl: "",
  },
  {
    type: "return_statement",
    message0: "return %1",
    args0: [
      {
        type: "input_value",
        name: "NAME",
      },
    ],
    inputsInline: true,
    previousStatement: null,
    nextStatement: null,
    colour: 210,
    tooltip: "",
    helpUrl: "",
  },
]);

Blockly.JavaScript["grammer_def"] = function (block: any) {
  // var value_grammer_name = Blockly.JavaScript.valueToCode(
  //   block,
  //   "grammer_name",
  //   Blockly.JavaScript.ORDER_ATOMIC
  // );
  var variable_grammer_name = Blockly.JavaScript.nameDB_.getName(
    block.getFieldValue("grammer_name"),
    Blockly.Names.NameType.VARIABLE
  );
  var value_grammer = Blockly.JavaScript.valueToCode(
    block,
    "grammer",
    Blockly.JavaScript.ORDER_ATOMIC
  );
  var code = `${variable_grammer_name} = ${value_grammer}
`;
  return code;
};

Blockly.JavaScript["return_statement"] = function (block: any) {
  var value_name = Blockly.JavaScript.valueToCode(
    block,
    "NAME",
    Blockly.JavaScript.ORDER_ATOMIC
  );
  var code = "return" + value_name + ";\n";
  return code;
};

export default function GrammerDefWorkspace({
  onWorkspaceChange,
}: {
  onWorkspaceChange: any;
}): JSX.Element {
  const xmlParser = new DOMParser();
  const xmlDom = xmlParser.parseFromString(xml, "text/xml");
  useEffect(() => {
    const workspace = Blockly.inject("blocklyDiv", {
      //@ts-ignore
      toolbox: xmlDom.getElementById("toolbox"),
      collapse: true,
      comments: true,
      disable: true,
      maxBlocks: Infinity,
      trashcan: true,
      horizontalLayout: false,
      toolboxPosition: "start",
      css: true,
      media: "https://blockly-demo.appspot.com/static/media/",
      rtl: false,
      scrollbars: true,
      sounds: true,
      oneBasedIndex: true,
      grid: {
        spacing: 20,
        length: 1,
        colour: "#888",
        snap: false,
      },
      zoom: {
        controls: true,
        wheel: true,
        startScale: 1,
        maxScale: 3,
        minScale: 0.3,
        scaleSpeed: 1.2,
      },
    });
    workspace.addChangeListener(() => {
      onWorkspaceChange(workspace);
    });
    return () => {
      workspace.removeChangeListener(() => {
        onWorkspaceChange(workspace);
      });
    };
  }, [xml]);
  return (
    <div id="blocklyDiv" style={{ height: "480px", width: "600px" }}></div>
  );
}

const xml = `
<xml xmlns="https://developers.google.com/blockly/xml" id="toolbox" style="display: none">
<category name="論理" colour="#5b80a5">
<block type="controls_if"/>
<block type="logic_compare">
<field name="OP">EQ</field>
</block>
<block type="return_statement"/>
<block type="logic_operation">
<field name="OP">AND</field>
</block>
<block type="logic_negate"/>
<block type="logic_boolean">
<field name="BOOL">TRUE</field>
</block>
<block type="logic_null"/>
</category>
<category name="繰り返し" colour="#5ba55b">
<block type="controls_repeat_ext">
<value name="TIMES">
<shadow type="math_number">
<field name="NUM">10</field>
</shadow>
</value>
</block>
<block type="controls_whileUntil">
<field name="MODE">WHILE</field>
</block>
<block type="controls_for">
<field name="VAR" id="2b{}HXytVcr=ID\`A84+p">i</field>
<value name="FROM">
<shadow type="math_number">
<field name="NUM">1</field>
</shadow>
</value>
<value name="TO">
<shadow type="math_number">
<field name="NUM">10</field>
</shadow>
</value>
<value name="BY">
<shadow type="math_number">
<field name="NUM">1</field>
</shadow>
</value>
</block>
<block type="controls_forEach">
<field name="VAR" id="T[euhkOd,|CI,w)noQfY">j</field>
</block>
<block type="controls_flow_statements">
<field name="FLOW">BREAK</field>
</block>
</category>
<category name="数学" colour="#5b67a5">
<block type="math_number">
<field name="NUM">0</field>
</block>
<block type="math_arithmetic">
<field name="OP">ADD</field>
<value name="A">
<shadow type="math_number">
<field name="NUM">1</field>
</shadow>
</value>
<value name="B">
<shadow type="math_number">
<field name="NUM">1</field>
</shadow>
</value>
</block>
<block type="math_single">
<field name="OP">ROOT</field>
<value name="NUM">
<shadow type="math_number">
<field name="NUM">9</field>
</shadow>
</value>
</block>
<block type="math_trig">
<field name="OP">SIN</field>
<value name="NUM">
<shadow type="math_number">
<field name="NUM">45</field>
</shadow>
</value>
</block>
<block type="math_constant">
<field name="CONSTANT">PI</field>
</block>
<block type="math_number_property">
<mutation divisor_input="false"/>
<field name="PROPERTY">EVEN</field>
<value name="NUMBER_TO_CHECK">
<shadow type="math_number">
<field name="NUM">0</field>
</shadow>
</value>
</block>
<block type="math_round">
<field name="OP">ROUND</field>
<value name="NUM">
<shadow type="math_number">
<field name="NUM">3.1</field>
</shadow>
</value>
</block>
<block type="math_on_list">
<mutation op="SUM"/>
<field name="OP">SUM</field>
</block>
<block type="math_modulo">
<value name="DIVIDEND">
<shadow type="math_number">
<field name="NUM">64</field>
</shadow>
</value>
<value name="DIVISOR">
<shadow type="math_number">
<field name="NUM">10</field>
</shadow>
</value>
</block>
<block type="math_constrain">
<value name="VALUE">
<shadow type="math_number">
<field name="NUM">50</field>
</shadow>
</value>
<value name="LOW">
<shadow type="math_number">
<field name="NUM">1</field>
</shadow>
</value>
<value name="HIGH">
<shadow type="math_number">
<field name="NUM">100</field>
</shadow>
</value>
</block>
<block type="math_random_int">
<value name="FROM">
<shadow type="math_number">
<field name="NUM">1</field>
</shadow>
</value>
<value name="TO">
<shadow type="math_number">
<field name="NUM">100</field>
</shadow>
</value>
</block>
<block type="math_random_float"/>
</category>
<category name="文字列操作" colour="#5ba58c">
<block type="text">
<field name="TEXT"/>
</block>
<block type="text_join">
<mutation items="2"/>
</block>
<block type="text_append">
<field name="VAR" id="~]^7a)m+Rj6}WO=I31,W">item</field>
<value name="TEXT">
<shadow type="text">
<field name="TEXT"/>
</shadow>
</value>
</block>
<block type="text_length">
<value name="VALUE">
<shadow type="text">
<field name="TEXT">abc</field>
</shadow>
</value>
</block>
<block type="text_isEmpty">
<value name="VALUE">
<shadow type="text">
<field name="TEXT"/>
</shadow>
</value>
</block>
<block type="text_indexOf">
<field name="END">FIRST</field>
<value name="VALUE">
<block type="variables_get">
<field name="VAR" id="~u@hGGqWgR3*RjXEGz@K">text</field>
</block>
</value>
<value name="FIND">
<shadow type="text">
<field name="TEXT">abc</field>
</shadow>
</value>
</block>
<block type="text_charAt">
<mutation at="true"/>
<field name="WHERE">FROM_START</field>
<value name="VALUE">
<block type="variables_get">
<field name="VAR" id="~u@hGGqWgR3*RjXEGz@K">text</field>
</block>
</value>
</block>
<block type="text_getSubstring">
<mutation at1="true" at2="true"/>
<field name="WHERE1">FROM_START</field>
<field name="WHERE2">FROM_START</field>
<value name="STRING">
<block type="variables_get">
<field name="VAR" id="~u@hGGqWgR3*RjXEGz@K">text</field>
</block>
</value>
</block>
<block type="text_changeCase">
<field name="CASE">UPPERCASE</field>
<value name="TEXT">
<shadow type="text">
<field name="TEXT">abc</field>
</shadow>
</value>
</block>
<block type="text_trim">
<field name="MODE">BOTH</field>
<value name="TEXT">
<shadow type="text">
<field name="TEXT">abc</field>
</shadow>
</value>
</block>
<block type="text_print">
<value name="TEXT">
<shadow type="text">
<field name="TEXT">abc</field>
</shadow>
</value>
</block>
<block type="text_prompt_ext">
<mutation type="TEXT"/>
<field name="TYPE">TEXT</field>
<value name="TEXT">
<shadow type="text">
<field name="TEXT">abc</field>
</shadow>
</value>
</block>
</category>
<category name="配列操作" colour="#745ba5">
<block type="lists_create_with">
<mutation items="0"/>
</block>
<block type="lists_create_with">
<mutation items="3"/>
</block>
<block type="lists_repeat">
<value name="NUM">
<shadow type="math_number">
<field name="NUM">5</field>
</shadow>
</value>
</block>
<block type="lists_length"/>
<block type="lists_isEmpty"/>
<block type="lists_indexOf">
<field name="END">FIRST</field>
<value name="VALUE">
<block type="variables_get">
<field name="VAR" id="\`?2bb6)I?N51@@_LO++W">list</field>
</block>
</value>
</block>
<block type="lists_getIndex">
<mutation statement="false" at="true"/>
<field name="MODE">GET</field>
<field name="WHERE">FROM_START</field>
<value name="VALUE">
<block type="variables_get">
<field name="VAR" id="\`?2bb6)I?N51@@_LO++W">list</field>
</block>
</value>
</block>
<block type="lists_setIndex">
<mutation at="true"/>
<field name="MODE">SET</field>
<field name="WHERE">FROM_START</field>
<value name="LIST">
<block type="variables_get">
<field name="VAR" id="\`?2bb6)I?N51@@_LO++W">list</field>
</block>
</value>
</block>
<block type="lists_getSublist">
<mutation at1="true" at2="true"/>
<field name="WHERE1">FROM_START</field>
<field name="WHERE2">FROM_START</field>
<value name="LIST">
<block type="variables_get">
<field name="VAR" id="\`?2bb6)I?N51@@_LO++W">list</field>
</block>
</value>
</block>
<block type="lists_split">
<mutation mode="SPLIT"/>
<field name="MODE">SPLIT</field>
<value name="DELIM">
<shadow type="text">
<field name="TEXT">,</field>
</shadow>
</value>
</block>
<block type="lists_sort">
<field name="TYPE">NUMERIC</field>
<field name="DIRECTION">1</field>
</block>
</category>
<category name="変数" colour="#a55b80" custom="VARIABLE"/>
<category name="文法定義" colour="#9fa55b">
<block type="grammer_def">
<field name="grammer_name" id="%Ckn-+7)ws94ZjiUZDyO">start</field>
</block>
</category>
</xml>
`;
