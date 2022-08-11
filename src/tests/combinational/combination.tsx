/* c8 ignore start */

import {children, h} from "@virtualstate/focus";
import {Combination, ok} from "@virtualstate/combinational";
import {isNumber} from "../../is";
import {memo} from "@virtualstate/memo";

export default 1;

function *Changes() {
    yield true;
    yield false;
    yield true;
}

{

    const root = (
        <Combination>
            {true}
            &
            <Changes />
        </Combination>
    )

    for await (const snapshot of children(root)) {
        console.log(snapshot);
    }
}

{

    async function *Pick(o?: unknown, input?: unknown) {
        for await (const snapshot of children(input)) {
            if (!snapshot.length) continue;
            const index = Math.round((snapshot.length - 1) * Math.random());
            console.log({ picked: index, snapshot });
            yield snapshot[index];
        }
    }

    const PickSymbol = Symbol("Pick");

    const root = (
        <Combination {...{ [PickSymbol]: Pick }}>
            {true}
            &
            <Changes />
            ||
            {false} && {true} || {false}{PickSymbol}{true}
        </Combination>
    )

    for await (const snapshot of children(root)) {
        console.log(snapshot);
    }
}

{
    const UnknownSymbol = Symbol("Unknown");
    const root = (
        <Combination>
            {true} | {UnknownSymbol}
        </Combination>
    )

    ok(await children(root).catch(error => error) instanceof Error);
}

{
    const root = (
        <Combination>
            {1} + {2}
        </Combination>
    )

    const result = await children(root);
    console.log(result);
    ok(result.length === 1);
    ok(result[0] === 3);
}

{
    const root = (
        <Combination>
            {1} - {2}
        </Combination>
    )

    const result = await children(root);
    console.log(result);
    ok(result.length === 1);
    ok(result[0] === -1);
}

{
    const root = (
        <Combination>
            {1} * {2} * {5}
        </Combination>
    )

    const result = await children(root);
    console.log(result);
    ok(result.length === 1);
    ok(result[0] === 10);
}

{
    const root = (
        <Combination>
            {1} / {2} * {5}
        </Combination>
    )

    const result = await children(root);
    console.log(result);
    ok(result.length === 1);
    ok(result[0] === 2.5);
}

{
    const root = (
        <Combination>
            {1} / {2} * {5} + {1}
        </Combination>
    )

    const result = await children(root);
    console.log(result);
    ok(result.length === 1);
    ok(result[0] === 3.5);
}

{
    let called = 0;
    async function *A() {
        called += 1;
        yield 1;
        yield 0.01;
        yield 2;
    }
    async function *B() {
        called += 1;
        yield 4;
        yield 1;
        yield 5;
    }
    async function *C() {
        called += 1;
        yield 3;
        yield 0.3;
        yield 0.1;
        yield 2
    }
    async function *D() {
        called += 1;
        yield 3;
        yield 9;
        yield 2;
        yield 2
    }

    const root = memo(
        <Combination>
            <A /> / <B /> * <C /> + <D />
        </Combination>
    )

    {
        const result = await children(root);
        console.log(result);
        ok(result.length === 1);
        ok(result[0] === 2.8);
    }

    let seenLength = 0;
    {
        const seen = [];

        for await (const snapshot of children(root)) {
            ok(snapshot.length === 1);
            seen.push(snapshot);
        }

        console.log(seen);
        ok(seen.length >= 4);
        ok(seen.at(-1).at(0) === 2.8);

        seenLength = seen.length;
    }

    {

        const value = await children(root)
            .filter<number>(isNumber)
            .at(-1);
        console.log(value);
        ok(value === 2.8);
    }

    {

        const valueSeen: number[] = [];
        for await (
            const value of children(root)
            .filter<number>(isNumber)
            .at(-1)
            ) {
            valueSeen.push(value);
        }
        console.log(valueSeen);
        ok(valueSeen.length === seenLength);
        ok(valueSeen.at(-1) === 2.8);
    }

    ok(called === 4);

}


{
    const root = (
        <Combination>
            {1} / {undefined}
        </Combination>
    )

    const result = await children(root);
    console.log(result);
    ok(result.length === 1);
    ok(isNumber(result[0]))
    ok(!isNaN(result[0]));
    ok(!isFinite(result[0]));
}


{
    const root = (
        <Combination>
            {1} / {0}
        </Combination>
    )

    const result = await children(root);
    console.log(result);
    ok(result.length === 1);
    ok(isNumber(result[0]))
    ok(!isNaN(result[0]));
    ok(!isFinite(result[0]));
}

{
    const root = (
        <Combination>
            {1} * {0}
        </Combination>
    )

    const result = await children(root);
    console.log(result);
    ok(result.length === 1);
    ok(isNumber(result[0]))
    ok(result[0] === 0);
}