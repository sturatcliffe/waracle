import { useState, useEffect } from "react";
import { mutate } from "swr";
import { postJson, remove } from "../lib/fetcher";
import { useUser } from "../lib/user";

const Favourite = ({ catId, data }) => {
  const user = useUser();
  const [checked, setChecked] = useState(!!data);
  const [disabled, setDisabled] = useState(true);

  const handleClick = async () => {
    if (!disabled) {
      setDisabled(true);
      //optimistically update the UI
      setChecked(!checked);
      if (checked) {
        await remove(`/favourites/${data.id}`);
      } else if (!checked) {
        await postJson("/favourites", {
          image_id: catId,
          sub_id: user,
        });
      }
      mutate(`/favourites?sub_id=${user}`);
    }
  };

  useEffect(() => {
    setDisabled(false);
  }, [data]);

  return (
    <div
      className="absolute top-4 right-4 text-red-500 cursor-pointer"
      onClick={() => {
        handleClick();
      }}
    >
      <svg
        className="w-12 h-12"
        fill={checked ? "currentColor" : "none"}
        stroke="currentColor"
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
        ></path>
      </svg>
    </div>
  );
};

export default Favourite;
