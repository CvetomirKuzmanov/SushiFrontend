export default function Hero() {
    return (
        <section className="hero-section relative">
            <div className="container mx-auto px-4 py-24 md:py-32 w-full">
                <div className="max-w-lg">
                    <h1 className="text-4xl text-primary font-bold text-shadow-2xs text-shadow-stone-300 md:text-6xl mb-4">
                        Why stay hungry
                    </h1>
                    <p className="text-2xl text-primary font-bold mb-8">
                         Enjoy Authentic Sushi
                    </p>
                    <div className="flex flex-wrap gap-4">
                        {/* <a
                            href="#"
                            className="py-3 px-6 bg-primary text-white font-medium rounded-button hover:bg-primary/90 transition-colors whitespace-nowrap"
                        >Shop Now</a
                        > */}
                        <a
                            href="/catalog"
                            className="py-3 px-6 bg-white text-gray-800 font-medium rounded-button border border-gray-200 hover:bg-gray-50 transition-colors whitespace-nowrap"
                        >View menu</a
                        >
                    </div>
                </div>
            </div>
        </section>
    );
}