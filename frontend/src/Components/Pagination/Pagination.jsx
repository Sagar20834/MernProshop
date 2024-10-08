import React from "react";
import { useSelector } from "react-redux";
import { Link, useLocation } from "react-router-dom";

const Pagination = ({
  pages,
  currentPage,
  total,
  pageSize,
  skip,
  pageNumber = 1,
}) => {
  const { userInfo } = useSelector((state) => state.auth);
  const location = useLocation();
  const pagesArray = Array.from({ length: pages });

  if (total === 0) return null; // Handle edge case for no products

  return (
    <div className="flex mt-8 items-center justify-between border-t border-gray-200 bg-white px-4 py-3 sm:px-6">
      <div className="flex justify-between gap-4 mr-4">
        <Link
          // to={`/page/${currentPage - 1}`}
          to={
            userInfo?.isAdmin && location.pathname.includes("/admin/products")
              ? `/admin/products/${Number(pageNumber) - 1}`
              : `/page/${currentPage - 1}`
          }
          className={`relative inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 ${
            currentPage === 1 && "cursor-not-allowed opacity-50"
          }`}
          aria-disabled={currentPage === 1}
          aria-label="Previous"
        >
          Previous
        </Link>
        <Link
          to={
            userInfo?.isAdmin && location.pathname.includes("/admin/products")
              ? `/admin/products/${Number(pageNumber) + 1}`
              : `/page/${currentPage + 1}`
          }
          className={`relative inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 ${
            currentPage === pages && "cursor-not-allowed opacity-50"
          }`}
          aria-disabled={currentPage === pages}
          aria-label="Next"
        >
          Next
        </Link>
      </div>
      <div className="hidden sm:flex sm:flex-1 sm:items-center sm:justify-between">
        <p className="text-sm text-gray-700 m-1">
          Showing
          <span className="font-medium m-1">{skip + 1}</span>
          to
          <span className="font-medium m-1">
            {skip + pageSize <= total ? skip + pageSize : total}
          </span>
          of
          <span className="font-medium m-1">{total}</span>
          results
        </p>
        <nav
          className="isolate inline-flex -space-x-px rounded-md shadow-sm"
          aria-label="Pagination"
        >
          <Link
            to={
              userInfo?.isAdmin && location.pathname.includes("/admin/products")
                ? `/admin/products/${Number(pageNumber) - 1}`
                : `/page/${currentPage - 1}`
            }
            className={`relative inline-flex items-center rounded-l-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0 ${
              currentPage === 1 && "cursor-not-allowed opacity-50"
            }`}
            aria-disabled={currentPage === 1}
          >
            <span className="sr-only">Previous</span>
            <svg
              className="h-5 w-5"
              viewBox="0 0 20 20"
              fill="currentColor"
              aria-hidden="true"
            >
              <path
                fillRule="evenodd"
                d="M12.79 5.23a.75.75 0 01-.02 1.06L8.832 10l3.938 3.71a.75.75 0 11-1.04 1.08l-4.5-4.25a.75.75 0 010-1.08l4.5-4.25a.75.75 0 011.06.02z"
                clipRule="evenodd"
              />
            </svg>
          </Link>

          {pagesArray.map((_, index) => {
            const pageNumber = index + 1;
            const isActive = pageNumber === currentPage;
            const path =
              userInfo?.isAdmin && location.pathname.includes("/admin/products")
                ? `/admin/products/${pageNumber}`
                : `/page/${pageNumber}`;

            return (
              <Link
                key={pageNumber}
                to={path}
                className={`relative z-10 inline-flex items-center px-4 py-2 text-sm font-semibold ${
                  isActive
                    ? "bg-indigo-600 text-white"
                    : "text-gray-700 bg-white hover:bg-gray-50"
                } focus:z-20 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600`}
                aria-current={isActive ? "page" : undefined}
              >
                {pageNumber}
              </Link>
            );
          })}

          <Link
            to={
              userInfo?.isAdmin && location.pathname.includes("/admin/products")
                ? `/admin/products/${Number(pageNumber) + 1}`
                : `/page/${currentPage + 1}`
            }
            className={`relative inline-flex items-center rounded-r-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0 ${
              currentPage === pages && "cursor-not-allowed opacity-50"
            }`}
            aria-disabled={currentPage === pages}
          >
            <span className="sr-only">Next</span>
            <svg
              className="h-5 w-5"
              viewBox="0 0 20 20"
              fill="currentColor"
              aria-hidden="true"
            >
              <path
                fillRule="evenodd"
                d="M7.21 14.77a.75.75 0 01.02-1.06L11.168 10 7.23 6.29a.75.75 0 111.04-1.08l4.5 4.25a.75.75 0 010 1.08l-4.5 4.25a.75.75 0 01-1.06-.02z"
                clipRule="evenodd"
              />
            </svg>
          </Link>
        </nav>
      </div>
    </div>
  );
};

export default Pagination;
