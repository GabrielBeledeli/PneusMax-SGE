"use client";

import { Pie, PieChart, ResponsiveContainer, Tooltip, Cell, Legend } from 'recharts';

interface ChartData {
  name: string;
  value: number;
}

interface PneusPorAroChartProps {
  data: ChartData[];
}

const COLORS = ['#CF291D', '#a31f17', '#E55248', '#333333', '#666666', '#999999'];

export function PneusPorAroChart({ data }: PneusPorAroChartProps) {
  return (
    <ResponsiveContainer width="100%" height={350}>
      <PieChart>
        <Pie
          data={data}
          cx="50%"
          cy="50%"
          labelLine={false}
          outerRadius={100}
          fill="#8884d8"
          dataKey="value"
          nameKey="name"
          label={({ name, percent }) => `Aro ${name}: ${(percent * 100).toFixed(0)}%`}
        >
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
        <Tooltip
          contentStyle={{
            backgroundColor: 'var(--background)',
            borderColor: 'var(--border)',
          }}
        />
        <Legend />
      </PieChart>
    </ResponsiveContainer>
  );
}
