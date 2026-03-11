// app/api/visitors/route.ts
import { NextResponse } from "next/server";
import { promises as fs } from "fs";
import path from "path";

const filePath = path.join(process.cwd(), "data", "visitors.json");

async function getCount(): Promise<number> {
  try {
    const raw = await fs.readFile(filePath, "utf-8");
    return JSON.parse(raw).count ?? 0;
  } catch {
    return 0;
  }
}

async function saveCount(count: number) {
  await fs.mkdir(path.dirname(filePath), { recursive: true });
  await fs.writeFile(filePath, JSON.stringify({ count }), "utf-8");
}

// GET — just read current count
export async function GET() {
  const count = await getCount();
  return NextResponse.json({ count });
}

// POST — increment and return new count
export async function POST() {
  const count = (await getCount()) + 1;
  await saveCount(count);
  return NextResponse.json({ count });
}