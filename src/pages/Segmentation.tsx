import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { Filter, Search } from "lucide-react";
import { Input } from "@/components/ui/input";

type Segment = "all" | "champion" | "pragmatic" | "traditionalist";

const customers = [
  { id: 1, name: "Sarah Chen", segment: "champion", score: 92, purchases: 14, income: "$85K", city: "Portland" },
  { id: 2, name: "James Miller", segment: "pragmatic", score: 61, purchases: 5, income: "$62K", city: "Denver" },
  { id: 3, name: "Aisha Patel", segment: "champion", score: 88, purchases: 11, income: "$78K", city: "Seattle" },
  { id: 4, name: "Robert Davis", segment: "traditionalist", score: 28, purchases: 1, income: "$55K", city: "Dallas" },
  { id: 5, name: "Emma Wilson", segment: "pragmatic", score: 54, purchases: 4, income: "$70K", city: "Austin" },
  { id: 6, name: "Carlos Rivera", segment: "champion", score: 95, purchases: 18, income: "$92K", city: "San Francisco" },
  { id: 7, name: "Maria Gonzalez", segment: "pragmatic", score: 58, purchases: 6, income: "$67K", city: "Chicago" },
  { id: 8, name: "Tom Baker", segment: "traditionalist", score: 22, purchases: 0, income: "$48K", city: "Houston" },
  { id: 9, name: "Lisa Nguyen", segment: "champion", score: 85, purchases: 9, income: "$81K", city: "Boston" },
  { id: 10, name: "David Kim", segment: "pragmatic", score: 65, purchases: 7, income: "$73K", city: "LA" },
];

const featureImportance = [
  { feature: "Price", importance: 0.31 },
  { feature: "Brand Trust", importance: 0.27 },
  { feature: "Social Influence", importance: 0.18 },
  { feature: "Past Purchases", importance: 0.14 },
  { feature: "Age Group", importance: 0.1 },
];

const segmentColors: Record<string, string> = {
  champion: "bg-eco-champion text-primary-foreground",
  pragmatic: "bg-eco-pragmatic text-primary-foreground",
  traditionalist: "bg-eco-traditional text-primary-foreground",
};

const segmentLabels: Record<string, string> = {
  champion: "Eco-Champion",
  pragmatic: "Pragmatic Green",
  traditionalist: "Traditionalist",
};

const Segmentation = () => {
  const [filter, setFilter] = useState<Segment>("all");
  const [search, setSearch] = useState("");

  const filtered = customers.filter((c) => {
    const matchSegment = filter === "all" || c.segment === filter;
    const matchSearch = c.name.toLowerCase().includes(search.toLowerCase());
    return matchSegment && matchSearch;
  });

  return (
    <div className="space-y-8 animate-fade-in">
      <div>
        <h1 className="font-display text-2xl font-bold text-foreground">Customer Segmentation</h1>
        <p className="text-muted-foreground mt-1">Analyze and filter customers by eco-adoption segments</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-2 eco-shadow">
          <CardHeader>
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <CardTitle className="font-display text-lg">Customer Data</CardTitle>
              <div className="flex items-center gap-2">
                <div className="relative">
                  <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Search customers..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className="pl-9 h-9 w-48"
                  />
                </div>
                <Select value={filter} onValueChange={(v) => setFilter(v as Segment)}>
                  <SelectTrigger className="w-44 h-9">
                    <Filter className="h-3.5 w-3.5 mr-1.5 text-muted-foreground" />
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Segments</SelectItem>
                    <SelectItem value="champion">Eco-Champions</SelectItem>
                    <SelectItem value="pragmatic">Pragmatic Greens</SelectItem>
                    <SelectItem value="traditionalist">Traditionalists</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-border">
                    <th className="text-left py-3 px-3 font-medium text-muted-foreground">Name</th>
                    <th className="text-left py-3 px-3 font-medium text-muted-foreground">Segment</th>
                    <th className="text-left py-3 px-3 font-medium text-muted-foreground">Score</th>
                    <th className="text-left py-3 px-3 font-medium text-muted-foreground hidden sm:table-cell">Purchases</th>
                    <th className="text-left py-3 px-3 font-medium text-muted-foreground hidden md:table-cell">City</th>
                  </tr>
                </thead>
                <tbody>
                  {filtered.map((c) => (
                    <tr key={c.id} className="border-b border-border/50 hover:bg-muted/50 transition-colors">
                      <td className="py-3 px-3 font-medium text-foreground">{c.name}</td>
                      <td className="py-3 px-3">
                        <Badge className={segmentColors[c.segment]} variant="secondary">
                          {segmentLabels[c.segment]}
                        </Badge>
                      </td>
                      <td className="py-3 px-3 text-foreground">{c.score}%</td>
                      <td className="py-3 px-3 text-muted-foreground hidden sm:table-cell">{c.purchases}</td>
                      <td className="py-3 px-3 text-muted-foreground hidden md:table-cell">{c.city}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>

        <Card className="eco-shadow">
          <CardHeader>
            <CardTitle className="font-display text-lg">Feature Importance</CardTitle>
            <p className="text-sm text-muted-foreground">Key drivers of eco-adoption</p>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={260}>
              <BarChart data={featureImportance} layout="vertical" margin={{ left: 20 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                <XAxis type="number" stroke="hsl(var(--muted-foreground))" fontSize={12} domain={[0, 0.35]} />
                <YAxis type="category" dataKey="feature" stroke="hsl(var(--muted-foreground))" fontSize={12} width={90} />
                <Tooltip
                  formatter={(val: number) => `${(val * 100).toFixed(0)}%`}
                  contentStyle={{
                    backgroundColor: "hsl(var(--card))",
                    border: "1px solid hsl(var(--border))",
                    borderRadius: "var(--radius)",
                    fontSize: 12,
                  }}
                />
                <Bar dataKey="importance" fill="hsl(var(--primary))" radius={[0, 4, 4, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Segmentation;
