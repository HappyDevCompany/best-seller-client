import { useMutation } from "@apollo/client";
import React from "react";
import { ADD_COMMENT_BOOK_MUTATION } from "../graphql/mutations";

type Props = {
  id: any;
  user: any;
  comments: any[];
};

const CommentBox = ({ id, user, comments }: Props) => {
  const [text, setText] = React.useState<any>();
  const [addCommentBookMutation, { data, loading, error }] = useMutation<any>(
    ADD_COMMENT_BOOK_MUTATION,
    {
      variables: { id, userId: user.id, text },
    }
  );

  const handleMessageSubmit = (e: any) => {
    e.preventDefault();
    addCommentBookMutation()
      .then((res) => {
        console.log(res.data);
        setText('')
      })
      .catch((error) => console.log(error));
  };

  return (
    <React.Fragment>
      <div className="text-gray-700 text-sm mb-2 font-semibold">
        Ecrire un commentaire :
      </div>

      <form
        onSubmit={handleMessageSubmit}
        className="grid grid-cols-4 gap-4 mb-10"
      >
        <fieldset className="col-span-3">
          <input
            type="text"
            id="text"
            value={text}
            onChange={(e) => setText(e.target.value)}
            className="border border-gray-300 outline-none p-2 w-full rounded"
          />
        </fieldset>
        <div className="col-span-1">
          <button className="flex items-center justify-center gap-2 w-full outline-none border-none rounded bg-blue-500 hover:bg-blue-600 transition-colors text-sm text-white p-2">
            {!loading ? (
              <>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M13 9l3 3m0 0l-3 3m3-3H8m13 0a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
                <span>Envoyer</span>
              </>
            ) : (
              "loading..."
            )}
          </button>
        </div>
      </form>

      <div className="text-gray-700 text-sm mb-4 font-semibold">
        {comments.length} commentaire{comments.length > 1 ? 's':''}
      </div>

      {comments.map((comment) => (
        <CommentItem key={comment.id} comment={comment} />
      ))}
    </React.Fragment>
  );
};

const CommentItem = ({ comment }: any) => (
  <div className="flex gap-4 mb-4 text-gray-600 border-b border-b-gray-300 pb-4">
    <div>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-10 w-10"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth={2}
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M5.121 17.804A13.937 13.937 0 0112 16c2.5 0 4.847.655 6.879 1.804M15 10a3 3 0 11-6 0 3 3 0 016 0zm6 2a9 9 0 11-18 0 9 9 0 0118 0z"
        />
      </svg>
    </div>

    <div className="text-sm">
      <div className="font-semibold">{comment?.user?.username} {/*- <span className="font-light">{new Date(comment.createdAt).toDateString()}</span>*/}</div>
      <div className="text-gray-500">{comment?.text}</div>
    </div>
  </div>
);

export default CommentBox;
