import {Outlet} from '@remix-run/react';
import {Layout} from '~/components/Layout';
import {MyContextProvider} from '~/components/TalentContext';

export default function Index() {
  return (
    <MyContextProvider>
      <Layout>
        <Outlet></Outlet>
      </Layout>
    </MyContextProvider>
  );
}
