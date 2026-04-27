export default async function Produtos() {
  const res = await fetch('http://localhost:3001/pneus', {
    cache: 'no-store',
  });

  const pneus = await res.json();

  return (
    <div>
      <h1>Pneus</h1>

      {pneus.map((p: any) => (
        <div key={p.id} style={{ border: '1px solid #ccc', margin: 10, padding: 10 }}>
          <p><strong>Marca:</strong> {p.marca}</p>
          <p><strong>Modelo:</strong> {p.modelo}</p>
          <p><strong>Medida:</strong> {p.medida}</p>
          <p><strong>Preço:</strong> R$ {p.preco}</p>
          <p><strong>Quantidade:</strong> {p.quantidade}</p>
        </div>
      ))}
    </div>
  );
}