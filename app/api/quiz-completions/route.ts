import { NextResponse } from "next/server";
import { Redis } from "@upstash/redis";
const redis = Redis.fromEnv();
const KEY = "quiz-completions";

export async function GET() {
  const count = (await redis.get<number>(KEY)) ?? 0;
  return NextResponse.json({ count });
}

export async function POST() {
  const count = await redis.incr(KEY);
  return NextResponse.json({ count });
}

