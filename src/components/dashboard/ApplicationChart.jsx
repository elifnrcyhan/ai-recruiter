import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";


const data = [
  {
    name: "Mon",
    applicants: 20,
  },
  {
    name: "Tue",
    applicants: 35,
  },
  {
    name: "Wed",
    applicants: 28,
  },
  {
    name: "Thu",
    applicants: 45,
  },
  {
    name: "Fri",
    applicants: 60,
  },
];


function ApplicationChart() {
  return (
    <div className="bg-white rounded-xl border p-5 mt-6">

      <h2 className="text-xl font-bold mb-4">
        Application Trend
      </h2>


      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={data}>

          <CartesianGrid />

          <XAxis dataKey="name" />

          <YAxis />

          <Tooltip />

          <Line
            type="monotone"
            dataKey="applicants"
            strokeWidth={3}
          />

        </LineChart>
      </ResponsiveContainer>

    </div>
  );
}

export default ApplicationChart;