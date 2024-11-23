/** @param {NS} ns */
export async function main(ns) {
	ns.getPurchasedServers().forEach(server => {
		if (ns.args[0] === "force") {
			ns.killall(server);
		}
		ns.deleteServer(server);
	});
}