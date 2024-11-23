/** @param {NS} ns */
export async function main(ns) {
	const files = ["scripts/weaken.js", "scripts/grow.js", "scripts/hack.js", "main.js"];
	let target = ns.args[0]
	if (ns.args[0] === servers) {
		target = ns.getPurchasedServers()
	}
	ns.scp(files, target);
}