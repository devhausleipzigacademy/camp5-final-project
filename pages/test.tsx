import { NextPage } from "next";
import { useRouter } from "next/router";
import React from "react";
import BurgerDropDown from "../components/BurgerDropDown/BurgerDropDown";

const TestPage: NextPage = () => {
    const router = useRouter();

    return (
        <div className="bg-primary h-full">
            <BurgerDropDown />;
        </div>
    );
};

export default TestPage;
