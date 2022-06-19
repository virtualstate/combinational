import {HalfAdder, Rest} from "../../circuit";
import {h, createFragment, children} from "@virtualstate/focus";
import {anAsyncThing} from "@virtualstate/promise/the-thing";
import {pair} from "../../circuit";
import {ok} from "../../like";
import {FullAdder, rest} from "../../circuit";
import {assertPair} from "./adder";
import {EightAdder} from "../../circuit/adder/eight-adder";

const split1 = rest(
    <FullAdder>
        {true}
        {false}
        {false}
    </FullAdder>
)


async function assertRest(rest: Rest, expected?: unknown[]) {
    console.group({
        expected
});
    const got = await children([
        rest,
        rest.promise
    ])
    console.log({ got });
    assertPair(
        got,
        expected
    );
    console.groupEnd()
}

/*
[
        false,
        false
    ]
 */
await assertRest(
    rest(
        <FullAdder>
            {false}
            {false}
            {false}
        </FullAdder>
    ),
    [
        false,
        false
    ]
);

/*
[
        true,
        false
    ]
 */
await assertRest(
    rest(
        <FullAdder>
            {false}
            {false}
            {true}
        </FullAdder>
    ),
    [
        true,
        false
    ]
);


/*
[
        true,
        false
    ]
 */
await assertRest(
    rest(
        <FullAdder>
            {false}
            {true}
            {false}
        </FullAdder>
    ),
    [
        true,
        false
    ]
);
/*
[
        false,
        true
    ]
 */
await assertRest(
    rest(
        <FullAdder>
            {false}
            {true}
            {true}
        </FullAdder>
    ),
    [
        false,
        true
    ]
);


/*
[
        true,
        false
    ]
 */
await assertRest(
    rest(
        <FullAdder>
            {true}
            {false}
            {false}
        </FullAdder>
    ),
    [
        true,
        false
    ]
);

/*
[
        false,
        true
    ]
 */
await assertRest(
    rest(
        <FullAdder>
            {true}
            {false}
            {true}
        </FullAdder>
    ),
    [
        false,
        true
    ]
);
/*
[
        false,
        true
    ]
 */
await assertRest(
    rest(
        <FullAdder>
            {true}
            {true}
            {false}
        </FullAdder>
    ),
    [
        false,
        true
    ]
);


/*
[
        true,
        true
    ]
 */
await assertRest(
    rest(
        <FullAdder>
            {true}
            {true}
            {true}
        </FullAdder>
    ),
    [
        true,
        true
    ]
);

// 0 + 0 = 0
console.log(await children(
    <EightAdder>
        {false}
        {false}
        {false}
        {false}
        {false}
        {false}
        {false}
        {false}
        {false}
        {false}
        {false}
        {false}
        {false}
        {false}
        {false}
        {false}
    </EightAdder>
))
// 1 + 0 = 1
console.log(await children(
    <EightAdder>
        {true}
        {false}
        {false}
        {false}
        {false}
        {false}
        {false}
        {false}
        {false}
        {false}
        {false}
        {false}
        {false}
        {false}
        {false}
        {false}
    </EightAdder>
))
// 1 + 1 = 2
// 1 + 1 = 10
console.log(await children(
    <EightAdder>
        {true}
        {false}
        {false}
        {false}
        {false}
        {false}
        {false}
        {false}

        {true}
        {false}
        {false}
        {false}
        {false}
        {false}
        {false}
        {false}
    </EightAdder>
))
// 3 + 1 = 4
// 11 + 1 = 100
console.log(await children(
    <EightAdder>
        {true}
        {true}
        {false}
        {false}
        {false}
        {false}
        {false}
        {false}

        {true}
        {false}
        {false}
        {false}
        {false}
        {false}
        {false}
        {false}
    </EightAdder>
))
// 3 + 3 = 6
// 11 + 11 = 110
console.log(await children(
    <EightAdder>
        {true}
        {true}
        {false}
        {false}
        {false}
        {false}
        {false}
        {false}

        {true}
        {true}
        {false}
        {false}
        {false}
        {false}
        {false}
        {false}
    </EightAdder>
))

async function add(a: number, b: number) {
    const expectedNumberResult = a + b;

    ok(expectedNumberResult <= 255);

    const aBinary = a.toString(2).padStart(8, "0");
    const bBinary = b.toString(2).padStart(8, "0");
    const aBinaryBooleans = [...aBinary].reverse().map(value => value === "1");
    const bBinaryBooleans = [...bBinary].reverse().map(value => value === "1");

    const expectedBinary = expectedNumberResult.toString(2).padStart(8, "0");

    console.group(`${a} + ${b} = ${expectedNumberResult}\n${aBinary} + ${bBinary} = ${expectedBinary}`);

    const result = await children(
        <EightAdder>
            {...aBinaryBooleans}
            {...bBinaryBooleans}
        </EightAdder>
    );

    const binary = result.slice(0, 8).reverse().map(value => value ? "1" : "0").join("");

    ok(binary === expectedBinary, `Expected ${expectedBinary} got ${binary}`);

    const parsed = parseInt(binary, 2);

    ok(parsed === expectedNumberResult, `Expected ${expectedNumberResult} got ${parsed}`);

    console.groupEnd();
}

for (let i = 0; i < 255; i += Math.random()) {
    const a = Math.min(255, Math.round(i + (Math.random() * 5)));
    const b = Math.min(255, Math.round(i + (Math.random() * 5)));
    if (a + b > 255) break;
    await add(a, b);
    if (a + b === 255) break;
}