import { useMutation, useQuery } from "@apollo/client";
import React from "react";
import { useParams, Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { BOOK_QUERY } from "../graphql/queries";
import { isInArray } from "../utils/customFunction";
import {
  ADD_FAVORITE_BOOK_MUTATION,
  DISLIKE_BOOK_MUTATION,
  LIKE_BOOK_MUTATION,
  REMOVE_FAVORITE_BOOK_MUTATION,
} from "../graphql/mutations";
import { login } from "../store/authSlice";
import CommentBox from "../components/CommentBox";

const Loader = () => (
  <svg
    className="h-5 w-5"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M12 22C17.5228 22 22 17.5228 22 12H19C19 15.866 15.866 19 12 19V22Z"
      fill="currentColor"
    />{" "}
    <path
      d="M2 12C2 6.47715 6.47715 2 12 2V5C8.13401 5 5 8.13401 5 12H2Z"
      fill="currentColor"
    />
  </svg>
);

const Book = () => {
  const { id }: any = useParams();
  const user: any = useSelector<any>((state: any) => state.auth.user);
  const dispatch = useDispatch();
  const { data, loading, error } = useQuery(BOOK_QUERY, { variables: { id } });
  const [addFavoriteBookMutation, addFavoriteButtonOption] = useMutation<any>(
    ADD_FAVORITE_BOOK_MUTATION,
    {
      variables: { id: user.id, bookId: id },
    }
  );
  const [removeFavoriteBookMutation, removeFavoriteButtonOption] =
    useMutation<any>(REMOVE_FAVORITE_BOOK_MUTATION, {
      variables: { id: user.id, bookId: id },
    });
  const [likeBookMutation, likeBookOption] = useMutation<any>(
    LIKE_BOOK_MUTATION,
    {
      variables: { id, userId: user.id },
    }
  );
  const [dislikeBookMutation, dislikeBookOption] = useMutation<any>(
    DISLIKE_BOOK_MUTATION,
    {
      variables: { id, userId: user.id },
    }
  );

  if (loading) {
    return (
      <div className="max-w-4xl mx-auto py-10 px:10 md:px-0">
        <div className="font-bold text-xl mb-5">Loading...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="md:max-w-4xl mx-auto py-10 px:10 md:px-0">
        <div className="font-bold text-xl mb-5">Error loading 💀😡</div>
      </div>
    );
  }

  console.log(data);

  const handleFavorite = (e: any) => {
    e.preventDefault();
    if (!isInArray(id, user.favorites)) {
      addFavoriteBookMutation()
        .then((res) => {
          console.log(res.data);
          dispatch(login(res.data.addFavoriteBook));
        })
        .catch((error) => console.log(error));
    } else {
      removeFavoriteBookMutation()
        .then((res) => {
          console.log(res.data);
          dispatch(login(res.data.removeFavoriteBook));
        })
        .catch((error) => console.log(error));
    }
  };

  const handleLike = (e: any) => {
    e.preventDefault();
    if (!isInArray(user.id, data.book.likers)) {
      likeBookMutation()
        .then((res) => {
          console.log(res.data);
        })
        .catch((error) => console.log(error));
    } else {
      dislikeBookMutation()
        .then((res) => {
          console.log(res.data);
        })
        .catch((error) => console.log(error));
    }
  };

  const favoriteButtonRender = () => {
    if (addFavoriteButtonOption.loading || removeFavoriteButtonOption.loading) {
      return <Loader />;
    } else {
      return (
        <>
          {!isInArray(id, user.favorites) ? (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"
              />
            </svg>
          ) : (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
            </svg>
          )}
        </>
      );
    }
  };

  const likeButtonRender = () => {
    if (likeBookOption.loading || dislikeBookOption.loading) {
      return <Loader />;
    } else {
      return (
        <>
          <span className="">{data.book.likers.length}</span>
          {!isInArray(user.id, data.book.likers) ? (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
              />
            </svg>
          ) : (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z"
                clipRule="evenodd"
              />
            </svg>
          )}
        </>
      );
    }
  };

  return (
    <div className="max-w-4xl mx-auto py-10 px-5 md:px-0">
      <div className="grid grid-cols-4 gap-3 mb-5">
        <div className="col-span-1">
          <img
            src={data.book.cover}
            alt="book cover"
            className="w-full rounded mb-4 object-cover"
          />
          <div className="flex gap-2">
            {user.isAdmin && <div className="flex-1">
              <Link
                title="Modifier le livre"
                to={`/update-book/${id}`}
                className="flex items-center justify-center border border-gray-300 rounded text-gray-500 w-full outline-none  p-2"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                </svg>
              </Link>
            </div>}
            <div className="flex-1">
              <button
                type="button"
                onClick={handleFavorite}
                className={`flex items-center justify-center border ${
                  !isInArray(id, user.favorites)
                    ? "border-gray-300 text-gray-500"
                    : "border-blue-400 text-blue-500"
                }  rounded w-full outline-none p-2`}
              >
                {favoriteButtonRender()}
              </button>
            </div>
            <div className="flex-1">
              <button
                type="button"
                onClick={handleLike}
                className={`flex items-center justify-center gap-1 border ${
                  !isInArray(user.id, data.book.likers)
                    ? "border-gray-300 text-gray-500"
                    : "border-blue-400 text-blue-500"
                } rounded  font-semibold text-sm  w-full outline-none  p-2`}
              >
                {likeButtonRender()}
              </button>
            </div>
          </div>
        </div>
        <div className="col-span-3 md:pl-4">
          <div className="mb-7">
            <div className="text-sm mb-2">
              <span className="font-semibold text-gray-700">
                Nom du livre :
              </span>{" "}
              {data.book.name}
            </div>
            <div className="text-sm mb-2">
              <span className="font-semibold text-gray-700">Auteur :</span>{" "}
              {data.book.author}
            </div>
            <div className="text-sm mb-2">
              <span className="font-semibold text-gray-700">Edition :</span>{" "}
              {data.book.edition}
            </div>
            <div className="text-sm mb-2">
              <span className="font-semibold text-gray-700">
                Nombre de pages :
              </span>{" "}
              {data.book.numberPages}
            </div>
            <div className="text-sm mb-2">
              <span className="font-semibold text-gray-700">
                Date de publication :
              </span>{" "}
              {data.book.editionDate}
            </div>

            <div className="text-sm mb-2 text-gray-700">
              <span className="font-semibold">Resumé :</span>
            </div>
            <div className="text-sm">{data.book.summary}</div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-4 gap-3">
        <div className="col-start-2 col-span-3 md:pl-4">
          <CommentBox id={id} user={user} comments={data.book.comments} />
        </div>
      </div>
    </div>
  );
};

export default Book;
