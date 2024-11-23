/** @param {NS} ns */
export async function main(ns) {
	for (let i = 0; i < ns.args[0]; ++i) {
		purchaseServer(ns.args[2] + i, ns.args[1]);
	}
}