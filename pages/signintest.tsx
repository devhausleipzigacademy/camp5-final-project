import React, { useState } from "react";
import {
    getProviders,
    signIn,
    getSession,
    getCsrfToken,
} from "next-auth/react";
import { NextPageContext } from "next";
import GoogleIcon from "../public/google.svg";
import FacebookIcon from "../public/facebook.svg";
import Button from "../components/Button/Button";
