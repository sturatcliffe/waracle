import Favourite from "./Favourite";
import Score from "./Score";

const Cat = ({ cat, favourite, votes }) => {
  return (
    <div className="max-w-full sm:w-1/2 md:w-1/3 lg:w-1/4 p-2 relative">
      <img src={cat.url} alt={cat.original_filename} />
      <Favourite catId={cat.id} data={favourite} />
      <Score catId={cat.id} votes={votes} />
    </div>
  );
};

export default Cat;
