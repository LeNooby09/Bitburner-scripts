/** @param {NS} ns */
export async function main(ns) {
	if (ns.args[0] > 0 && Number.isInteger(ns.args[0])) {
		for (let i = ns.args[0]; i > 0; i--) {
			for (let i = ns.getPurchasedServers().length; i > 0; i--) {
				if (ns.args[0 || 1] === "force") {
					ns.killall(ns.getPurchasedServers()[0]);
				}
				ns.deleteServer(ns.getPurchasedServers()[0]);
			}
		}
	}
}