"use server";

import { getArtworks } from "@/lib/api";

export async function fetchArtData() {
  const response = await getArtworks();
  console.log(response);
  return response.data?.data;
}

