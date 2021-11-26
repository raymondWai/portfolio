import React,{ memo } from "react";
import { RouteProps } from "react-router-dom";
import Home from "../components/Home";

const HomeContainer = (props: RouteProps) => {
    return <Home/>
}
export default memo(HomeContainer)