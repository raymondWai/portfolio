import React from 'react';
import { RouteProps } from 'react-router-dom';

interface HomeProps extends RouteProps {}
const Home = (props: HomeProps) => {
    return <div>Home</div>;
};
Home.propTypes = {};
export default Home;
