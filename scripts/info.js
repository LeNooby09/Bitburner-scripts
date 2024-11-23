/** @param {NS} ns */
export async function main(ns) {
	ns.tprint("ram: " + ns.getServerMaxRam(ns.args[0]));
	ns.tprint("money: " + ns.getServerMaxMoney(ns.args[0]));
}