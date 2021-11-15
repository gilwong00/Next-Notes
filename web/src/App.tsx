import type { Component } from 'solid-js';
import { Routes, Route } from 'solid-app-router';
import { Layout } from './Layout';
import { Login } from './Auth';
import { ProtectedRoute } from './ProtectedRoute';
import { Home } from './Home';
import { createQuery } from 'solid-urql';
import { whoamiQuery } from './graphql/queries/whoami';

const App: Component = () => {
  const [items, itemsState] = createQuery({
    query: whoamiQuery
  });

  console.log('items', items());
  console.log('itemsState', itemsState().fetching);

  return (
    <Layout>
      <Routes>
        <Route path='/login' element={<Login />} />
        <Route path='/' element={<ProtectedRoute />}>
          <Route path='/' element={<Home />} />
        </Route>
        {/* <Route path='/users/:id' element={<User />}>
          <Route path='/' element={<UserHome />} />
          <Route path='/settings' element={<UserSettings />} />
          <Route path='/*all' element={<UserNotFound />} />
        </Route>
        <Route path='/' element={<Home />} />
        <Route path='/*all' element={<NotFound />} /> */}
      </Routes>
    </Layout>
  );
};

export default App;
