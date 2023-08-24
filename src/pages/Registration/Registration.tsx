import React, { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { errorNotify, successNotify } from "../../lib/notifications";
import { useCreateRegistrationMutation } from "../../redux/features/registration/registrationApi";

type Inputs = {
  name: string;
  designation: string;
  hospital: string;
  emailAddress: string;
  phoneNumber: string;
  amount: number | number;
  purpose: string[];
  slideSeminar?: string;
  conference?: string;
  paymentMethod: string;
  bkashNumber?: string;
  receivedBy: string;
  updatedBy?: string;
  note?: string;
  status?: string;
};

const Registration = () => {
  const [bkashNumberField, setBkashNumberField] = useState<boolean>(false);
  const [createRegistration] = useCreateRegistrationMutation();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<Inputs>();

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    if (!data.paymentMethod) {
      errorNotify("Payment method is missing!");
    } else if (data.paymentMethod === "bkash" && !data.bkashNumber) {
      errorNotify("Please provide a valid bkash number");
    } else {
      const purpose = [];
      if (data.conference) {
        purpose.push(data.conference);
      }
      if (data.slideSeminar) {
        purpose.push(data.slideSeminar);
      }

      delete data.conference;
      delete data.slideSeminar;

      data.purpose = purpose;

      // make the amount filed number
      data.amount = parseInt(data.amount);

      const response = await createRegistration(data);

      if ("error" in response) {
        errorNotify(response.error.data.message);
      } else {
        successNotify(response.data.message);
        reset();
      }
    }
  };

  return (
    <div className=" px-4 py-10 sm:px-6 lg:px-8 lg:py-14 mx-auto bg-gray-100">
      <div className="mx-auto">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-800 sm:text-4xl dark:text-white">
            <span className="text-blue-600">NPCON</span> Bangladesh- 2023
          </h1>
          <p className="mt-1 text-gray-600 dark:text-gray-400">
            We'd love to talk about how we can help you.
          </p>
        </div>
      </div>

      <div className="mt-12 max-w-3xl mx-auto">
        <div className="flex flex-col border bg-white shadow-sm rounded-xl p-4 sm:p-6 lg:p-8 dark:border-gray-700">
          <h2 className="mb-8 pb-4 text-xl font-semibold text-gray-700 dark:text-gray-200 border-b border-gray-200">
            Fill in the form
          </h2>

          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="grid gap-4">
              <div>
                <label className="block text-sm text-gray-700 font-medium dark:text-white">
                  Name
                </label>
                <input
                  type="text"
                  className="md:py-3 md:px-4 py-2 px-3 block  w-full border border-gray-200 rounded-md text-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-slate-900 dark:border-gray-700 dark:text-gray-400"
                  {...register("name", {
                    required: "Name is required",
                    minLength: 3,
                  })}
                  aria-invalid={errors.name ? "true" : "false"}
                />
                {errors.name && (
                  <p className="text-red-500">{errors.name.message}</p>
                )}
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm text-gray-700 font-medium dark:text-white">
                    Designation
                  </label>
                  <input
                    type="text"
                    className="md:py-3 md:px-4 py-2 px-3 block  w-full border border-gray-200 rounded-md text-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-slate-900 dark:border-gray-700 dark:text-gray-400"
                    {...register("designation")}
                  />
                </div>
                <div>
                  <label className="block text-sm text-gray-700 font-medium dark:text-white">
                    Hospital
                  </label>
                  <input
                    type="text"
                    className="md:py-3 md:px-4 py-2 px-3 block  w-full border border-gray-200 rounded-md text-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-slate-900 dark:border-gray-700 dark:text-gray-400"
                    {...register("hospital")}
                  />
                </div>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm text-gray-700 font-medium dark:text-white">
                    EmailAddress
                  </label>
                  <input
                    type="email"
                    className="md:py-3 md:px-4 py-2 px-3 block  w-full border border-gray-200 rounded-md text-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-slate-900 dark:border-gray-700 dark:text-gray-400"
                    {...register("emailAddress")}
                  />
                </div>
                <div>
                  <label className="block text-sm text-gray-700 font-medium dark:text-white">
                    PhoneNumber
                  </label>
                  <input
                    type="text"
                    className="md:py-3 md:px-4 py-2 px-3 block  w-full border border-gray-200 rounded-md text-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-slate-900 dark:border-gray-700 dark:text-gray-400"
                    {...register("phoneNumber")}
                  />
                </div>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm text-gray-700 font-medium dark:text-white">
                    Amount
                  </label>
                  <input
                    type="number"
                    className="md:py-3 md:px-4 py-2 px-3 block  w-full border border-gray-200 rounded-md text-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-slate-900 dark:border-gray-700 dark:text-gray-400"
                    {...register("amount", {
                      required: "Amount is required",
                    })}
                    aria-invalid={errors.amount ? "true" : "false"}
                  />
                  {errors.amount && (
                    <p className="text-red-500">{errors.amount.message}</p>
                  )}
                </div>
                <div>
                  <label className="block text-sm text-gray-700 font-medium dark:text-white">
                    Purpose of payment
                  </label>
                  <div className="flex gap-x-3 mt-2">
                    <div className="flex">
                      <input
                        type="checkbox"
                        className="shrink-0 mt-0.5 border-gray-200 rounded text-blue-600 focus:ring-blue-500 dark:bg-gray-800 dark:border-gray-700 dark:checked:bg-blue-500 dark:checked:border-blue-500 dark:focus:ring-offset-gray-800"
                        id="conference"
                        defaultValue="conference"
                        defaultChecked
                        {...register("conference", {
                          required: "Conference is required",
                        })}
                        aria-invalid={errors.conference ? "true" : "false"}
                      />
                      <label
                        htmlFor="conference"
                        className="text-sm text-gray-500 ml-1 dark:text-gray-400"
                      >
                        Conference
                      </label>
                    </div>

                    <div className="flex">
                      <input
                        type="checkbox"
                        className="shrink-0 mt-0.5 border-gray-200 rounded text-blue-600 focus:ring-blue-500 dark:bg-gray-800 dark:border-gray-700 dark:checked:bg-blue-500 dark:checked:border-blue-500 dark:focus:ring-offset-gray-800"
                        id="slideSeminar"
                        defaultValue="slide seminar"
                        {...register("slideSeminar")}
                      />
                      <label
                        htmlFor="slideSeminar"
                        className="text-sm text-gray-500 ml-1 dark:text-gray-400"
                      >
                        Slide seminar
                      </label>
                    </div>
                  </div>
                  {errors.conference && (
                    <p className="text-red-500">{errors.conference.message}</p>
                  )}
                </div>
              </div>

              <div className="grid sm:grid-cols-2 gap-2">
                <label
                  onClick={() => setBkashNumberField(false)}
                  htmlFor="cash"
                  className="flex p-3 block w-full bg-white border border-gray-200 rounded-md text-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-slate-900 dark:border-gray-700 dark:text-gray-400"
                >
                  <input
                    type="radio"
                    className="shrink-0 mt-0.5 border-gray-200 rounded-full text-blue-600 pointer-events-none focus:ring-blue-500 dark:bg-gray-800 dark:border-gray-700 dark:checked:bg-blue-500 dark:checked:border-blue-500 dark:focus:ring-offset-gray-800"
                    id="cash"
                    value="cash"
                    {...register("paymentMethod")}
                  />
                  <span className="text-sm text-gray-500 ml-3 dark:text-gray-400">
                    Cash
                  </span>
                </label>

                <label
                  onClick={() => setBkashNumberField(true)}
                  htmlFor="bkash"
                  className="flex p-3 block w-full bg-white border border-gray-200 rounded-md text-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-slate-900 dark:border-gray-700 dark:text-gray-400"
                >
                  <input
                    type="radio"
                    className="shrink-0 mt-0.5 border-gray-200 rounded-full text-blue-600 pointer-events-none focus:ring-blue-500 dark:bg-gray-800 dark:border-gray-700 dark:checked:bg-blue-500 dark:checked:border-blue-500 dark:focus:ring-offset-gray-800"
                    id="bkash"
                    value="bkash"
                    {...register("paymentMethod")}
                  />
                  <span className="text-sm text-gray-500 ml-3 dark:text-gray-400">
                    Bkash
                  </span>
                </label>
              </div>
              {bkashNumberField && (
                <div>
                  <label className="block text-sm text-gray-700 font-medium dark:text-white">
                    Bkash Number
                  </label>
                  <input
                    type="text"
                    className="md:py-3 md:px-4 py-2 px-3 block  w-full border border-gray-200 rounded-md text-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-slate-900 dark:border-gray-700 dark:text-gray-400"
                    {...register("bkashNumber")}
                  />
                </div>
              )}
              <div>
                <label className="block text-sm text-gray-700 font-medium dark:text-white">
                  Note
                </label>
                <textarea
                  className="py-3 px-4 min-h-[100px] block w-full border border-gray-200 rounded-md text-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-slate-900 dark:border-gray-700 dark:text-gray-400"
                  {...register("note")}
                ></textarea>
              </div>
            </div>

            <div className="mt-6 grid">
              <button
                type="submit"
                className="inline-flex justify-center items-center gap-x-3 text-center bg-blue-600 hover:bg-blue-700 border border-transparent text-sm lg:text-base text-white font-medium rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-offset-2 focus:ring-offset-white transition py-3 px-4 dark:focus:ring-offset-gray-800"
              >
                Request for registration
              </button>
            </div>

            <div className="mt-3 text-center">
              <p className="text-sm text-gray-500">
                We'll get back to you in 1-2 business days.
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Registration;
