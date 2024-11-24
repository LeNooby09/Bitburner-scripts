/** @param {NS} ns */
export async function main(ns) {
	const files = ["scripts/weaken.js", "scripts/grow.js", "scripts/hack.js", "main.js", "scripts/install.js"];
	let target = ns.args[0]
	if (ns.args[0] === "servers") {
		ns.getPurchasedServers().forEach(server => {
			ns.scp(files, server);
		});
	} else {
		ns.scp(files, target);
	}
}