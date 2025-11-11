import React from "react";
import HomeSkinConcerns from "./components/Container/Home/HomeSkinConcerns";
import MainLayout from "./common/MainLayout";
import HomeShopCategories from "./components/Container/Home/HomeShopCategories";
import SpecialDealsWithImages from "./components/Container/Home/SpecialDealsWithImages";

export default function Page() {
  return (
    <MainLayout className="bg-gradient-to-r from-[#fff5e6] to-[#fff5e6] min-h-screen">
      <HomeSkinConcerns />
      <HomeShopCategories />
      <SpecialDealsWithImages />
    </MainLayout>
  );
}
