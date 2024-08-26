import { BarChart } from "@mantine/charts";
import "chart.js/auto"; // Import the chart.js auto-registering component
import "@mantine/charts/styles.css";
import classes from "./chart.module.css";
import clsx from "clsx";
import { Text } from '@mantine/core';
const data = [
  {
    date: "Mar 17",
    divorce: 2890,
    celibataire: 38,
    marier: 2452,
  },
  {
    date: "Mar 18",
    divorce: 2756,
    celibataire: 103,
    marier: 2402,
  },
  {
    date: "Mar 19",
    divorce: 3322,
    celibataire: 86,
    marier: 1821,
  },
  {
    date: "Mar 20",
    divorce: 3470,
    celibataire: 208,
    marier: 2809,
  },
  {
    date: "Mar 21",
    divorce: 3129,
    celibataire: 26,
    marier: 2290,
  },
  {
    date: "Mar 22",
    divorce: 2890,
    celibataire: 38,
    marier: 3452,
  },
  {
    date: "Mar 23",
    divorce: 2756,
    celibataire: 103,
    marier: 2402,
  },
  {
    date: "Mar 24",
    divorce: 1322,
    celibataire: 186,
    marier: 5821,
  },
  {
    date: "Mar 25",
    divorce: 3470,
    celibataire: 708,
    marier: 2809,
  },
  {
    date: "Mar 26",
    divorce: 3129,
    celibataire: 2326,
    marier: 2290,
  },
];

export const TransactionChart = () => {
  return (
    <div className="flex items-stretch gap-2">
      <div
        className={clsx(
          " flex  flex-col grow bgInput  p-3 ring-1 ring-gray-400/20 rounded-md",
          classes.bg
        )}
      >
        <span className=" text-left font-semibold text-xl pb-6" > Evolutions des Commandes</span>
        <BarChart
          data={data}
          h={{ sm: 300, md: 400 }}
          yAxisProps={{ tickMargin: 15, orientation: 'left' }}
          xAxisProps={{ tickMargin: 15, orientation: 'bottom'  }}
          dataKey="date"
          radioGroup=""
          
          barProps={{ className:'rounded-t-lg ', radius:[5,5,0,0] }}
          // xAxisLabel="Date"
          // yAxisLabel="Amount"
          series={[
            { name: "divorce", color: "indigo.7" },
            { name: "celibataire", color: "red.6" },
            { name: "marier", color: "teal.6" },
          ]}
          // curveType="step"
        />
      </div>
      <div
        className={clsx(
          " flex flex-col  p-3 ring-1 ring-gray-400/20 bgInput w-[350px] rounded-md",
          classes.bg
        )}
      >
        <Text className="text-xl text-left font-semibold pb-3" > Situation Matrimoniale</Text>

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
    
              value: data.map((e) => e.divorce).reduce((p, n) => p + n),
              color: "teal.6",
            },
            {
              name: "Celibataire",
              value: data.map((e) => e.celibataire).reduce((p, n) => p + n),
              color: "red.6",
            },
            {
              name: "marier",
              value: data.map((e) => e.marier).reduce((p, n) => p + n),
              color: "indigo.6",
            },
          ]}
        /> */}
      </div>
    </div>
  );
};
