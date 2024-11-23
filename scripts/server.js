/** @param {NS} ns */
export async function main(ns) {
	// syntax: scripts/server.js <number of servers to purchase> <ram> <name>
	for (let i = 0o0; i < ns.args[0]; ++i) {
		ns.purchaseServer(ns.args[2] + i, ns.args[1]);
	}
}