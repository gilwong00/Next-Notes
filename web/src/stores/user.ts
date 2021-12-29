import create from 'zustand';
import { devtools } from 'zustand/middleware';
import { User } from '../@types';

interface UserStore {
  user: User | null;
  setUser: (user: User) => void;
}

const userStore = create<UserStore>(
  devtools(set => ({
    user: null,
    setUser: (user: User) => set({ user })
  }))
);

export default userStore;
