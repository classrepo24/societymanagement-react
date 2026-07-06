import React from "react";

export const PaymentHistory = ({ data }) => {

    const history = data.paymentHistory || [];

    return (
        <div className="bg-white rounded-2xl border shadow-sm p-6">

            <div className="flex justify-between items-center">

                <h3 className="text-lg font-semibold text-[#1E2A5A]">
                    Payment History
                </h3>

                <span className="text-sm text-gray-500">
                    {history.length} Records
                </span>

            </div>

            {history.length === 0 ? (

                <div className="flex flex-col items-center justify-center ">

                    {/* Icon */}

                    <div className="w-20 h-20 rounded-full bg-blue-100 flex items-center justify-center">

                        <i className="bi bi-receipt text-4xl text-blue-600"></i>

                    </div>

                    {/* Title */}

                    <h4 className="mt-5 text-lg font-semibold text-[#1E2A5A]">
                        No payments recorded yet.
                    </h4>

                    {/* Subtitle */}

                    <p className="mt-2 text-sm text-gray-500">
                        This invoice is pending payment.
                    </p>

                </div>


            ) : (

                <div className="overflow-x-auto">

                    <table className="w-full">

                        <thead>

                            <tr className="border-b">

                                <th className="text-left py-3">Date</th>

                                <th className="text-left py-3">Amount</th>

                                <th className="text-left py-3">Mode</th>

                                <th className="text-left py-3">Reference</th>

                            </tr>

                        </thead>

                        <tbody>

                            {history.map((item, index) => (

                                <tr key={index} className="border-b">

                                    <td className="py-4">{item.date}</td>

                                    <td className="py-4 font-semibold text-green-600">
                                        ₹{item.amount.toLocaleString("en-IN")}
                                    </td>

                                    <td>{item.mode}</td>

                                    <td>{item.reference}</td>

                                </tr>

                            ))}

                        </tbody>

                    </table>

                </div>

            )}

        </div>
    );
};