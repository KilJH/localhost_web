import { GetStaticProps, GetStaticPaths } from 'next';
import UserList from '../../../components/admin/user/UserList';
import { User } from '../../../interfaces';
import Layout from '../../../components/main/Layout';
import axios from 'axios';
import SERVER from '../../../utils/url';

type Props = {
  pageProps: {
    items: User[];
    item?: User;
  };
};

const StaticPropsDetail = ({ pageProps }: Props) => {
  return (
    <Layout title='회원목록 | localhost'>
      <UserList {...pageProps} search={pageProps.item} />
    </Layout>
  );
};

export default StaticPropsDetail;

export const getStaticPaths: GetStaticPaths = async () => {
  const paths = await (
    await axios.get(`${SERVER}/api/user/list`)
  ).data.users.map((user) => ({
    params: { id: user.id.toString() },
  }));

  return { paths, fallback: false };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  try {
    const id = params?.id;
    const items: User[] = await (await axios.get(`${SERVER}/api/user/list`))
      .data.users;
    const item = await (await axios.get(`${SERVER}/api/user/${id}`)).data.user;
    return { props: { item, items } };
  } catch (err) {
    return { props: { errors: err.message } };
  }
};
