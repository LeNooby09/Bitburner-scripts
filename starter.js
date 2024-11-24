/** @param {NS} ns */
export async function main(ns) {
  let target = ns.args[0] || ns.getPortHandle(1).peek();
  let avgTime = ((ns.getWeakenTime(target) + ns.getGrowTime(target) + ns.getHackTime(target)) / 3) / ns.getPurchasedServers().length;
  for (const server of ns.getPurchasedServers()) {
    ns.exec("main.js", "home", "1", server, target);
    await ns.sleep(avgTime);
  }
}