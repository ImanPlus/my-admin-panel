import ContentCardUser from "@/components/content-card-user";
import ContentTableUser from "@/components/content-table-user";

export default function ListOfUsers() {
  return (
    <div>
      {/* Cards of users */}
      <ContentCardUser />

      <div className="bg-base-white rounded-2xl my-6 ">
        {/* Table Users */}
        <ContentTableUser />
      </div>
    </div>
  );
}
