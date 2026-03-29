"use client";

import React, { useState, useEffect } from "react";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import {
  EditorsPick,
  FeaturedArtists,
  BestCollection,
  CategoriesSection,
  QualitySection,
  ReviewsSection,
  ShoppingCTA,
} from "@/components/sections/HomeSections";
import Footer from "@/components/Footer";

export default function HomePage() {
  const [page, setPage] = useState("home");

  const navigate = (key: string) => {
    setPage(key);
    window.scrollTo(0, 0);
  };

  // For the prototype, all navigation stays on the same page
  // In production, use Next.js routing: /products, /artists, /apply, etc.

  return (
    <div className="min-h-screen">
      <Header page={page} onNavigate={navigate} />

      <main>
        <Hero onNavigate={navigate} />
        <EditorsPick onNavigate={navigate} />
        <FeaturedArtists onNavigate={navigate} />
        <BestCollection onNavigate={navigate} />
        <CategoriesSection onNavigate={navigate} />
        <QualitySection />
        <ReviewsSection />
        <ShoppingCTA onNavigate={navigate} />
      </main>

      <Footer />
    </div>
  );
}
