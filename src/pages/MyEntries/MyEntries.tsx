// import React from "react";
import { useGetMyRegistrationsQuery } from "../../redux/features/registration/registrationApi";
import Table from "../../components/Table";

export default function MyEntries() {
  const { data, isLoading, error } = useGetMyRegistrationsQuery(undefined, {
    refetchOnMountOrArgChange: true,
  });

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error:</div>;
  }

  const theader = [
    "name",
    "Hospital",
    "Fee",
    "Purpose",
    "Payment Method",
    "Date",
  ];

  return (
    <section>
      <div>
        <Table theader={theader} data={data.data} action={true}></Table>
      </div>
    </section>
  );
}
