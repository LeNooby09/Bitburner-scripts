/** @param {NS} ns */
export async function main(ns) {
	const target = ns.args[0] || ns.getHostname();
	const files = ["scripts/weaken.js", "scripts/grow.js", "scripts/hack.js", "main.js"];
	let cycle = 0;
	let neighbor;

	ns.scp(files, target);
	const threads = Math.floor(ns.getServerMaxRam(target) / ns.getScriptRam("scripts/weaken.js"));
	neighbor = ns.scan(target).filter(hostname => hostname !== "home");
	if (ns.hasRootAccess(target) === false) {
		ns.exec("scripts/getRoot.js", "home", "1", target);
	}

	while (true) {
		ns.print("INFO ","---------- cycle: " + cycle + " -----------------");
		cycle ++;

		let weakenTime = ns.getWeakenTime(target) + 5;
		let hackTime = ns.getHackTime(target) + 5;
		let growTime = ns.getGrowTime(target) + 5;

		if (ns.args[1] === "--replicate" && neighbor.length !== 0) {
			if (ns.isRunning("main.js", target, neighbor[0])) {
				neighbor.shift();
			}
			else {
				ns.exec("main.js", target, "1", neighbor[0]);
				neighbor.shift();
			}
		}
		if (ns.getServerSecurityLevel(target) > ns.getServerMinSecurityLevel(target) + 5) {
			ns.exec("scripts/weaken.js", target, threads, target);
			await ns.sleep(weakenTime);
		}
		else if (ns.getServerMoneyAvailable(target) < ns.getServerMaxMoney(target) * 0.9) {
			ns.exec("scripts/grow.js", target, threads, target);
			await ns.sleep(growTime);
		}
		else {
			ns.exec("scripts/hack.js", target, threads, target);
			await ns.sleep(hackTime);
		}
	}
}