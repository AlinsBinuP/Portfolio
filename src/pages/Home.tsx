import React from 'react';
import { Hero } from '../components/redesign/Hero';
import { FeaturePillars } from '../components/redesign/FeaturePillars';
import { ProjectGrid } from '../components/redesign/ProjectGrid';
import { Ideation } from '../components/redesign/Ideation';
import { ProjectGravitySection, TrivitPreviewSection } from '../components/redesign/GravityAndTrivit';
import { StatusBoard } from '../components/redesign/StatusBoard';
import { Arsenal } from '../components/redesign/Arsenal';
import { Bookshelf } from '../components/redesign/Bookshelf';
import { CTA } from '../components/redesign/CTA';

export const Home = () => {
  return (
    <div className="bg-white min-h-screen">
      {/* 
        Sequential vertical stack as requested by the user:
        "2nd column should be below 1st column in each row"
      */}
      
      <main className="flex flex-col">
        {/* ROW 1 elements */}
        <Hero />
        <FeaturePillars />

        {/* ROW 2 elements */}
        <ProjectGrid />
        <Ideation />

        {/* ROW 3 elements */}
        <ProjectGravitySection />
        <StatusBoard />

        {/* ROW 4 elements */}
        <TrivitPreviewSection />
        <Arsenal />

        {/* ROW 5 elements */}
        <Bookshelf />
        <CTA />
      </main>
    </div>
  );
};
