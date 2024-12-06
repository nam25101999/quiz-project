import React, { useState } from 'react';
import HeaderHome from "./HeaderHome";
import HomeContent from "./pages/HomeContent";
import HeroHome from "./HeroHome";
import Setting from "./pages/Setting";

const Home = () => {
    const [showHeroHome, setShowHeroHome] = useState(true);

    return (
        <div>
            <HeaderHome />
            <HeroHome showHeroHome={showHeroHome} setShowHeroHome={setShowHeroHome} />
            <HomeContent />
            <Setting setShowHeroHome={setShowHeroHome} />
        </div>
    );
};

export default Home;
