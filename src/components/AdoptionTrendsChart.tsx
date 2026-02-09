import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

const data = [
  { month: "Sep", champions: 420, pragmatics: 310, traditionalists: 180 },
  { month: "Oct", champions: 480, pragmatics: 340, traditionalists: 160 },
  { month: "Nov", champions: 530, pragmatics: 380, traditionalists: 155 },
  { month: "Dec", champions: 510, pragmatics: 400, traditionalists: 140 },
  { month: "Jan", champions: 600, pragmatics: 420, traditionalists: 130 },
  { month: "Feb", champions: 650, pragmatics: 450, traditionalists: 120 },
];

export function AdoptionTrendsChart() {
  return (
    <ResponsiveContainer width="100%" height={280}>
      <BarChart data={data} barGap={2}>
        <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
        <XAxis dataKey="month" stroke="hsl(var(--muted-foreground))" fontSize={12} />
        <YAxis stroke="hsl(var(--muted-foreground))" fontSize={12} />
        <Tooltip
          contentStyle={{
            backgroundColor: "hsl(var(--card))",
            border: "1px solid hsl(var(--border))",
            borderRadius: "var(--radius)",
            fontSize: 12,
          }}
        />
        <Bar dataKey="champions" name="Eco-Champions" fill="hsl(var(--eco-champion))" radius={[4, 4, 0, 0]} />
        <Bar dataKey="pragmatics" name="Pragmatic Greens" fill="hsl(var(--eco-pragmatic))" radius={[4, 4, 0, 0]} />
        <Bar dataKey="traditionalists" name="Traditionalists" fill="hsl(var(--eco-traditional))" radius={[4, 4, 0, 0]} />
      </BarChart>
    </ResponsiveContainer>
  );
}
