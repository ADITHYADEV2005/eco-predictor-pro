import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Users, TrendingUp, Target, Leaf } from "lucide-react";
import { EcoPropensityGauge } from "@/components/EcoPropensityGauge";
import { AdoptionTrendsChart } from "@/components/AdoptionTrendsChart";

const stats = [
  { title: "Total Customers Analyzed", value: "12,847", icon: Users, change: "+8.2% this month" },
  { title: "Eco-Champions Identified", value: "3,412", icon: Target, change: "26.5% of total" },
  { title: "Campaign Conversion", value: "18.4%", icon: TrendingUp, change: "+2.1% vs last quarter" },
  { title: "Products Recommended", value: "847", icon: Leaf, change: "Across 5 categories" },
];

const Dashboard = () => {
  return (
    <div className="space-y-8 animate-fade-in">
      <div>
        <h1 className="font-display text-2xl font-bold text-foreground">Dashboard</h1>
        <p className="text-muted-foreground mt-1">Overview of eco-product adoption analytics</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat) => (
          <Card key={stat.title} className="eco-shadow hover:eco-shadow-lg transition-shadow">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">{stat.title}</CardTitle>
              <stat.icon className="h-4 w-4 text-primary" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-display font-bold text-foreground">{stat.value}</div>
              <p className="text-xs text-muted-foreground mt-1">{stat.change}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-2 eco-shadow">
          <CardHeader>
            <CardTitle className="font-display text-lg">Adoption Trends</CardTitle>
            <p className="text-sm text-muted-foreground">Eco-product adoption over the last 6 months</p>
          </CardHeader>
          <CardContent>
            <AdoptionTrendsChart />
          </CardContent>
        </Card>

        <Card className="eco-shadow">
          <CardHeader>
            <CardTitle className="font-display text-lg">Average Eco-Propensity</CardTitle>
            <p className="text-sm text-muted-foreground">Overall customer adoption score</p>
          </CardHeader>
          <CardContent className="flex items-center justify-center py-4">
            <EcoPropensityGauge value={67} />
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;
