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

  return (
    <section>
      <div>
        <PreRegisteredTable data={data.data}></PreRegisteredTable>
      </div>
    </section>
  );
}
