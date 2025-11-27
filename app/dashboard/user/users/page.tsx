import ContentCardUser from "@/components/content-card-user";
import ContentFilterUser from "@/components/content-filter-user";
import ContentExportSearchUser from "@/components/content-export-search-user";
import ContentTableUser from "@/components/content-table-user";

export default function ListOfUsers() {
  return (
    <div>
      {/* Cards of users */}
      <ContentCardUser />

      <div className="bg-base-white rounded-2xl my-6 ">
        {/* Filters */}
        <ContentFilterUser />

        {/* Export & Search User */}
        <ContentExportSearchUser />

        {/* Table Users */}
        <ContentTableUser />
      </div>
    </div>
  );
}
