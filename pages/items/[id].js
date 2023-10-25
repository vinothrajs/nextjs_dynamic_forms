import { useRouter } from 'next/router';
import Layout from '../../components/Layout';

const ItemDetail = () => {
  const router = useRouter();
  const { id } = router.query;

  return (
    <Layout>
      <div className="container mx-auto">
        <h1>Item Detail Page</h1>
        <p>Item ID: {id}</p>
      </div>
    </Layout>
  );
};

export default ItemDetail;
