import React, { useRef } from "react";
import { Link } from "react-router-dom";
import { useReactToPrint } from "react-to-print";
import { calculateTotalAmount } from "../lib/utils";
import { IRegistration } from "../types/globalTypes";

interface TableProps {
  data: IRegistration[];
}

const PreRegisteredTable: React.FC<TableProps> = ({ data }) => {
  const totalAmount = calculateTotalAmount(data);

  const componentRef = useRef(null);

  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });

  return (
    // <!-- Table Section -->
    <div className="max-w-[85rem] px-4 py-10 sm:px-6 lg:px-8 lg:py-14 mx-auto">
      {/* <!-- Card --> */}
      <div className="flex flex-col">
        <div className="-m-1.5 overflow-x-auto">
          <div className="p-1.5 min-w-full inline-block align-middle">
            <div className="bg-white border border-black rounded-xl shadow-sm overflow-hidden dark:bg-slate-900 dark:border-gray-700">
              {/* <!-- Header --> */}
              <div className="px-6 py-4 grid gap-3 md:flex md:justify-between md:items-center border-b border-black dark:border-gray-700">
                <div>
                  <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-200">
                    Pre-registered-format
                  </h2>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    All the pre resistration
                  </p>
                </div>

                <div>
                  <div className="inline-flex gap-x-2">
                    <button
                      onClick={handlePrint}
                      className="py-2 px-3 inline-flex justify-center items-center gap-2 rounded-md border font-medium bg-white text-gray-700 shadow-sm align-middle hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-white focus:ring-blue-600 transition-all text-sm dark:bg-slate-900 dark:hover:bg-slate-800 dark:border-gray-700 dark:text-gray-400 dark:hover:text-white dark:focus:ring-offset-gray-800"
                    >
                      Print
                    </button>

                    <Link
                      className="py-2 px-3 inline-flex justify-center items-center gap-2 rounded-md border border-transparent font-semibold bg-blue-500 text-white hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all text-sm dark:focus:ring-offset-gray-800"
                      to="/registration"
                    >
                      <svg
                        className="w-3 h-3"
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="16"
                        viewBox="0 0 16 16"
                        fill="none"
                      >
                        <path
                          d="M2.63452 7.50001L13.6345 7.5M8.13452 13V2"
                          stroke="currentColor"
                          stroke-width="2"
                          stroke-linecap="round"
                        />
                      </svg>
                      Create
                    </Link>
                  </div>
                </div>
              </div>
              {/* <!-- End Header --> */}
              {/* Printable area start */}
              <div ref={componentRef} className="print:my-8 print:mx-6">
                {/* <!-- Table --> */}
                <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700 ">
                  <thead className="divide-y divide-gray-200 dark:bg-gray-800 dark:divide-gray-700 print:text-black">
                    <tr>
                      <td colSpan={50}>
                        <div className="text-center py-5">
                          <h2 className="font-bold">NPCON Bangladesh- 2023</h2>
                          <p className="whitespace-nowrap text-xs">
                            National Institute of Neuroscience and Hospital and
                            Bangladesh Academy of Pathology(BAP)
                          </p>
                          <h2 className="font-bold">Pre-Registered</h2>
                        </div>
                      </td>
                    </tr>
                    <tr>
                      <th
                        scope="col"
                        className="px-6 text-left border border-black dark:border-gray-700"
                      >
                        <span className="text-xs whitespace-nowrap font-bold uppercase tracking-wide print:text-black text-gray-800 dark:text-gray-200">
                          Sl. No
                        </span>
                      </th>
                      <th
                        scope="col"
                        className="px-6 text-left border border-black dark:border-gray-700"
                      >
                        <span className="text-xs font-bold uppercase tracking-wide print:text-black text-gray-800 dark:text-gray-200">
                          Name
                        </span>
                      </th>
                      <th
                        scope="col"
                        className="px-6 text-left border border-black dark:border-gray-700"
                      >
                        <span className="text-xs font-bold uppercase tracking-wide print:text-black text-gray-800 dark:text-gray-200">
                          Designation
                        </span>
                      </th>
                      <th
                        scope="col"
                        className="px-6 text-left border border-black dark:border-gray-700"
                      >
                        <span className="text-xs font-bold uppercase tracking-wide print:text-black text-gray-800 dark:text-gray-200">
                          <span className="whitespace-nowrap">
                            Slide Seminar
                          </span>
                          <br />
                          (500/-)
                        </span>
                      </th>
                      <th
                        scope="col"
                        className="px-6 text-left border border-black dark:border-gray-700"
                      >
                        <span className="text-xs font-bold uppercase tracking-wide print:text-black text-gray-800 dark:text-gray-200">
                          <span className="whitespace-nowrap">Conference</span>
                          <br /> (500/-)
                        </span>
                      </th>
                    </tr>
                  </thead>

                  <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                    {data.length > 0 &&
                      data.map((registration, index: number) => (
                        <tr key={registration._id}>
                          <td className="h-px w-auto whitespace-nowrap border border-black print:border-black">
                            <div className="px-6 py-0">
                              <span className="text-sm text-gray-600 dark:text-gray-400 print:text-black ">
                                {index + 1}.
                              </span>
                            </div>
                          </td>
                          <td className="h-px w-auto border border-black">
                            <div className="px-6">
                              <span className="text-sm text-gray-800 dark:text-gray-200 print:text-black">
                                {registration?.name !== "N/A"
                                  ? registration?.name
                                  : registration?.bkashNumber}
                              </span>
                            </div>
                          </td>
                          <td className="h-px w-auto border border-black">
                            <div className="px-6">
                              <span className="text-sm text-gray-800 dark:text-gray-200 print:text-black">
                                {registration?.designation}
                              </span>
                            </div>
                          </td>
                          <td className="h-px w-auto border border-black whitespace-nowrap ">
                            <div className="px-6 py-2">
                              <span className="text-sm text-gray-800 dark:text-gray-200 print:text-black">
                                {registration?.purpose[1] && "OK"}
                              </span>
                            </div>
                          </td>
                          <td className="h-px w-auto border border-black whitespace-nowrap ">
                            <div className="px-6 py-2">
                              <span className="text-sm text-gray-800 dark:text-gray-200 print:text-black">
                                {registration?.purpose[0] && "OK"}
                              </span>
                            </div>
                          </td>
                        </tr>
                      ))}
                    {data.length === 0 && (
                      <tr>
                        <td
                          className="p-6 text-center text-3xl text-red-700"
                          colSpan={50}
                        >
                          No data found
                        </td>
                      </tr>
                    )}
                  </tbody>
                  <tfoot>
                    <tr>
                      <td colSpan={50}>
                        <div className="flex justify-between items-center px-8 pt-12 pb-8 w-full">
                          <p>Date ...............................</p>
                          <p>Received by ..............................</p>
                        </div>
                      </td>
                    </tr>
                  </tfoot>
                </table>
                {/* <!-- End Table --> */}
              </div>
              {/* Printable area end */}
              {/* <!-- Footer --> */}
              <div className="px-6 py-4 grid gap-3 md:flex md:justify-between md:items-center border-t border-black dark:border-gray-700">
                <div>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    <span className="font-semibold text-gray-800 dark:text-gray-200 me-1">
                      {data.length}
                    </span>
                    results
                  </p>
                </div>

                <div>
                  <div className="inline-flex font-medium gap-x-2">
                    Total: {totalAmount}
                  </div>
                </div>
              </div>
              {/* <!-- End Footer --> */}
            </div>
          </div>
        </div>
      </div>
      {/* <!-- End Card --> */}
    </div>
    // <!-- End Table Section -->
  );
};

export default PreRegisteredTable;
