import { atom } from "recoil";
import { recoilPersist } from "recoil-persist";
const { persistAtom } = recoilPersist();
export const userBooksAtom = atom({
  key: "userBooksAtom",
  default: [
  ],
  effects_UNSTABLE: [persistAtom],
});
