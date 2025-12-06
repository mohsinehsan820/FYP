import Header from "@/components/home/header";
import Categories from "@/components/home/cateagories";
import Featured from "@/components/home/featured";
import Services from "@/components/home/Services";
import Newsletter from "@/components/home/Newsletter";
import OfferBanners from "@/components/home/OfferBanners";
import FeatureCards from "@/components/home/FeatureCards";
import FAQ from "@/components/home/FAQ";

const Home = () => {
    return (
        <>
            <Header />
            <Featured />
            <OfferBanners />
            <Categories />
            <FeatureCards />
            {/* <Services /> */}
            <FAQ />
            <Newsletter />
        </>
    );
}

export default Home;
