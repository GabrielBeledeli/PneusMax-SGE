import { NextResponse } from "next/server";

const BACKEND_API_URL = process.env.BACKEND_API_URL ?? "http://localhost:3001";

async function proxyPneus(requestInit?: RequestInit) {
  try {
    const response = await fetch(`${BACKEND_API_URL}/pneus`, {
      ...requestInit,
      headers: {
        "Content-Type": "application/json",
        ...requestInit?.headers,
      },
      cache: "no-store",
    });

    const text = await response.text();

    return new NextResponse(text, {
      status: response.status,
      headers: {
        "Content-Type": response.headers.get("Content-Type") ?? "application/json",
      },
    });
  } catch (error) {
    console.error("Erro ao comunicar com o backend:", error);
    return NextResponse.json(
      { erro: "Falha ao comunicar com o backend" },
      { status: 502 },
    );
  }
}

export async function GET() {
  return proxyPneus();
}

export async function POST(request: Request) {
  const body = await request.json();

  return proxyPneus({
    method: "POST",
    body: JSON.stringify(body),
  });
}
