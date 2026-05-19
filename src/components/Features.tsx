import EmojiEventsIcon from "@mui/icons-material/EmojiEvents";
import GroupsIcon from "@mui/icons-material/Groups";
import HubIcon from "@mui/icons-material/Hub";

export default function Features() {
  return (
    <section className="py-20 bg-gray-100 text-black">
      <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-10">

        <div className="text-center">
          <EmojiEventsIcon fontSize="large" />
          <h3 className="text-xl font-bold mt-4">
            Tournament Management
          </h3>
          <p>Create and manage events easily.</p>
        </div>

        <div className="text-center">
          <GroupsIcon fontSize="large" />
          <h3 className="text-xl font-bold mt-4">
            Player Friendly
          </h3>
          <p>Join tournaments and track matches.</p>
        </div>

        <div className="text-center">
          <HubIcon fontSize="large" />
          <h3 className="text-xl font-bold mt-4">
            Smart Brackets
          </h3>
          <p>Automatic seeding and bracket generation.</p>
        </div>

      </div>
    </section>
  );
}