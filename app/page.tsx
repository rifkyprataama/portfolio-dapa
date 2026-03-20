export default function Home() {
  return (
    // Tambahkan max-w-6xl dan mx-auto di sini untuk menengahkan dan membatasi lebar
    <div className="max-w-6xl mx-auto flex min-h-screen px-4 sm:px-6 lg:px-8">
      
      {/* Area Sidebar */}
      <aside className="hidden md:flex w-64 flex-col border-r py-12 pr-8">
        <h2 className="text-xl font-bold mb-4">Portfolio</h2>
        <p className="text-sm text-muted-foreground">Navigasi akan ada di sini</p>
      </aside>

      {/* Area Konten Utama */}
      <main className="flex-1 py-12 pl-8">
        <h1 className="text-3xl font-bold">Halo, Daffa!</h1>
        <p className="text-muted-foreground mt-2">
          Layout sekarang sudah memiliki batas lebar dan berada di tengah layar.
        </p>
      </main>
      
    </div>
  );
}