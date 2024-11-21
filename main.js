/** @param {NS} ns */
export async function main(ns) {
	const target = ns.args[0] || ns.getHostname();
	const files = ["scripts/weaken.js", "scripts/grow.js", "scripts/hack.js", "main.js"];
	const threads = Math.floor(ns.getServerMaxRam(target) / ns.getScriptRam("scripts/weaken.js"));

	let neighbor = ns.scan(target).filter(hostname => hostname !== "home");
	let time = {
		w: ns.getWeakenTime(target) + 5,
		h: ns.getHackTime(target) + 5,
		g: ns.getGrowTime(target) + 5
	}

	ns.scp(files, target);

	while(true) {
		if(neighbor.length > 0) {
			if (ns.isRunning("main.js", target, neighbor[0])) {
				neighbor.shift();
			} else {
				ns.exec("main.js", "home", 1, neighbor.shift());
			}
		} else {
			if (ns.hasRootAccess(target)) {
				if (ns.getServerMoneyAvailable(target) < ns.getServerMaxMoney(target) * 0.9) {
					await ns.exec("scripts/grow.js", target, threads);
					await ns.sleep(time.g);
				} else if (ns.getServerSecurityLevel(target) > 0.2) {
					await ns.exec("scripts/weaken.js", target, threads);
					await ns.sleep(time.w);
				} else {
					await ns.exec("scripts/hack.js", target, threads);
					await ns.sleep(time.h);
				}
			} else {
				throw new Error("No root access to " + target);
			}
		}
	}
}