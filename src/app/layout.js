import { Navbar, Footer } from '@/layout';
import './globals.css';
import { Providers } from '@/state/Providers';

export const metadata = {
  title: 'Online Writing Application',
  description: 'Place an order and have your paper written by the professionals!',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className='box-border'>
        <Providers>
          <div className="w-full overflow-hidden">
              <header className={``}>
              <div className={``}>
                  <Navbar />
              </div>
              </header>

            <main className="pt-0 flex-1 min-h-[70vh]">
              <div className={``}>
                <div className={``}>
                  <h2 className="hidden">Main Content</h2>
                    {children}
                </div>
              </div>
            </main>

            <footer>
              <h2 className="hidden">Footer Links</h2>
              <Footer/>
            </footer>
          </div>
        </Providers>
      </body>
    </html>
  )
}