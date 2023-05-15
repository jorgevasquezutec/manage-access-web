
import Providers from '@/components/Providers'
import '@/styles/globals.css'


export const metadata = {
    title: 'Manage Access | Home',
    description: 'Welcome to Manage Access',
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