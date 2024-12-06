import React from 'react';

const Setting = ({ showHeroHome, setShowHeroHome }) => {
  const toggleHeroHome = () => {
    setShowHeroHome((prev) => !prev); // Đảm bảo state được cập nhật đúng
  };

  return (
    <div>
      <h1>Cài Đặt</h1>
      <button onClick={toggleHeroHome}>
        {showHeroHome ? 'Ẩn HeroHome' : 'Hiển thị HeroHome'}
      </button>
    </div>
  );
};

export default Setting;
