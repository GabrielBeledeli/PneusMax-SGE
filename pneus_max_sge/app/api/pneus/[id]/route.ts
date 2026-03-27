import { NextResponse } from "next/server";

// Exportamos o método PUT, que é o padrão para atualizações
export async function PUT(
  request: Request, 
  props: { params: Promise<{ id: string }> }
) {
  try {
    // No Next.js 15+, os params são uma Promise, então precisamos aguardar (await)
    const { id } = await props.params;
    
    // Pegamos os dados atualizados que vieram do formulário
    const body = await request.json();
    
    // Simula o tempo de processamento do banco de dados (1 segundo)
    await new Promise((resolve) => setTimeout(resolve, 1000));

    // Como é um Mock, retornamos sucesso e devolvemos os dados
    return NextResponse.json({ 
      mensagem: `Pneu ID ${id} atualizado com sucesso!`, 
      dados: body 
    }, { status: 200 });

  } catch (error) {
    console.error("Erro na atualização:", error);
    return NextResponse.json({ erro: "Falha ao atualizar o pneu" }, { status: 500 });
  }
}