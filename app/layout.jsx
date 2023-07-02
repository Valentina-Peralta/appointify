import '../styles/globals.css'
import Nav from '@/components/Nav'
import Provider from '@/components/Provider'


export const metadata = {
    title: "Appointify",
    description: "",
}

const RootLayout = ({ children }) => {
    return (
        <html lang='en'
        >
            <head>
                <link rel="icon" href="/assets/ABlue.png" />
            </head>
            <body>
                <Provider>
                    <main className='app'>
                        <Nav />
                        {children}
                    </main>
                </Provider>
            </body>
        </html>)
}

export default RootLayout