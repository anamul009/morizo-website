import { createBrowserRouter } from 'react-router';
import { Layout } from './components/Layout';
import { Home } from './pages/Home';
import { Company } from './pages/Company';

// Vite sets BASE_URL to '/morizo-co-ltd/' in the Pages build, '/' in dev.
// React Router wants the basename without a trailing slash.
const basename = import.meta.env.BASE_URL.replace(/\/$/, '') || '/';

export const router = createBrowserRouter(
  [
    {
      path: '/',
      Component: Layout,
      children: [
        { index: true, Component: Home },
        { path: 'company', Component: Company },
      ],
    },
  ],
  { basename }
);
