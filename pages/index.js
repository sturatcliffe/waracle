import useSWR from "swr";
import fetcher from "../lib/fetcher";
import { useUser } from "../lib/user";
import Loader from "../components/Loader";
import Cat from "../components/Cat";

export default function Home() {
  const user = useUser();

  const { data: cats, error: catsError } = useSWR(
    "/images?order=asc&limit=100",
    fetcher
  );
  const { data: favourites, error: favouritesError } = useSWR(
    user ? `/favourites?sub_id=${user}` : null,
    fetcher
  );
  const { data: votes, error: votesError } = useSWR("/votes", fetcher);

  if (catsError || favouritesError || votesError) {
    return (
      <div className="m-4 md:mx-auto md:max-w-xl border border-red-800 bg-red-300 text-red-800 p-4">
        There was a problem communicating with the Cats API. Please make sure
        you have an active internet connection.
      </div>
    );
  }

  if (!cats || !favourites || !votes) return <Loader />;

  return (
    <div className="flex flex-wrap items-center justify-center">
      {cats.map((cat) => (
        <Cat
          key={cat.id}
          cat={cat}
          favourite={favourites.find((x) => x.image_id === cat.id)}
          votes={votes.filter((x) => x.image_id === cat.id)}
        />
      ))}
    </div>
  );
}
