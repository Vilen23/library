import { useRecoilValue } from "recoil";
import { userBooksAtom } from "../states/bookstate";
import BookCard from "./BookCard";
import { booksProps } from "./SearchBook";

export default function MyBooks() {
  const books = useRecoilValue(userBooksAtom);
  if (books.length === 0) {
    return <h1>No books found</h1>;
  }
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 place-items-center">
      {books.map((book: booksProps) => (
        <BookCard key={book.title} book={book} />
      ))}
    </div>
  );
}
