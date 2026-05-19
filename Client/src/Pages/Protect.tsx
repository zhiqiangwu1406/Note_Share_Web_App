import { useSelector } from "react-redux";
import type { RootState } from "../Store";
import React, { useEffect } from "react";
import { useNavigate } from "react-router";

interface Props {
  children: React.ReactNode;
}

function Protect({ children }: Props) {
  const userInfo = useSelector((state: RootState) => state.auth.userInfo);
  const navigate = useNavigate();
  useEffect(() => {
    if (!userInfo) {
      navigate("/");
    }
  }, [userInfo, navigate]);
  return <>{children}</>;
}

export default Protect;
