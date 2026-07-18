import React from "react";
import { Link } from "react-router-dom";

const Breadcrumb = ({ items }) => {
  return (
    <div className="flex items-center text-sm text-gray-500">
      {items.map((item, index) => (
        <React.Fragment key={index}>
          {index > 0 && <span className="mx-2 text-gray-400">/</span>}

          {index === items.length - 1 ? (
            <span className="font-semibold text-black">
              {item.label}
            </span>
          ) : (
            <Link
              to={item.path}
              className="hover:text-gray-900"
            >
              {item.label}
            </Link>
          )}
        </React.Fragment>
      ))}
    </div>
  );
};

export default Breadcrumb;