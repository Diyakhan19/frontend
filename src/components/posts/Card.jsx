import moment from "moment";
import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import DeletePost from "@/components/modals/DeletePost";
import { useDispatch, useSelector } from "react-redux";
import { useAddRemoveFavPostMutation } from "@/redux/services/postService";
import toast from "react-hot-toast";
import { updateFavorites } from "@/redux/reducers/authSlice";

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

const Card = (props) => {
  const params = useSearchParams();
  const router = useRouter();
  const paramsUserId = params.get("userId");
  const dispatch = useDispatch();

  const { user } = useSelector((state) => state.auth);
  const favorites = user?.favorites;
  const post = props?.post;

  const [modal, setModal] = useState({
    isOpen: false,
    data: null,
  });

  if (!post) return;

  const { postId, title, city, createdAt, userId } = post;

  const isFavorite = favorites.find((item) => item.postId === postId);

  const isMe = +paramsUserId === userId;

  const [addRemoveFavPost] = useAddRemoveFavPostMutation();

  const onClickFavIcon = async () => {
    try {
      const res = await addRemoveFavPost({ postId }).unwrap();
      dispatch(updateFavorites(res.data));
    } catch (err) {
      toast.error("Something went wrong");
    }
  };

  return (
    <div>
      <DeletePost modal={modal} setModal={setModal} />

      <div className="border shadow rounded-lg w-full h-[250px] p-2 relative">
        <img
          src={`${BASE_URL}/${post.images[0]}`}
          className="rounded-lg object-cover w-full h-[150px] cursor-pointer"
          onClick={() => router.push(`/posts/${postId}`)}
        />

        {/* <div className="bg-white rounded-full border flex items-center justify-center p-1 absolute top-4 right-4 hover:scale-125 cursor-pointer">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokWidth="1.5"
              stroke="red"
              class="size-4"
              onClick={() => setModal({ isOpen: true, data: post })}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
              />
            </svg>
          </div> */}

        <div
          className="bg-white rounded-full border flex items-center justify-center p-1 absolute top-4 right-4 cursor-pointer"
          onClick={onClickFavIcon}
        >
          {isFavorite ? (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              class="size-5"
              className="h-[22px] w-[22px] mt-[1px]"
            >
              <path d="m11.645 20.91-.007-.003-.022-.012a15.247 15.247 0 0 1-.383-.218 25.18 25.18 0 0 1-4.244-3.17C4.688 15.36 2.25 12.174 2.25 8.25 2.25 5.322 4.714 3 7.688 3A5.5 5.5 0 0 1 12 5.052 5.5 5.5 0 0 1 16.313 3c2.973 0 5.437 2.322 5.437 5.25 0 3.925-2.438 7.111-4.739 9.256a25.175 25.175 0 0 1-4.244 3.17 15.247 15.247 0 0 1-.383.219l-.022.012-.007.004-.003.001a.752.752 0 0 1-.704 0l-.003-.001Z" />
            </svg>
          ) : (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              class="size-5"
              className="h-[22px] w-[22px] mt-[1px]"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z"
              />
            </svg>
          )}
        </div>

        <div className="my-2 flex flex-col gap-1">
          <h3 className="font-semibold text-md">{title}</h3>
          <h4 className="text-xs">{city}</h4>
          <h4 className="text-xs text-gray-500 mt-2 capitalize">
            {moment(createdAt).fromNow()}
          </h4>
        </div>
      </div>
    </div>
  );
};

export default Card;
