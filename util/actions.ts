"use server";

import connect from "@/DB/db";
import Tours from "@/model/Tours";

export async function fetchAllTours() {
  await connect();
  const tours = await Tours.find();
  //   console.log(tours);
}
