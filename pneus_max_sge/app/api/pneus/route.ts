import { NextResponse } from "next/server";

// A função TEM que se chamar POST (em maiúsculo) e não pode ter 'default'
export async function POST(request: Request) {
  try {
    const body = await request.json();
    
    // Simula um tempo de rede para você ver o botão "Salvando..."
    await new Promise((resolve) => setTimeout(resolve, 1000));

    // Retorna o status 201 (Created) que o nosso formulário está esperando
    return NextResponse.json({ 
      mensagem: "Pneu cadastrado com sucesso!", 
      pneu: body 
    }, { status: 201 });

  } catch (error) {
    console.error("Erro no backend:", error);
    return NextResponse.json({ erro: "Falha ao processar requisição" }, { status: 500 });
  }
}