/** @param {NS} ns */
export async function main(ns) {
  /*
    this is a template kickstarter script
    this script expects your home to have at least 128 GB of ram for all scripts
  */
  for (const server of ns.getPurchasedServers()) {
    ns.exec("main.js", "home", "1", server, ns.args[0]);
    await ns.sleep(30000);
  }
}