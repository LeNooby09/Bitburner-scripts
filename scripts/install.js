/** @param {NS} ns */
export async function main(ns) {
	ns.scp(ns.args[0], ns.args[1]);
}