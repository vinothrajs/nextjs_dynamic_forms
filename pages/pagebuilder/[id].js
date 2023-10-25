// pages/items/[id].js

import { useRouter } from 'next/router';
import Layout from '../../components/Layout';
import React, { useState } from 'react';
import DynamicForm from '../../components/DynamicForm';
import RecordGrid from '../../components/ResultGrid';

const DynamicPage = ({metadata}) => {
  const [records, setRecords] = useState([]);
  const [showGrid, setShowGrid] = useState(false);

  const handleFormSubmit = (formData) => {
    console.log("formData" + formData)
    const newRecord = { ...formData };
    setRecords([...records, newRecord]);
    setShowGrid(true);
  };
  return (
    <Layout>
      <div>
        <h2>{metadata[0].PageName}</h2>
        <p>{metadata[0].PageDesc}</p>
      <DynamicForm metadata={metadata[0]} onFormSubmit={handleFormSubmit}  />
      <br/>
      <h5>Records</h5>
      <pre>{JSON.stringify(records, null, 2)}</pre>
    </div>
    </Layout>
  );
};

//export async function getStaticProps(context) {
export async function getServerSideProps(context) {
  const { id } = context.params
  const res = await fetch(`http://localhost:3000/api/metadata?filterParam=${id}`); // Replace with your API endpoint
  const metadata = await res.json();
  return {
    props: { metadata },
    //revalidate: 60, // Set the revalidation interval to 60 seconds
  };
};

// export async function getStaticPaths() {

//   const menus = ['Order', 'Enquiry'];

//   const paths = menus.map((menu) => ({
//     params: { id : menu.toString() }
//   }));

//   return {
//     paths ,
//     fallback: false, // Set fallback to false to return a 404 for unknown paths
//   };
// }

export default DynamicPage;


