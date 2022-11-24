import { Link } from 'react-router-dom'

const Public = () => {
    const content = (
        <section className="public">
            <header>
                <h1>Welcome to <span className="nowrap">kis@rr-Web</span></h1>
            </header>
            <main className="public__main">
                <p>Basé dans le quartier Manguiline Plateau, nous sommes heureux de votre visite. Nous sommes prêts à satisfaire vos demandes.</p>
                <address className="public__addr">
                    Kis@rr-Web<br />
                    Manguilne Plateau<br />
                    Bignona, Ziguinchor<br />
                    <a href="tel:+221785300360">(221) 78 530 03 60</a>
                </address>
                <br />
                <p>Owner: KiSarr</p>
            </main>
            <footer>
                <Link to="/login">Connexion</Link>
            </footer>
        </section>

    )
    return content
}
export default Public