import axios from "axios";
import { useEffect, useState, useCallback } from "react";
import { IoBookSharp } from "react-icons/io5";
import BookCard from "./BookCard";
import { useNavigate } from "react-router-dom";
import {debounce} from "lodash";

export interface booksProps {
  author_name: string[];
  title: string;
  edition_count: number;
}

export default function SearchBook() {
  const [bookname, setBookname] = useState<string>("");
  const [error, setError] = useState<string>("");
  const [books, setBooks] = useState<booksProps[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const navigate = useNavigate();
  let cancelToken: any = null;

  const handleBookChange = async (name: string) => {
    if (cancelToken) {
      cancelToken.cancel("Operation canceled due to new request.");
    }
    cancelToken = axios.CancelToken.source();
    try {
      setLoading(true);
      const response = await axios.get(
        `https://openlibrary.org/search.json?q=${name}&page=1&limit=10`,
        { cancelToken: cancelToken.token }
      );
      if (response.data.docs.length === 0) {
        setLoading(false);
        return;
      }
      const newBooks = response.data.docs.map((book: any) => {
        return {
          author_name: book.author_name,
          title: book.title,
          edition_count: book.edition_count,
        };
      });
      const limitedBooks = newBooks.slice(0, 10); // Limit the books to 10
      setBooks(limitedBooks);
      setError("");
    } catch (error) {
      if (axios.isCancel(error)) {
        console.log("Request canceled", error.message);
      } else {
        console.log(error);
        setError("An error occurred while fetching books.");
      }
    } finally {
      setLoading(false);
    }
  };

  // Debounced version of handleBookChange
  const debouncedHandleBookChange = useCallback(debounce(handleBookChange, 300), []);

  useEffect(() => {
    if (bookname) {
      debouncedHandleBookChange(bookname);
    }
    // Cleanup function to cancel debounce on component unmount
    return () => {
      debouncedHandleBookChange.cancel();
    };
  }, [bookname, debouncedHandleBookChange]);

  return (
    <div className="relative">
      <div className="flex items-center">
        <div className="flex flex-col items-center w-full">
          <label htmlFor="bookname" className="w-full font-roboto font-bold">
            Search book by name:
          </label>
          <input
            onClick={() => {
              setError("");
            }}
            onChange={(e) => {
              setBookname(e.target.value);
            }}
            type="text"
            id="bookname"
            placeholder="Enter the book name"
            className="border-2 border-black/50 rounded-[50px] h-10 px-3 text-black/80"
          />
        </div>
        <div
          onClick={() => {
            navigate("/mybookshelf");
          }}
          className="absolute cursor-pointer right-0 top-5 hidden md:flex border-2 px-3 py-1 bg-green-500 text-white font-bold rounded-[50px] text-xl"
        >
          My Bookshelf
        </div>
        <div
          onClick={() => {
            navigate("/mybookshelf");
          }}
          className="absolute cursor-pointer right-0 top-5 flex md:hidden px-2 rounded-[50%] bg-black/70"
        >
          <IoBookSharp className="h-10 text-2xl text-green-500" />
        </div>
      </div>
      {error && <div className="text-red-500">{error}</div>}
      {loading && <div>Loading...</div>}
      <div className="grid grid-cols-1 md:grid-cols-3 place-items-center">
        {books.map((book) => (
          <BookCard key={book.title} book={book} />
        ))}
      </div>
    </div>
  );
}
