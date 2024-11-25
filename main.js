/** @param {NS} ns */
export async function main(ns) {
	const target = ns.args[0] || ns.getHostname();
	const threads = Math.floor((ns.getServerMaxRam(target) - ns.getServerUsedRam(target)) / 1.75 );

	const buffer = 50;
	const upperThreshold = 0.9;
	const lowerThreshold = 0.7;
	const tolerance = 5;

	let port = ns.getPortHandle(1);
	let dynamicTarget = ns.args[0] || target;
	let printedDebug = false;

	let cycle = 0;

	while (true) {
		if (!port.empty()) {
			dynamicTarget = port.peek();
			if (dynamicTarget !== target) {
				ns.print("INFO ", "New remote target detected. Switching to: " + dynamicTarget);
			}
		}
		if (ns.getServerUsedRam(target) < ns.getServerMaxRam(target) * lowerThreshold) {
			printedDebug = false;
			ns.print("INFO ", " --------------- cycle: " + cycle + " ------------------");
			cycle ++;
			if (ns.getServerSecurityLevel(dynamicTarget) <= ns.getServerMinSecurityLevel(dynamicTarget) + tolerance) {
				if (ns.getServerMoneyAvailable(dynamicTarget) < ns.getServerMaxMoney(dynamicTarget) * upperThreshold) {
					ns.exec("scripts/grow.js", target, threads, dynamicTarget);
					await ns.sleep(ns.getGrowTime(dynamicTarget) + buffer);
				} else {
					ns.exec("scripts/hack.js", target, threads, dynamicTarget);
					await ns.sleep(ns.getHackTime(dynamicTarget) + buffer);
				}
			} else {
				ns.exec("scripts/weaken.js", target, threads, dynamicTarget);
				await ns.sleep(ns.getWeakenTime(dynamicTarget) + buffer);
			}
		} else {
			if (!printedDebug) {
				ns.print("INFO ", "Server " + target + " is almost full. Skipping...");
				printedDebug = true;
			}
			await ns.sleep(10000);
		}
	}
}