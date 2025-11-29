import { Form } from "antd";
import FormItemInputSelect from "@/components/ui/form-item-input-select";

type FiltersType = {
  role: string;
  plan: string;
  status: string;
};

export default function ContentFilterUser({
  filter,
  setFilter,
}: {
  filter: FiltersType;
  setFilter: React.Dispatch<React.SetStateAction<FiltersType>>;
}) {
  const selectRoles = [
    {
      id: "5",
      role: "Admin",
    },
    {
      id: "4",
      role: "Author",
    },
    {
      id: "3",
      role: "Editor",
    },
    {
      id: "1",
      role: "Maintainer",
    },
    {
      id: "2",
      role: "Subscriber",
    },
  ];

  const selectPlan = [
    { id: 1, plan: "Enterprise" },
    { id: 2, plan: "Basic" },
    { id: 3, plan: "Team" },
    { id: 4, plan: "Compony" },
  ];

  const selectStatus = [
    { id: 1, status: "Active" },
    { id: 2, status: "Inactive" },
    { id: 3, status: "Pending" },
  ];

  const handleSelectChange = (name: string, value: string) => {
    setFilter((prev) => ({ ...prev, [name]: value ?? "" }));
  };

  return (
    <div className="px-5 pt-6 pb-0 flex flex-col gap-3 border-b border-grayscale-200">
      <p className="text-16-semiBold">Filters</p>
      <Form>
        <div className="py-4 grid grid-cols-3 gap-4">
          <FormItemInputSelect
            name="role"
            labelCol={{ className: "text-14-regular! mb-0!" }}
            inputProps={{
              allowClear: true,
              value: filter.role,
              className: "mb-0!",
              placeholder: "Select Role",
              options: selectRoles.map((e) => ({
                label: e.role,
                value: e.id,
              })),
              onChange: (value) => handleSelectChange("role", value),
            }}
          />

          <FormItemInputSelect
            name="plan"
            labelCol={{ className: "text-14-regular!" }}
            inputProps={{
              className: "text-black!",
              allowClear: true,
              value: filter.plan,
              placeholder: "Select Plan",
              options: selectPlan.map((e) => ({
                label: e.plan,
                value: e.id,
              })),
              onChange: (value) => handleSelectChange("plan", value),
            }}
          />

          <FormItemInputSelect
            name="status"
            labelCol={{ className: "text-14-regular!" }}
            inputProps={{
              className: "text-black!",
              allowClear: true,
              value: filter.status,
              placeholder: "Select Status",
              options: selectStatus.map((e) => ({
                label: e.status,
                value: e.id,
              })),
              onChange: (value) => handleSelectChange("status", value),
            }}
          />
        </div>
      </Form>
    </div>
  );
}
