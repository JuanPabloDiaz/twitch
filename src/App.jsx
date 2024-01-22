import { useEffect, useState } from "react";
import axios from "axios";
import Layout from "./Components/Layout";

const twitchUsers = [
  "ESL_SC2",
  "OgamingSC2",
  "cretetion",
  "freecodecamp",
  "storbeck",
  "habathcx",
  "RobotCaleb",
  "noobs2ninjas",
];

function TwitchUser({ username }) {
  const [user, setUser] = useState(null);

  useEffect(() => {
    axios
      .get(
        `https://twitch-proxy.freecodecamp.rocks/helix/users?login=${username}`,
      )
      .then((response) => {
        console.log(response.data.data[0]);
        setUser(response.data.data[0]);
      });
  }, [username]);

  if (!user) return null;

  return (
    <div className="flex w-screen items-center justify-between gap-6 px-4 py-2">
      <div className="flex h-12 w-12 items-center justify-center rounded-full border-2 border-white">
        <img
          className="h-10 w-10 rounded-full"
          src={user.profile_image_url}
          alt={user.display_name}
        />
      </div>
      <h2 className="w-1/6 font-bold">{user.display_name}</h2>
      <p className="w-3/6 font-semibold">
        {user.description.split(" ").slice(0, 18).join(" ")}
      </p>
      <a
        className="text-blue-500 hover:text-blue-800 "
        href={`https://www.twitch.tv/${username}`}
      >
        Go to channel
      </a>
    </div>
  );
}

function App() {
  return (
    <>
      <Layout>
        <div className="rounded-lg bg-black p-4">
          <h1 className="text-3xl font-extrabold text-[#FFD23F] sm:text-3xl md:text-4xl lg:text-5xl">
            TwitchTV JSON API
          </h1>
        </div>
        <section className="flex w-2/6 min-w-min flex-col items-center justify-center rounded-xl bg-[#1D2B53] p-3 text-[#C6DAF1]">
          <div className="flex w-10/12 items-center justify-around gap-2 sm:gap-3 md:gap-4 lg:gap-6">
            <div className="">
              {twitchUsers.map((username) => (
                <TwitchUser key={username} username={username} />
              ))}
            </div>
          </div>
        </section>
      </Layout>
    </>
  );
}

export default App;
