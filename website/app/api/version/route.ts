import { getReleaseIntel } from "../../../lib/release-intel";

export async function GET() {
  const release = await getReleaseIntel();

  return Response.json(release, {
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Cache-Control": "public, max-age=300, s-maxage=1800, stale-while-revalidate=86400",
    },
  });
}
