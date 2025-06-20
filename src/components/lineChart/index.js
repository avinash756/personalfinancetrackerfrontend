import React from 'react';
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';

const LineChartComponent = ({ data }) => {
  // Sort by date
  const sortedData = [...data].sort((a, b) => new Date(a.date) - new Date(b.date));

  // Format date for display
  const formattedData = sortedData.map(txn => ({
    ...txn,
    date: new Date(txn.date).toLocaleDateString(),
  }));

  return (
    <ResponsiveContainer width="100%" height={300}>
      <LineChart data={formattedData}>
        <XAxis dataKey="date" />
        <YAxis />
        <Tooltip />
        <Line type="monotone" dataKey="amount" stroke="#82ca9d" strokeWidth={2} />
      </LineChart>
    </ResponsiveContainer>
  );
};

export default LineChartComponent;
