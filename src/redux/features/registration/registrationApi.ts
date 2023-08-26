import { api } from "../../api/apiSlice";

const registrationApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getMyRegistrations: builder.query({
      query: () => `/registrations/my-registrations`,
    }),
    getShowToAllRegistrations: builder.query({
      query: () => `/registrations/show-to-all`,
    }),
    getSingleRegistration: builder.query({
      query: (id) => `/registrations/${id}`,
    }),
    createRegistration: builder.mutation({
      query: (data) => ({
        url: "/registrations/create-registration",
        method: "POST",
        body: data,
      }),
    }),
    updateRegistration: builder.mutation({
      query: ({ id, data }) => ({
        url: `/registrations/${id}`,
        method: "PATCH",
        body: data,
      }),
    }),
  }),
});

export const {
  useGetMyRegistrationsQuery,
  useGetSingleRegistrationQuery,
  useCreateRegistrationMutation,
  useGetShowToAllRegistrationsQuery,
  useUpdateRegistrationMutation,
} = registrationApi;
