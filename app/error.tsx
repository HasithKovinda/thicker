"use client";
import Error from "@/components/Error/Error";
import React from "react";

export default function ErrorHandle() {
  return (
    <Error
      title="Opps! Something Went Wrong!"
      path="/assert/error.jpg"
      content="For network or database errors, or if there's an issue fetching data, the page you're looking for may not be available. We've scrambled it like a type specimen book. Please return to the homepage."
    />
  );
}
