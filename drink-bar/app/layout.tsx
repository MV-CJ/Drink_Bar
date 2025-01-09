import './globals.css';

export const metadata = {
  title: 'Drink Craft',
  description: 'A professional platform for baristas and cocktail enthusiasts.',
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-gray-200 min-h-screen flex flex-col">
        <header className="bg-gray-800 shadow-md text-gray-100 py-5 px-8">
          <div className="flex justify-between items-center max-w-7xl mx-auto">
            <h1 className="text-3xl font-bold">
              Drink<span className="text-accent-color">Craft</span>
            </h1>
            <nav>
              <ul className="flex space-x-6">
                <li>
                  <a href="#" className="hover:text-accent-color transition duration-200">Home</a>
                </li>
                <li>
                  <a href="#" className="hover:text-accent-color transition duration-200">Categories</a>
                </li>
                <li>
                  <a href="#" className="hover:text-accent-color transition duration-200">Contact</a>
                </li>
              </ul>
            </nav>
          </div>
        </header>
        <main className="flex-grow max-w-7xl mx-auto p-8">
          {children}
        </main>
        <footer className="bg-gray-800 py-4 text-gray-400 text-center">
          <p>© 2025 DrinkCraft. Elevating the art of cocktails.</p>
        </footer>
      </body>
    </html>
  );
}
