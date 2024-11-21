/** @param {NS} ns */
export async function main(ns) {
  ns.run("scripts/rootScripts/ftp.js", "1", ns.args[0]);
  ns.run("scripts/rootScripts/ssh.js", "1", ns.args[0]);
  ns.run("scripts/rootScripts/sql.js", "1", ns.args[0]);
  ns.run("scripts/rootScripts/http.js", "1", ns.args[0]);
  ns.run("scripts/rootScripts/smtp.js", "1", ns.args[0]);
  ns.sleep(5000);
  await ns.nuke(ns.args[0]);
}