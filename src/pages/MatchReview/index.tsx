import React from "react";
import Layout from "layouts/App";
import { useParams } from "react-router-dom";

const MatchReview = () => {
  const { matchId } = useParams();
  return (
    <Layout>
      <h1>Match Review {matchId}</h1>
    </Layout>
  );
};

export default MatchReview;
