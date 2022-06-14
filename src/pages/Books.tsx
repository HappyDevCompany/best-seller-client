import { useQuery } from "@apollo/client";
import Card from "../components/Card";
import { BOOKS_QUERY } from "../graphql/queries";

const Books = () => {
  const { data, loading, error } = useQuery(BOOKS_QUERY,{
    pollInterval: 500
  });

  if (loading) {
    return <div className="max-w-4xl mx-auto py-10 px:10 md:px-0">
      <div className="font-bold text-3xl mb-5">Loading...</div>
    </div>
  }

  if (error) {
    return <div className="max-w-4xl mx-auto py-10 px:10 md:px-0">
      <div className="font-bold text-3xl mb-5">Error loading 💀😡</div>
    </div>
  }

  console.log(data)

  return (
    <div className="max-w-4xl mx-auto py-10 px:10 md:px-0">
      <div className="font-bold text-3xl mb-7">NOS LIVRES</div>
      <div className="grid grid-cols-5 gap-6">
        {data.books.map((book: any) => <Card key={book.id} {...book} />)}
      </div>
    </div>
  );
};

export default Books;
