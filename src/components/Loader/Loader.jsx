import React from "react";
import { MutatingDots } from "react-loader-spinner";

const Loader = () => {
    return <MutatingDots 
    height="100"
    width="100"
    color="#3f51b5"
    secondaryColor= '#3f51b5'
    radius='12.5'
    ariaLabel="mutating-dots-loading"
    wrapperStyle={{margin: '0 auto'}}
    wrapperClass=""
    visible={true}
    />
}

export default Loader;