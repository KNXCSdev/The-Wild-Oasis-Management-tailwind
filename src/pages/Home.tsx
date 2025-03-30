import DashboardLayout from "../components/home/DashboardLayout";
import Filter from "../ui/Filter";
import Heading from "../ui/Heading";

export default function Home() {
  return (
    <>
      <div className="flex items-center justify-between">
        <Heading title="Dashboard" />
        <Filter
          filterField="last"
          options={[
            { value: "7", label: "Last 7 days" },
            { value: "30", label: "Last 30 days" },
            { value: "90", label: "Last 90 days" },
          ]}
        />
      </div>
      <DashboardLayout />
    </>
  );
}
