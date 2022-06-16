import { useQuery } from "@apollo/client";
import React from "react";
import { useSelector } from "react-redux";
import Card from "../components/Card";
import { BOOKS_QUERY } from "../graphql/queries";
import { isInArray } from "../utils/customFunction";

const Favorites = () => {
  const user: any = useSelector<any>((state: any) => state.auth.user);
  const { data, loading, error } = useQuery(BOOKS_QUERY, {
    pollInterval: 500,
  });

  if (loading) {
    return (
      <div className="max-w-4xl mx-auto py-10 px:10 md:px-0">
        <div className="font-bold text-xl mb-5">Loading...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-w-4xl mx-auto py-10 px:10 md:px-0">
        <div className="font-bold text-xl mb-5">Error loading 💀😡</div>
      </div>
    );
  }

  console.log(data);

  return (
    <div className="max-w-4xl mx-auto py-10">
      <div className="font-bold text-3xl mb-7">MES FAVORIS</div>
      <div className="grid grid-cols-4 gap-6">
        {data.books
          .filter((book: any) => isInArray(book.id, user.favorites))
          .map((book: any) => (
            <Card key={book.id} {...book} />
          ))}
      </div>
    </div>
  );
};

export default Favorites;
