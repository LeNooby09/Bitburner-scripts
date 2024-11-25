/** @param {NS} ns */
export async function main(ns) {
	const target = ns.args[0] || ns.getHostname();
	const threads = Math.floor((ns.getServerMaxRam(target) - ns.getServerUsedRam(target)) / 1.75 );

	let cycle = 0;
	let port = ns.getPortHandle(1);
	let dynamicTarget;
	
	if (ns.args[1]) {
		dynamicTarget = ns.args[1];
	} else {
		dynamicTarget = target;
	}

	while (true) {
		if (!port.empty()) {
			dynamicTarget = port.peek();
			ns.print("INFO ", "Switching to target: " + dynamicTarget);
		}
		if (ns.getServerUsedRam(target) === 0) {
			ns.print("INFO ", " --------------- cycle: " + cycle + " ------------------");
			cycle ++;
			if (ns.getServerSecurityLevel(dynamicTarget) <= ns.getServerMinSecurityLevel(dynamicTarget) + 5) {
				if (ns.getServerMoneyAvailable(dynamicTarget) < ns.getServerMaxMoney(dynamicTarget) * 0.9) {
					ns.exec("scripts/grow.js", target, threads, dynamicTarget);
					await ns.sleep(ns.getGrowTime(dynamicTarget) + 50);
				} else {
					ns.exec("scripts/hack.js", target, threads, dynamicTarget);
					await ns.sleep(ns.getHackTime(dynamicTarget) + 50);
				}
			} else {
				ns.exec("scripts/weaken.js", target, threads, dynamicTarget);
				await ns.sleep(ns.getWeakenTime(dynamicTarget) + 50);
			}
		} else {
			ns.print("INFO ", "Server " + target + " is not free. Skipping.");
			await ns.sleep((ns.getGrowTime(target) + ns.getHackTime(target) + ns.getWeakenTime(target)) / 3);
		}
	}
}