import { Form} from "antd";
import FormItemInputSelect from "@/components/ui/form-item-input-select";

export default function ContentFilterUser() {

const selectRoles = [
    {
      id: "1",
      role: "Admin",
    },
    {
      id: "2",
      role: "Author",
    },
    {
      id: "3",
      role: "Editor",
    },
    {
      id: "4",
      role: "Maintainer",
    },
  ];
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
                  className: "mb-0!",
                  placeholder: "Select Role",
                  options: selectRoles.map((e) => ({
                    label: e.role,
                    value: e.id,
                  })),
                }}
              />

              <FormItemInputSelect
                name="plan"
                labelCol={{ className: "text-14-regular!" }}
                inputProps={{
                  className: "text-black!",
                  allowClear: true,
                  placeholder: "Select Plan",
                  options: selectRoles.map((e) => ({
                    label: e.role,
                    value: e.id,
                  })),
                }}
              />

              <FormItemInputSelect
                name="status"
                labelCol={{ className: "text-14-regular!" }}
                inputProps={{
                  className: "text-black!",
                  allowClear: true,
                  placeholder: "Select Status",
                  options: selectRoles.map((e) => ({
                    label: e.role,
                    value: e.id,
                  })),
                }}
              />
            </div>
          </Form>
        </div>
  )
}
