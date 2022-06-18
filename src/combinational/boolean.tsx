import {h} from "@virtualstate/focus";
import {And} from "./and";

export function Boolean(options: unknown, input?: unknown) {
    return <And>{input}</And>
}
