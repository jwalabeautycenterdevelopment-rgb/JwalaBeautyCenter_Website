import React from "react";
import HomeSkinConcerns from "./components/Container/Home/HomeSkinConcerns";
import MainLayout from "./common/MainLayout";
import HomeShopCategories from "./components/Container/Home/HomeShopCategories";
import SpecialDealsWithImages from "./components/Container/Home/SpecialDealsWithImages";
import OurProducts from "./components/Container/Home/OurProducts";
import HomeDealsDay from "./components/Container/Home/HomeDealsDay";
import HomeNaturalSkin from "./components/Container/Home/HomeNaturalSkin";
import NewArrivals from "./components/Container/Home/HomeNewArrival";
import HomeBanner from "./components/Container/Home/HomeBanner";

export default function Page() {
  return (
    <MainLayout className="bg-linear-to-r from-[#fff5e6] to-[#fff5e6] min-h-screen">
      <HomeBanner />
      <HomeSkinConcerns />
      <HomeShopCategories />
      <SpecialDealsWithImages />
      <OurProducts />
      <HomeDealsDay />
      <HomeNaturalSkin />
      <NewArrivals />
    </MainLayout>
  );
}
