import "./index.css";
import { PieChart, Pie, Cell, Tooltip, Legend } from "recharts";

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];



const TransactionPieChart = ({ transactions }) => {
  const categoryData = transactions.reduce((acc, tx) => {
    const found = acc.find((item) => item.name === tx.category);
    if (found) {
      found.value += tx.amount;
    } else {
      acc.push({ name: tx.category, value: tx.amount });
    }
    return acc;
  }, []);

  return (

    <div>
      <div className="big-screen">
         <PieChart width={500} height={350}>
      <Pie
        data={categoryData}
        cx="50%"
        cy="50%"
        outerRadius={100}
        fill="#8884d8"
        dataKey="value"
        label
      >
        {categoryData.map((_, index) => (
          <Cell key={index} fill={COLORS[index % COLORS.length]} />
        ))}
      </Pie>
      <Tooltip />
      <Legend />
    </PieChart>
      </div>
      <div className="small-screen">
           <PieChart width={330} height={330}>
      <Pie
        data={categoryData}
        cx="50%"
        cy="50%"
        outerRadius={100}
        fill="#8884d8"
        dataKey="value"
        label
      >
        {categoryData.map((_, index) => (
          <Cell key={index} fill={COLORS[index % COLORS.length]} />
        ))}
      </Pie>
      <Tooltip />
      <Legend />
    </PieChart>
      </div>
    </div>
    
  );
};


export default TransactionPieChart;