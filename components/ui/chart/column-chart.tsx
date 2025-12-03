import ReactApexChart from "react-apexcharts";

export default function BarChart({ data }) {
  const options = {
    chart: { type: "bar", height: 350 },
    plotOptions: { bar: { columnWidth: "60%" } },
    colors: ["#00E396"],
    dataLabels: { enabled: false },
    legend: {
      show: true,
      showForSingleSeries: true,
      customLegendItems: ["Actual", "Expected"],
      markers: { fillColors: ["#00E396", "#775DD0"] }
    }
  };

  const series = [
    {
      name: "Actual",
    //   data: data, OR
      data: [10, 20, 30, 40]
    }
  ];

  return (
    <ReactApexChart
      options={options}
      series={series}
      type="bar"
      height={350}
    />
  );
}
