import type { Component } from 'solid-js';
import { Routes, Route } from 'solid-app-router';
import { Layout } from './Layout';
import { Login } from './Auth';
import { ProtectedRoute } from './ProtectedRoute';
import { Home } from './Home';

const App: Component = () => {
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
