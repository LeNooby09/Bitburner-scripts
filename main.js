/** @param {NS} ns */
export function autocomplete(data, args) {
	return [data.servers];
}

export async function main(ns) {
	const target = ns.args[0] || ns.getHostname();
	const files = ["scripts/weaken.js", "scripts/grow.js", "scripts/hack.js", "main.js"];

	let dynamicTarget;
	if (ns.args[1] === "--focus") { dynamicTarget = ns.args[2]; } else { dynamicTarget = target; }

	const threads = Math.floor((ns.getServerMaxRam(target) - ns.getServerUsedRam(target)) / 1.75 );

	let cycle = 0;
	let time = {
		w: ns.getWeakenTime(dynamicTarget) + 5,
		h: ns.getHackTime(dynamicTarget) + 5,
		g: ns.getGrowTime(dynamicTarget) + 5
	}

	ns.scp(files, target);

	while (true) {
		ns.print("INFO ", " ---------------- cycle: " + cycle + " -------------------");
		cycle ++;
		if (ns.getServerMoneyAvailable(dynamicTarget) < ns.getServerMaxMoney(dynamicTarget) * 0.9) {
			ns.exec("scripts/grow.js", target, threads, dynamicTarget);
			await ns.sleep(time.g);
		} else if (ns.getServerSecurityLevel(dynamicTarget) > ns.getServerMinSecurityLevel(dynamicTarget) * 1.1) {
			ns.exec("scripts/weaken.js", target, threads, dynamicTarget);
			await ns.sleep(time.w);
		} else {
			ns.exec("scripts/hack.js", target, threads, dynamicTarget);
			await ns.sleep(time.h);
		}
	}
}

// TODO: Export functions into smaller scripts