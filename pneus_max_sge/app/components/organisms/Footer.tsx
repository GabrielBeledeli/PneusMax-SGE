export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="fixed inset-x-0 bottom-0 z-40 flex h-10 items-center justify-center bg-surface-darker text-center text-sm text-text-light shadow-inner">
      <p>
        &copy; {currentYear} PneusMax SGE. Todos os direitos reservados.
      </p>
    </footer>
  );
}
