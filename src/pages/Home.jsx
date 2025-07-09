import BestSellers from "../components/BestSellers";
import Hero from "../components/Hero";
import Newsletter from "../components/Newsletter";

export default function Home() {
    return (
        <>
            <main className="min-h-screen bg-gray-50">
                <Hero />
                <BestSellers />
            </main>
            <Newsletter />
        </>
    )

}