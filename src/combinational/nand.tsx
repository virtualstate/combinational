import {children, h} from "@virtualstate/focus";
import { Boolean } from "./boolean";
import {Not} from "./not";

export function Nand(options: unknown, input?: unknown) {
    return (
        <Not>
            <Boolean>{input}</Boolean>
        </Not>
    );
}