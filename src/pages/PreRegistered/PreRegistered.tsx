import { useGetShowToAllRegistrationsQuery } from "../../redux/features/registration/registrationApi";
import PreRegisteredTable from "../../components/PreRegisteredTable";

export default function PreRegistered() {
  const { data, isLoading, error } = useGetShowToAllRegistrationsQuery(
    undefined,
    {
      refetchOnMountOrArgChange: true,
    }
  );

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error:</div>;
  }

  const theader = [
    "Sl. No.",
    "Name",
    "Designation",
    "Slide Seminar",
    "Conference",
  ];

  return (
    <section>
      <div>
        <PreRegisteredTable
          theader={theader}
          data={data.data}
          action={true}
        ></PreRegisteredTable>
      </div>
    </section>
  );
}
