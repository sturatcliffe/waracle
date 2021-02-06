import { useState, useEffect } from "react";
import { mutate } from "swr";
import { postJson } from "../lib/fetcher";
import { useUser } from "../lib/user";
import classNames from "classnames";

const Score = ({ catId, votes }) => {
  const user = useUser();
  const [score, setScore] = useState(0);
  const [disabled, setDisabled] = useState(false);
  const [myVote, setMyVote] = useState(null);

  useEffect(() => {
    const upVotes = votes.filter((x) => x.value === 1).length;
    const downVotes = votes.filter((x) => x.value === 0).length;
    setScore(upVotes - downVotes);

    if (votes.some((x) => x.sub_id === user)) {
      setDisabled(true);
      setMyVote(votes.find((x) => x.sub_id === user));
    }
  }, [votes]);

  const handleClick = async (value) => {
    //optimistically update UI
    setDisabled(true);
    setScore(value === 0 ? score - 1 : score + 1);
    setMyVote({ value });
    await postJson("/votes", {
      image_id: catId,
      sub_id: user,
      value,
    });
    mutate("/votes");
  };

  const classes = classNames({
    "w-6": true,
    "h-6": true,
    "text-gray-400": disabled,
    "cursor-not-allowed": disabled,
  });

  return (
    <div className="flex justify-center py-2 text-xl text-gray-700">
      <button disabled={disabled} onClick={() => handleClick(1)}>
        <svg
          className={classes}
          fill={myVote && myVote.value === 1 ? "currentColor" : "none"}
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M14 10h4.764a2 2 0 011.789 2.894l-3.5 7A2 2 0 0115.263 21h-4.017c-.163 0-.326-.02-.485-.06L7 20m7-10V5a2 2 0 00-2-2h-.095c-.5 0-.905.405-.905.905 0 .714-.211 1.412-.608 2.006L7 11v9m7-10h-2M7 20H5a2 2 0 01-2-2v-6a2 2 0 012-2h2.5"
          ></path>
        </svg>
      </button>
      <span className="px-4">{score}</span>
      <button disabled={disabled} onClick={() => handleClick(0)}>
        <svg
          className={classes}
          fill={myVote && myVote.value === 0 ? "currentColor" : "none"}
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M10 14H5.236a2 2 0 01-1.789-2.894l3.5-7A2 2 0 018.736 3h4.018a2 2 0 01.485.06l3.76.94m-7 10v5a2 2 0 002 2h.096c.5 0 .905-.405.905-.904 0-.715.211-1.413.608-2.008L17 13V4m-7 10h2m5-10h2a2 2 0 012 2v6a2 2 0 01-2 2h-2.5"
          ></path>
        </svg>
      </button>
    </div>
  );
};

export default Score;
