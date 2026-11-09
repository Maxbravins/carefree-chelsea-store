export function getTeamType(product) {
  return product.team_type === "national" ? "national" : "club";
}

export function getTeamName(product) {
  return (product.team || "Chelsea").trim() || "Chelsea";
}

export function normalizeTeamName(name) {
  return name.trim().replace(/\s+/g, " ").toLocaleLowerCase();
}

export function slugifyTeam(name) {
  return normalizeTeamName(name)
    .normalize("NFKD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

export function getTeamPath(team) {
  return `/teams/${team.teamType}/${slugifyTeam(team.teamName)}`;
}

export function groupProductsByTeam(products) {
  const collections = new Map();
  products.forEach((product) => {
    const teamName = getTeamName(product);
    const teamType = getTeamType(product);
    const key = `${teamType}:${normalizeTeamName(teamName)}`;
    if (!collections.has(key)) collections.set(key, { teamName, teamType, products: [] });
    collections.get(key).products.push(product);
  });
  return [...collections.values()];
}
