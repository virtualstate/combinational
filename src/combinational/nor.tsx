import {h} from "@virtualstate/focus";
import {Not} from "./not";
import {Or} from "./or";

export function Nor(options: unknown, input?: unknown) {
    return (
        <Not>
            <Or>{input}</Or>
        </Not>
    );
}