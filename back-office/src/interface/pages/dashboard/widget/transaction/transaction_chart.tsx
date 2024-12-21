import { BarChart } from "@mantine/charts";
import "chart.js/auto"; // Import the chart.js auto-registering component
import "@mantine/charts/styles.css";
import classes from "./chart.module.css";
import clsx from "clsx";
import { Text } from "@mantine/core";
const data = [
  {
    date: "Mar 17",
    order: 2890,
    delivered: 38,
    returned: 2452,
  },
  {
    date: "Mar 18",
    order: 2756,
    delivered: 103,
    returned: 2402,
  },
  {
    date: "Mar 19",
    order: 3322,
    delivered: 86,
    returned: 1821,
  },
  {
    date: "Mar 20",
    order: 3470,
    delivered: 208,
    returned: 2809,
  },
  {
    date: "Mar 21",
    order: 3129,
    delivered: 26,
    returned: 2290,
  },
  {
    date: "Mar 22",
    order: 2890,
    delivered: 38,
    returned: 3452,
  },
  {
    date: "Mar 23",
    order: 2756,
    delivered: 103,
    returned: 2402,
  },
  {
    date: "Mar 24",
    order: 1322,
    delivered: 186,
    returned: 5821,
  },
  {
    date: "Mar 25",
    order: 3470,
    delivered: 708,
    returned: 2809,
  },
  {
    date: "Mar 26",
    order: 3129,
    delivered: 2326,
    returned: 2290,
  },
];

export const TransactionChart = () => {
  return (
    <div className="flex flex-col md:flex-row items-stretch gap-2">
      <div
        className={clsx(
          " flex  flex-col grow bgInput  p-3 ring-1 ring-gray-400/20 rounded-md",
          classes.bg
        )}>
        <span className=" text-left font-semibold text-xl pb-6">
          {" "}
          Evolutions des Commandes
        </span>
        <BarChart
          data={data}
          h={{ base: 300, md: 400 }}
          yAxisProps={{ tickMargin: 15, orientation: "left" }}
          xAxisProps={{ tickMargin: 15, orientation: "bottom" }}
          dataKey="date"
          radioGroup="10"

          barProps={{ className: "rounded-t-lg ", radius: [5, 5, 0, 0] , }}
          // xAxisLabel="Date"
          // yAxisLabel="Amount"
          series={[
            { name: "order", color: "indigo.7" },
            { name: "delivered", color: "red.6" },
            { name: "returned", color: "teal.6" },
          ]}
          // curveType="step"
        />
      </div>
      <div
        className={clsx(
          " flex flex-col  p-3 ring-1 ring-gray-400/20 bgInput w-[350px] rounded-md",
          classes.bg
        )}>
        <Text className="text-xl text-left font-semibold pb-3">
          {" "}
          Situation Matrimoniale
        </Text>

        {/* <DonutChart
          h={"100%"}
          withLabels
          paddingAngle={4}
          withTooltip
          key={'Divorcer'}
                
          w={{ sm: 200, lg: 400 }}
          // strokeWidth={4}
          size={300}
        pieChartProps={{layout:"horizontal"}}
           pieProps={{labelLine:{color:'red.7',radius:30},strokeDasharray:300,legendType:'triangle', label:{className:'font-bold mx-3 px-3'}, radius:30,dataKey:'value' }}
          tooltipDataSource='all'
          
          data={[
            {
              name: "Divorcer",
    
              value: data.map((e) => e.order).reduce((p, n) => p + n),
              color: "teal.6",
            },
            {
              name: "Celibataire",
              value: data.map((e) => e.celibataire).reduce((p, n) => p + n),
              color: "red.6",
            },
            {
              name: "returned",
              value: data.map((e) => e.returned).reduce((p, n) => p + n),
              color: "indigo.6",
            },
          ]}
        /> */}
      </div>
    </div>
  );
};
