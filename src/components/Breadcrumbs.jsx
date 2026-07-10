import { Link } from "react-router-dom";

const Breadcrumbs = ({ items }) => (
  <div className="flex items-center text-sm mb-2">
    {items.map((item, index) => (
      <span key={index} className="flex items-center">
        {index > 0 && <span className="mx-2">{"/"}</span>}

        {index === items.length - 1 ? (
          <span className="font-semibold text-[#01214a]">
            {item.label}
          </span>
        ) : (
          <Link
            to={item.path}
            className="text-gray-600 hover:text-[#01214a]"
          >
            {item.label}
          </Link>
        )}
      </span>
    ))}
  </div>
);

export default Breadcrumbs;