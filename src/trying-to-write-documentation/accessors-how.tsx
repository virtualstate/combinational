// c8 ignore start

import { ok, h } from "@virtualstate/focus";

let tree,
  node,
  object,
  snapshot,
  rawNode,
  api,
  proxied,
  nodeInstance,
  staticInstance: unknown;

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
const { name } = await import("@virtualstate/focus");

node = <named />;

ok(name(node) === "named");

export default 1;
