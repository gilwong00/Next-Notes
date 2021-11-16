import { User } from '../@types';
import { createStore } from 'solid-js/store';

const [user, setUser] = createStore<User>({} as User);

export { user, setUser };
