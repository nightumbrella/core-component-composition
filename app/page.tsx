'use client'
import Pagination from "@/components/pagination";
import { useState } from "react";

export default function Home() {

  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = 20; // Example total pages

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    // Add any additional logic here, such as fetching new data based on the page number
  };

  return (
  <main>
 <div className="p-4">
      <h1 className="text-center text-2xl mb-4">Advanced Pagination Example</h1>
      <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={handlePageChange} />
      {/* Other content */}
    </div>
  </main> 
  );
}

