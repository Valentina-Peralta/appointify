import Calendar from "@/components/Calendar"

const Home = () => {
    return (
        <section className="home">
            <h1>Stay organized <br /> <span className="orange_gradient">Manage your contacts and appointments</span></h1>
            <div className="main">
                <Calendar />
            </div>
        </section>)
}

export default Home