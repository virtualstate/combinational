/* c8 ignore start */

import {ok, h, descendants} from "@virtualstate/focus";
import {
    And,
    Boolean,
    isBooleanFalseArray,
    isBooleanTrueArray, Nand,
    Nor,
    Not,
    Or,
    Xnor,
    Xor
} from "@virtualstate/combinational";

/**
 * This is living documentation, change this code, and on build, README.md will be updated
 *
 * Comments starting with /* (and not /**) will be treated as markdown
 * Code is treated as codeblocks
 *
 * To split code up, add an empty comment
 * A comment must have its starting & ending markers on their own lines
 */

/*
# Hello
 */

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

await assertFalse(<And />);
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

await assertTrue(<Not />);
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

await assertFalse(<Or />);
await assertTrue(or);
await assertFalse(orFalse);

const nor = (
    <Nor>
        {nodeAndTrue}
        {nodeAndFalse}
    </Nor>
)
const norTrue = (
    <Nor>
        {nodeFalse}
        {nodeAndFalse}
    </Nor>
);

await assertTrue(<Nor />);
await assertFalse(nor);
await assertTrue(norTrue);

const xor = (
    <Xor>
        {false}
        {nodeFalse}
    </Xor>
)
await assertFalse(<Xor />);
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
await assertTrue(<Xnor />);
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
await assertTrue(<Nand />);
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

export default 1;
