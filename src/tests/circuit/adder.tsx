import {HalfAdder} from "../../circuit";
import {h, createFragment} from "@virtualstate/focus";
import {anAsyncThing} from "@virtualstate/promise/the-thing";
import {pairs} from "../../circuit/pair";
import {ok} from "../../like";

function assertHalfAdderResult<T extends unknown[]>(result: unknown[], expected?: T): asserts result is T {
    if (!expected) {
        ok(!result);
        return;
    }
    ok(result.length === expected.length);
    for (const [index, value] of Object.entries(result)) {
        ok(expected[index] === value);
    }
}

assertHalfAdderResult(
    await anAsyncThing(pairs(
        <HalfAdder>
            {false}
            {false}
        </HalfAdder>
    )),
    [
        false,
        false
    ]
);
assertHalfAdderResult(
    await anAsyncThing(pairs(
        <HalfAdder>
            {false}
            {true}
        </HalfAdder>
    )),
    [
        true,
        false
    ]
);
assertHalfAdderResult(
    await anAsyncThing(pairs(
        <HalfAdder>
            {true}
            {false}
        </HalfAdder>
    )),
    [
        true,
        false
    ]
);
assertHalfAdderResult(
    await anAsyncThing(pairs(
        <HalfAdder>
            {true}
            {true}
        </HalfAdder>
    )),
    [
        false,
        true
    ]
);
assertHalfAdderResult(
    await anAsyncThing(pairs(
        <HalfAdder>
        </HalfAdder>
    )),
    undefined
);
assertHalfAdderResult(
    await anAsyncThing(pairs(
        <HalfAdder>
            {false}
        </HalfAdder>
    )),
    undefined
);