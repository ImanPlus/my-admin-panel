import SimpleCard from "./card/simple-card";
import ContentSummeryCard from "./content-summery-card";
import ColumnChart from "./ui/chart/column-chart";
import { ClockCircleOutlined, ShoppingCartOutlined }  from "@ant-design/icons";

export default function ContentDashboard() {
  const data = [
    { x: "2011", y: 1292, goals: [{ value: 1400 }] },
    { x: "2012", y: 4432, goals: [{ value: 5400 }] },
    { x: "2013", y: 3432, goals: [{ value: 2400 }] },
    { x: "2014", y: 5432, goals: [{ value: 5700 }] },
  ];
  return (
    <div className="grid grid-cols-6 gap-6">
      <SimpleCard className="col-span-2">
        <ColumnChart data={data} />
      </SimpleCard>

      <SimpleCard className="col-span-1 ">
        <ContentSummeryCard
          bgIcon="bg-green-300"
          title="155k"
          footer="Total Orders"
          date="Last 4 Month"
          isPositive={true}
          percent="22%"
          icon={<ShoppingCartOutlined/>}
        />
      </SimpleCard>
      <SimpleCard className="col-span-1 ">
        <ContentSummeryCard
          bgIcon="bg-green-300"
          title="155k"
          footer="Total Orders"
          date="Last 4 Month"
          isPositive={true}
          percent="22%"
          icon={<ShoppingCartOutlined/>}
        />
      </SimpleCard>
      <SimpleCard className="col-span-1 ">
        <ContentSummeryCard
          bgIcon="bg-yellow-300"
          title="155k"
          footer="Total Orders"
          date="Last 4 Month"
          isPositive={true}
          percent="22%"
          icon={<ShoppingCartOutlined/>}
        />
      </SimpleCard>
      <SimpleCard className="col-span-1 ">
        <ContentSummeryCard
          bgIcon="bg-red-300"
          title="100k"
          footer="Total Orders"
          date="Last 5 Month"
          isPositive={false}
          percent="38%"
          icon={<ClockCircleOutlined />}
        />
      </SimpleCard>
    </div>
  );
}
