import React from "react";
import { useEffect } from "react";
import { useParams } from "react-router-dom";

export default function BusDetails() {
  const { id } = useParams();

  useEffect(() => {}, []);
  return <div>BusDetails</div>;
}