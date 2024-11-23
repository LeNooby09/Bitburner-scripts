/** @param {NS} ns */
export async function main(ns) {
	let port = ns.getPortHandle(1);
	port.clear();
	if (ns.args[0]) {
		port.write(ns.args[0]);
	}
}