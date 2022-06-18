import {descendants, h, ok} from "@virtualstate/focus";
import {And, Boolean, Nand, Xnor, Xor} from "../../combinational";
import {isBooleanFalseArray, isBooleanTrueArray} from "@virtualstate/combinational";
import {Not} from "../../combinational";
import {Or} from "../../combinational";

export default 1;


const nodeTrue = <Boolean>{true}</Boolean>
const nodeTrueNumber = <Boolean>{1}</Boolean>
const nodeTrueString = <Boolean>{" "}</Boolean>
const nodeTrueNode = <Boolean><test /></Boolean>

const nodeFalse = <Boolean>{false}</Boolean>
const nodeFalseNumber = <Boolean>{0}</Boolean>
const nodeFalseString = <Boolean>{""}</Boolean>

async function assertTrue(input: unknown): Promise<void> {
    const booleans = await descendants(input);
    ok(isBooleanTrueArray(booleans), `expected all to be true, got ${booleans}`);
}
async function assertFalse(input: unknown): Promise<void> {
    const booleans = await descendants(input);
    ok(isBooleanFalseArray(booleans), `expected all to be false, got ${booleans}`);
}

await assertTrue(nodeTrue);
await assertTrue(nodeTrueNumber);
await assertTrue(nodeTrueString);
await assertTrue(nodeTrueNode);

await assertFalse(nodeFalse);
await assertFalse(nodeFalseNumber);
await assertFalse(nodeFalseString);

const nodeAndTrue = (
    <And>
        {nodeTrue}
        {nodeTrueNumber}
        {nodeTrueString}
        {nodeTrueNode}
        {true}
        {" "}
        {1}
        <test />
    </And>
)
const nodeAndFalse = (
    <And>
        {nodeAndTrue}
        {false}
    </And>
);

await assertTrue(nodeAndTrue);
await assertFalse(nodeAndFalse);

const not = (
    <Not>
        {nodeAndTrue}
    </Not>
)
const notTrue = (
    <Not>
        {nodeAndFalse}
    </Not>
);

await assertFalse(not);
await assertTrue(notTrue);

const or = (
    <Or>
        {nodeAndTrue}
        {nodeAndFalse}
    </Or>
)
const orFalse = (
    <Or>
        {nodeFalse}
        {nodeAndFalse}
    </Or>
);

await assertTrue(or);
await assertFalse(orFalse);

const xor = (
    <Xor>
        {false}
        {nodeFalse}
    </Xor>
)
await assertFalse(xor);
const xorTrueOne = (
    <Xor>
        {nodeFalse}
        {nodeTrue}
    </Xor>
)
const xorTrueOther = (
    <Xor>
        {nodeAndTrue}
        {orFalse}
    </Xor>
);
await assertTrue(xorTrueOne);
await assertTrue(xorTrueOther);
const xorFalseAll = (
    <Xor>
        {nodeAndTrue}
        {true}
        {nodeTrueString}
    </Xor>
);
await assertFalse(xorFalseAll);

const xnor = (
    <Xnor>
        {false}
        {nodeFalse}
        {nodeAndFalse}
        {orFalse}
    </Xnor>
);
await assertTrue(xnor);
const xnorTrue = (
    <Xnor>
        {true}
        {nodeTrue}
        {nodeAndTrue}
        {or}
    </Xnor>
);
await assertTrue(xnorTrue);

const xnorFalse = (
    <Xnor>
        {true}
        {nodeFalse}
        {nodeAndTrue}
        {or}
    </Xnor>
);
await assertFalse(xnorFalse);
const xnorFalseOther = (
    <Xnor>
        {true}
        {nodeFalse}
        {nodeAndTrue}
        {orFalse}
    </Xnor>
);
await assertFalse(xnorFalseOther);

const nand = (
    <Nand>
        {false}
        {nodeFalse}
        {orFalse}
    </Nand>
);
await assertTrue(nand);
const nandTrue = (
    <Nand>
        {true}
        {nodeFalse}
        {orFalse}
    </Nand>
);
await assertTrue(nandTrue);
const nandTrueOther = (
    <Nand>
        {true}
        {nodeAndTrue}
        {orFalse}
    </Nand>
);
await assertTrue(nandTrueOther);
const nandTrueAnother = (
    <Nand>
        {true}
        {nodeAndTrue}
        {orFalse}
        {or}
    </Nand>
);
await assertTrue(nandTrueAnother);
const nandFalse = (
    <Nand>
        {true}
        {nodeAndTrue}
        {nodeTrue}
        {or}
    </Nand>
);
await assertFalse(nandFalse);
