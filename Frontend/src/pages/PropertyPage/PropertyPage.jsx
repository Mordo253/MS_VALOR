import React, { useEffect } from "react";
import { PropertyCard } from "../../components/property/card/PropertyCard";
import { PropertyHero } from "../../components/property/Hero/PropertyHero";
import { PropertyCompanies } from "../../components/property/companies/PropertyCompanies";
import { Value } from "../../components/property/Value/Value";

export function PropertyPage() {
  return (
    <>
      <PropertyHero/>
      <PropertyCompanies/>
      <PropertyCard/>
    </>
  );
}
