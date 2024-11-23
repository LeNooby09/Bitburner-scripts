/** @param {NS} ns */
export async function main(ns) {
	const files = ["scripts/weaken.js", "scripts/grow.js", "scripts/hack.js", "main.js"];
	ns.scp(files, ns.args[0]);
}