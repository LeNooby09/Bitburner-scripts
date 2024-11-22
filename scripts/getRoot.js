/** @param {NS} ns */
export async function main(ns) {
  if (ns.fileExists("ftpcrack.exe")) { ns.run("scripts/rootScripts/ftp.js", "1", ns.args[0]) }
  if (ns.fileExists("brutessh.exe")) { ns.run("scripts/rootScripts/ssh.js", "1", ns.args[0]) }
  if (ns.fileExists("sqlinject.exe")) { ns.run("scripts/rootScripts/sql.js", "1", ns.args[0]) }
  if (ns.fileExists("httpworm.exe")) { ns.run("scripts/rootScripts/http.js", "1", ns.args[0]) }
  if (ns.fileExists("relaysmtp.exe")) { ns.run("scripts/rootScripts/smtp.js", "1", ns.args[0]) }
  ns.sleep(5000);
  await ns.nuke(ns.args[0]);
}