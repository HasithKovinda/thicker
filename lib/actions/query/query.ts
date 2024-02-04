"use server";

import { QueryType } from "@/types/userInput";
import Query from "@/model/Query";

export async function createQuery(
  data: QueryType,
  userId: string
): Promise<string> {
  try {
    await Query.create({ ...data, userId });
    return "Query created successfully";
  } catch (error) {
    throw new Error("Something went wrong");
  }
}

export async function fetchQuery(userId: string): Promise<number> {
  try {
    const queries = await Query.countDocuments({ userId, isRead: true });
    return queries;
  } catch (error) {
    throw new Error("Something went wrong");
  }
}
