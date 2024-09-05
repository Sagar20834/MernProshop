import React from "react";

const Footer = () => {
  const Year = new Date().getFullYear();
  return (
    <>
      <div>
        <p className="text-xl text-center py-3">
          &copy; {Year} MeroProShop- All rights reserved.
        </p>
      </div>
    </>
  );
};

export default Footer;
