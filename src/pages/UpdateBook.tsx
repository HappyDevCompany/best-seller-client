import { useMutation, useLazyQuery } from "@apollo/client";
import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { UPDATE_BOOK_MUTATION } from "../graphql/mutations";
import { BOOK_QUERY } from "../graphql/queries";

const UpdateBook = () => {
  const { id } = useParams();
  const [name, setName] = React.useState<any>();
  const [cover, setCover] = React.useState<any>();
  const [author, setAuthor] = React.useState<any>();
  const [edition, setEdition] = React.useState<any>();
  const [editionDate, setEditionDate] = React.useState<any>();
  const [summary, setSummary] = React.useState<any>();
  const [numberPages, setNumberPages] = React.useState<any>();
  const [bookQuery] = useLazyQuery(BOOK_QUERY);
  const [updateBookMutation, { loading, error, data }] =
    useMutation<any>(UPDATE_BOOK_MUTATION);

  useEffect(() => {
    bookQuery({ variables: { id } })
      .then((res) => {
        console.log(res.data);
        const book = res.data.book;
        setName(book.name);
        setCover(book.cover);
        setAuthor(book.author);
        setEdition(book.edition);
        setEditionDate(book.editionDate);
        setSummary(book.summary);
        setNumberPages(book.numberPages);
      })
      .catch((error) => console.log(error));
  }, []);

  const handleSubmit = (e: any) => {
    e.preventDefault();

    if (
      name &&
      cover &&
      author &&
      edition &&
      editionDate &&
      summary &&
      numberPages
    ) {
      updateBookMutation({
        variables: {
          id,
          name,
          cover,
          author,
          edition,
          editionDate,
          summary,
          numberPages,
        },
      })
        .then((res) => {
          console.log(res.data);
          const book = res.data.updateBook;
          setName(book.name);
          setCover(book.cover);
          setAuthor(book.author);
          setEdition(book.edition);
          setEditionDate(book.editionDate);
          setSummary(book.summary);
          setNumberPages(book.numberPages);
        })
        .catch((error) => console.log(error));
    } else {
      alert("Les mots ne sont pas identiques !");
    }
  };

  return (
    <div className="max-w-4xl mx-auto  py-10 px-5 md:px-0">
      <div className="font-bold text-3xl mb-7">MODIFIER LE LIVRE</div>
      <form
        onSubmit={handleSubmit}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4"
      >
        <fieldset className="col-span-1">
          <label htmlFor="username" className="text-sm text-gray-500 mb-3">
            Nom du livre
          </label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="border border-gray-300 outline-none p-2 w-full rounded"
          />
        </fieldset>
        <fieldset className="col-span-1">
          <label htmlFor="username" className="text-sm text-gray-500 mb-3">
            Lien de la photo de couverture
          </label>
          <input
            type="text"
            id="cover"
            value={cover}
            onChange={(e) => setCover(e.target.value)}
            className="border border-gray-300 outline-none p-2 w-full rounded"
          />
        </fieldset>
        <fieldset className="col-span-1">
          <label htmlFor="username" className="text-sm text-gray-500 mb-3">
            Nom de l'auteur
          </label>
          <input
            type="text"
            id="author"
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
            className="border border-gray-300 outline-none p-2 w-full rounded"
          />
        </fieldset>
        <fieldset className="col-span-1">
          <label htmlFor="username" className="text-sm text-gray-500 mb-3">
            Edition
          </label>
          <input
            type="text"
            id="edition"
            value={edition}
            onChange={(e) => setEdition(e.target.value)}
            className="border border-gray-300 outline-none p-2 w-full rounded"
          />
        </fieldset>
        <fieldset className="col-span-1">
          <label htmlFor="username" className="text-sm text-gray-500 mb-3">
            Date de la publication
          </label>
          <input
            type="text"
            id="editionDate"
            value={editionDate}
            onChange={(e) => setEditionDate(e.target.value)}
            className="border border-gray-300 outline-none p-2 w-full rounded"
          />
        </fieldset>
        <fieldset className="col-span-1">
          <label htmlFor="username" className="text-sm text-gray-500 mb-3">
            Nombre de pages
          </label>
          <input
            type="number"
            id="numberPages"
            value={numberPages}
            onChange={(e) => setNumberPages(e.target.value)}
            className="border border-gray-300 outline-none p-2 w-full rounded"
          />
        </fieldset>
        <fieldset className="col-span-1">
          <label htmlFor="username" className="text-sm text-gray-500 mb-3">
            Resumé
          </label>
          <textarea
            id="summary"
            value={summary}
            onChange={(e) => setSummary(e.target.value)}
            className="border border-gray-300 outline-none p-2 w-full rounded h-32 max-h-32"
          ></textarea>
        </fieldset>

        <div className="col-span-1 md:col-span-2 lg:col-span-3">
          <div className="grid grid-cols-3 gap-3">
            <div className="col-span-1">
              {error?.message && !loading && (
                <div className="bg-red-200 py-1 px-2 text-sm rounded-md mb-5">
                  {error.message}
                </div>
              )}
              {!error && !loading && data?.updateBook && (
                <div className="bg-green-200 py-1 px-2 text-sm rounded-md mb-5">
                  Le livre a été modifier avec success !
                </div>
              )}
            </div>
          </div>
        </div>
        <div className="col-span-1 md:col-span-2 lg:col-span-3">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <div className="col-span-1">
              <button className="flex items-center justify-center w-full outline-none border-none rounded bg-blue-500 hover:bg-blue-600 transition-colors text-white p-2">
                {!loading ? (
                  <span>Mettre à jour</span>
                ) : (
                  <span>loading...</span>
                )}
              </button>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default UpdateBook;
