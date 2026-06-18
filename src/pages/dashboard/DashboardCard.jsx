export const DashboardCard = ({ icon,title, count,Percentage }) => {
   return (
    <>
    
    <div className="bg-white rounded-xl shadow-lg p-6 w-57 border">
      <div className="flex items-center gap-4">
        <div className=" rounded-full text-3xl">
          {icon}
        </div>

        <div>
          <h3 className="text-gray-500 text-sm whitespace-nowrap">
            {title}
          </h3>

          <h2 className="text-3xl  text-blue-600">
            {count}
          </h2>

        </div>
      </div>

<p className="mt-9 mb-5">
  <span className="text-green-600">
    ↑ {Percentage}
  </span>
  <span className="text-black">
    {" "}from last month
  </span>
</p>

    </div>
    </>
  );
};