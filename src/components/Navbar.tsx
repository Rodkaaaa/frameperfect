import Link from "next/link";
import SportsEsportsIcon from "@mui/icons-material/SportsEsports";
import AuthMenu from "./AuthMenu";
import { getUser } from "../app/api/auth/getUser";

export default async function Navbar() {
  const user = await getUser();

  return (
    <nav className="w-full border-b bg-black text-white">
      <div className="max-w-7xl mx-auto flex items-center justify-between p-4">

        {/* LOGO */}
        <Link
          href="/"
          className="flex items-center gap-2 text-xl font-bold"
        >
          <SportsEsportsIcon />
          FramePerfect
        </Link>

        {/* AUTH MENU DINÁMICO */}
        <AuthMenu user={user} />

      </div>
    </nav>
  );
}