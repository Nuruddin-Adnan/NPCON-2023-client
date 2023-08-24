import { api } from "../../api/apiSlice";

const registrationApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getMyRegistrations: builder.query({
      query: () => `/registrations/my-registrations`,
    }),
    getShowToAllRegistrations: builder.query({
      query: () => `/registrations/show-to-all`,
    }),
    createRegistration: builder.mutation({
      query: (data) => ({
        url: "/registrations/create-registration",
        method: "POST",
        body: data,
      }),
    }),
  }),
});

export const {
  useGetMyRegistrationsQuery,
  useCreateRegistrationMutation,
  useGetShowToAllRegistrationsQuery,
} = registrationApi;
