import React, { useRef } from "react";
import { Link } from "react-router-dom";
import { format } from "date-fns";
import { useReactToPrint } from "react-to-print";
import { calculateTotalAmount } from "../lib/utils";
import { IRegistration } from "../types/globalTypes";

interface TableProps {
  theader: string[];
  data: IRegistration[];
  action: boolean;
}

const Table: React.FC<TableProps> = ({ theader, data, action }) => {
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
            <div className="bg-white border border-gray-200 rounded-xl shadow-sm overflow-hidden dark:bg-slate-900 dark:border-gray-700">
              {/* <!-- Header --> */}
              <div className="px-6 py-4 grid gap-3 md:flex md:justify-between md:items-center border-b border-gray-200 dark:border-gray-700">
                <div>
                  <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-200">
                    My Entries
                  </h2>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    All the resistration done by me
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
                <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                  <thead className="bg-gray-50 divide-y divide-gray-200 dark:bg-gray-800 dark:divide-gray-700">
                    <tr>
                      {theader.map((th: string, index: number) => (
                        <th
                          key={index}
                          scope="col"
                          className="px-6 py-3 text-left border-l border-gray-200 dark:border-gray-700"
                        >
                          <span className="text-xs font-semibold uppercase tracking-wide print:text-black text-gray-800 dark:text-gray-200">
                            {th}
                          </span>
                        </th>
                      ))}
                      {action && <th className="print: hidden"></th>}
                    </tr>
                  </thead>

                  <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                    {data.length > 0 &&
                      data.map((registration, index: number) => (
                        <tr key={registration._id}>
                          <td className="h-px w-auto whitespace-nowrap">
                            <div className="px-6 py-0 flex items-baseline  gap-x-3">
                              <span className="text-sm text-gray-600 dark:text-gray-400 print:text-black">
                                {index + 1}.
                              </span>
                              <a className=" gap-x-2" href="#">
                                <span className="text-sm font-medium decoration-2 hover:underline dark:text-blue-500 print:text-black">
                                  {registration?.name}
                                </span>
                                <br />
                                <span className="print:text-black">
                                  {" "}
                                  {registration?.designation}
                                </span>
                              </a>
                            </div>
                          </td>
                          <td className="h-px w-auto">
                            <div className="px-6">
                              <span className="text-sm text-gray-800 dark:text-gray-200 print:text-black">
                                {registration?.hospital || "N/A"}
                              </span>
                            </div>
                          </td>
                          <td className="h-px w-auto whitespace-nowrap">
                            <div className="px-6 py-2">
                              <span className="text-sm text-gray-800 dark:text-gray-200 print:text-black">
                                {registration?.amount === 0
                                  ? "Free"
                                  : registration?.amount}
                              </span>
                            </div>
                          </td>
                          <td className="h-px w-auto whitespace-nowrap">
                            <div className="px-6 py-2">
                              <span className="text-sm text-gray-800 dark:text-gray-200 print:text-black">
                                {/* {registration?.purpose[0]} */}
                                {registration?.purpose.length > 1
                                  ? registration?.purpose[0] +
                                    ", " +
                                    registration?.purpose[1]
                                  : registration?.purpose[0]}
                              </span>
                            </div>
                          </td>
                          <td className="h-px w-auto whitespace-nowrap">
                            <div className="px-6 py-2">
                              <span className="text-sm text-gray-800 dark:text-gray-200 print:text-black">
                                {registration?.paymentMethod}
                              </span>
                              <span className="text-xs text-gray-500 print:text-black">
                                {registration?.paymentMethod === "bkash" &&
                                  `(${registration?.bkashNumber})`}
                              </span>
                            </div>
                          </td>
                          <td className="h-px w-auto whitespace-nowrap">
                            <div className="px-6 py-2">
                              <span className="text-sm text-gray-800 dark:text-gray-200 print:text-black">
                                {format(
                                  new Date(registration?.createdAt),
                                  "MM/dd/yyyy"
                                )}
                              </span>
                            </div>
                          </td>
                          {action && (
                            <td className="h-px w-px whitespace-nowrap print:hidden">
                              <div className="px-6 py-2">
                                <div className="hs-dropdown relative inline-block [--placement:bottom-right]">
                                  <button
                                    id="hs-table-dropdown-1"
                                    type="button"
                                    className="hs-dropdown-toggle py-1.5 px-2 inline-flex justify-center items-center gap-2 rounded-md text-gray-700 align-middle focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-white focus:ring-blue-600 transition-all text-sm dark:text-gray-400 dark:hover:text-white dark:focus:ring-offset-gray-800"
                                  >
                                    <svg
                                      className="w-4 h-4"
                                      xmlns="http://www.w3.org/2000/svg"
                                      width="16"
                                      height="16"
                                      fill="currentColor"
                                      viewBox="0 0 16 16"
                                    >
                                      <path d="M3 9.5a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3zm5 0a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3zm5 0a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3z" />
                                    </svg>
                                  </button>
                                  <div
                                    className="hs-dropdown-menu transition-[opacity,margin] duration hs-dropdown-open:opacity-100 opacity-0 hidden mt-2 divide-y divide-gray-200 min-w-[10rem] z-20 bg-white shadow-2xl rounded-lg p-2  dark:divide-gray-700 dark:bg-gray-800 dark:border dark:border-gray-700"
                                    aria-labelledby="hs-table-dropdown-1"
                                  >
                                    <div className="py-2 first:pt-0 last:pb-0">
                                      <span className="block py-2 px-3 text-xs font-medium uppercase text-gray-400 dark:text-gray-600">
                                        Actions
                                      </span>
                                      <Link
                                        className="flex items-center gap-x-3 py-2 px-3 rounded-md text-sm text-gray-800 hover:bg-gray-100 focus:ring-2 focus:ring-blue-500 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-gray-300"
                                        to={`/registration/update/${registration._id}`}
                                      >
                                        Edit Item
                                      </Link>
                                      <a
                                        className="flex items-center gap-x-3 py-2 px-3 rounded-md text-sm text-gray-800 hover:bg-gray-100 focus:ring-2 focus:ring-blue-500 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-gray-300"
                                        href="#"
                                      >
                                        Add to favorites
                                      </a>
                                      <a
                                        className="flex items-center gap-x-3 py-2 px-3 rounded-md text-sm text-gray-800 hover:bg-gray-100 focus:ring-2 focus:ring-blue-500 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-gray-300"
                                        href="#"
                                      >
                                        Archive team
                                      </a>
                                    </div>
                                    <div className="py-2 first:pt-0 last:pb-0">
                                      <a
                                        className="flex items-center gap-x-3 py-2 px-3 rounded-md text-sm text-red-600 hover:bg-gray-100 focus:ring-2 focus:ring-blue-500 dark:text-red-500 dark:hover:bg-gray-700 dark:hover:text-gray-300"
                                        href="#"
                                      >
                                        Delete
                                      </a>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </td>
                          )}
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
                </table>
                {/* <!-- End Table --> */}

                {/* <!-- Footer --> */}
                <div className="px-6 py-4 grid gap-3 md:flex md:justify-between md:items-center border-t border-gray-200 dark:border-gray-700">
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
              {/* Printable area end */}
            </div>
          </div>
        </div>
      </div>
      {/* <!-- End Card --> */}
    </div>
    // <!-- End Table Section -->
  );
};

export default Table;
