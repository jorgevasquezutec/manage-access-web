
import Providers from '@/components/Providers'
import '@/styles/globals.css'


export const metadata = {
    title: 'My App | Home',
    description: 'Welcome to the My App',
  }

export default function Layout({ children }: { children: React.ReactNode }) {
    return (
        <html lang="en">
            <body>
                <Providers>{children}</Providers>

            </body>
        </html>
    )
}