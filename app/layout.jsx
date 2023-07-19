import '../styles/globals.css'
import Nav from '@/components/Nav'
import Provider from '@/components/Provider'


export const metadata = {
    title: "Appointify",
    description: "Manage your appointments and contacts",
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
                        <footer>
                            <a href="https://vperalta.netlify.app/" target='_blank'>
                                <p>Built by Valentina Peralta</p>
                            </a>
                        </footer>
                    </main>

                </Provider>
            </body>
        </html>)
}

export default RootLayout