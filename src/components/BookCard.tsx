import { useRecoilState } from "recoil";
import { booksProps } from "./SearchBook";
import { userBooksAtom } from "../states/bookstate";

export default function BookCard({ book }: { book: booksProps }) {
  const [userbooks, setUserbooks] = useRecoilState(userBooksAtom);
  const handleAddBook = () => {
    setUserbooks((oldbooks: any) => [...oldbooks, book]);
  };
  return (
    <div className="w-[80vw] md:w-[300px] my-10 font-roboto">
      <div className="border-2 px-10 pt-10 pb-5 font-roboto rounded-[20px] flex flex-col items-start relative w-full">
        <div className="flex flex-col items-start">
          <p className="font-semibold line-clamp-1">{book.title}</p>
          <ul className="list-disc pl-5">
            {" "}
            <li>
              <p className="font-semibold text-start text-black/70 text-sm">
                <i>By -</i> {book.author_name[0]}
              </p>
            </li>
            <li>
              <p className="text-sm text-blue-500 text-start">
                <i className="text-black/70 font-semibold no-underline">
                  Edition Count
                </i>{" "}
                <b>{book.edition_count}</b>
              </p>
            </li>
          </ul>
        </div>
        <div className="flex items-center justify-center w-[100%] mt-2">
          <button
            onClick={handleAddBook}
            className="bg-green-500/85 text-white px-3 font-bold rounded-2xl"
          >
            {(userbooks.find((b: any) => b.title === book.title))?"": "Add to my bookshelf"}
          </button>
        </div>
      </div>
    </div>
  );
}
