import React from "react";
import { useWebMap } from "esri-loader-hooks";

const WebMap = () => {
  const [ref] = useWebMap("d9677f2ef1d547c29fc30e628596f0c0");
  return <div style={{ height: 400 }} ref={ref} />;
};

export default WebMap;
