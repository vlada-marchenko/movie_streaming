import { Suspense } from "react";
import Catalog from "../../components/Catalog/Catalog";

export default function CatalogPage() {
  return (
    <div>
      <Suspense fallback={<div style={{ minHeight: "100vh" }} />}>
        <Catalog />
      </Suspense>
    </div>
  );
}
