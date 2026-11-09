import { ArrowRight, Flag, Shield } from "lucide-react";
import { Link } from "react-router-dom";
import { getTeamPath } from "../utils/teams";

export default function TeamCard({ team }) {
  const cover = team.products.find((product) =>
    (product.category || "").toLowerCase().includes("home"),
  ) || team.products[0];
  const price = Math.min(...team.products.map((product) => Number(product.price) || 0));
  const TeamIcon = team.teamType === "national" ? Flag : Shield;

  return (
    <Link
      to={getTeamPath(team)}
      className="group flex h-full flex-col overflow-hidden border-b border-slate-200 bg-white transition-colors hover:border-[#034694]"
    >
      <div className="relative aspect-[4/3] overflow-hidden bg-[#eeece5]">
        <img
          src={cover.image_url || cover.image || "/images/chelsea-home.jpg"}
          alt={`${team.teamName} jerseys`}
          className="h-full w-full object-contain mix-blend-multiply transition-transform duration-500 group-hover:scale-[1.03]"
        />
        <span className="absolute left-3 top-3 inline-flex items-center gap-1.5 bg-white/95 px-3 py-1.5 text-[10px] font-extrabold uppercase tracking-wider text-slate-700">
          <TeamIcon size={12} />
          {team.teamType === "national" ? "National team" : "Club"}
        </span>
      </div>

      <div className="flex flex-1 flex-col p-5">
        <h3 className="text-lg font-extrabold text-slate-900">{team.teamName}</h3>
        <p className="mt-1 text-sm text-slate-500">
          {team.products.length} {team.products.length === 1 ? "jersey" : "jerseys"}
        </p>
        <div className="mt-5 flex items-center justify-between gap-3">
          <span className="font-extrabold text-[#034694]">
            From KSh {price.toLocaleString()}
          </span>
          <span className="inline-flex items-center gap-1 text-sm font-bold text-slate-700 transition group-hover:text-[#034694]">
            View team <ArrowRight size={16} />
          </span>
        </div>
      </div>
    </Link>
  );
}
