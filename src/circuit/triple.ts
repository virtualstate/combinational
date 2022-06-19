import {children} from "@virtualstate/focus";
import {ok} from "../like";
import {count} from "./count";

export async function *triple(input: unknown) {
    yield * count(input, 3, false);
}