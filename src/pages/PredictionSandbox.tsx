import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { FlaskConical, Sparkles, ArrowRight } from "lucide-react";

interface PredictionResult {
  score: number;
  segment: string;
  product: string;
  recommendation: string;
}

const PredictionSandbox = () => {
  const [age, setAge] = useState("35");
  const [income, setIncome] = useState("65000");
  const [purchases, setPurchases] = useState([5]);
  const [socialScore, setSocialScore] = useState([60]);
  const [result, setResult] = useState<PredictionResult | null>(null);
  const [loading, setLoading] = useState(false);

  const handlePredict = () => {
    setLoading(true);
    setTimeout(() => {
      const ageNum = parseInt(age) || 30;
      const incomeNum = parseInt(income) || 50000;
      const purchaseNum = purchases[0];
      const social = socialScore[0];

      const raw = (purchaseNum * 8) + (social * 0.4) + (incomeNum > 60000 ? 15 : 5) + (ageNum > 25 && ageNum < 45 ? 10 : 3);
      const score = Math.min(Math.max(Math.round(raw), 8), 97);

      let segment: string, product: string, recommendation: string;
      if (score >= 70) {
        segment = "Eco-Champion";
        product = "Premium Bamboo Home Kit";
        recommendation = "This customer shows strong eco-affinity. Pitch premium sustainable products emphasizing environmental impact and innovation.";
      } else if (score >= 40) {
        segment = "Pragmatic Green";
        product = "Eco-Essentials Starter Pack";
        recommendation = "Focus on value and durability. Highlight cost savings over time and practical benefits of switching to eco-friendly alternatives.";
      } else {
        segment = "Traditionalist";
        product = "Eco-Lite Trial Bundle";
        recommendation = "Start with low-commitment trial products. Emphasize quality parity and subtle environmental benefits without overwhelming eco-messaging.";
      }

      setResult({ score, segment, product, recommendation });
      setLoading(false);
    }, 800);
  };

  return (
    <div className="space-y-8 animate-fade-in">
      <div>
        <h1 className="font-display text-2xl font-bold text-foreground">Prediction Sandbox</h1>
        <p className="text-muted-foreground mt-1">Input customer attributes to predict eco-adoption propensity</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="eco-shadow">
          <CardHeader>
            <CardTitle className="font-display text-lg flex items-center gap-2">
              <FlaskConical className="h-5 w-5 text-primary" />
              Customer Attributes
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="age">Age</Label>
                <Input id="age" type="number" value={age} onChange={(e) => setAge(e.target.value)} placeholder="e.g. 35" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="income">Annual Income ($)</Label>
                <Input id="income" type="number" value={income} onChange={(e) => setIncome(e.target.value)} placeholder="e.g. 65000" />
              </div>
            </div>

            <div className="space-y-3">
              <Label>Previous Sustainable Purchases: {purchases[0]}</Label>
              <Slider value={purchases} onValueChange={setPurchases} max={20} step={1} className="py-1" />
            </div>

            <div className="space-y-3">
              <Label>Social Influence Score: {socialScore[0]}</Label>
              <Slider value={socialScore} onValueChange={setSocialScore} max={100} step={1} className="py-1" />
            </div>

            <Button onClick={handlePredict} disabled={loading} className="w-full eco-gradient border-0">
              {loading ? "Analyzing..." : "Predict"}
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </CardContent>
        </Card>

        {result ? (
          <Card className="eco-shadow animate-scale-in">
            <CardHeader>
              <CardTitle className="font-display text-lg flex items-center gap-2">
                <Sparkles className="h-5 w-5 text-primary" />
                Prediction Result
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center justify-center">
                <div className="relative">
                  <svg width="160" height="160" viewBox="0 0 160 160">
                    <circle cx="80" cy="80" r="65" fill="none" stroke="hsl(var(--muted))" strokeWidth="8" />
                    <circle
                      cx="80" cy="80" r="65" fill="none"
                      stroke="hsl(var(--primary))" strokeWidth="8" strokeLinecap="round"
                      strokeDasharray={2 * Math.PI * 65}
                      strokeDashoffset={2 * Math.PI * 65 * (1 - result.score / 100)}
                      transform="rotate(-90 80 80)"
                    />
                  </svg>
                  <div className="absolute inset-0 flex flex-col items-center justify-center">
                    <span className="text-3xl font-display font-bold text-foreground">{result.score}%</span>
                    <span className="text-xs text-muted-foreground">Eco-Score</span>
                  </div>
                </div>
              </div>

              <div className="space-y-3">
                <div className="flex justify-between items-center py-2 border-b border-border">
                  <span className="text-sm text-muted-foreground">Segment</span>
                  <span className="text-sm font-medium text-foreground">{result.segment}</span>
                </div>
                <div className="flex justify-between items-center py-2 border-b border-border">
                  <span className="text-sm text-muted-foreground">Recommended Product</span>
                  <span className="text-sm font-medium text-foreground">{result.product}</span>
                </div>
              </div>

              <div className="p-4 rounded-lg bg-eco-surface border border-border">
                <p className="text-sm text-foreground leading-relaxed">{result.recommendation}</p>
              </div>
            </CardContent>
          </Card>
        ) : (
          <Card className="eco-shadow flex items-center justify-center border-dashed">
            <CardContent className="text-center py-16">
              <FlaskConical className="h-12 w-12 text-muted-foreground/40 mx-auto mb-4" />
              <p className="text-muted-foreground">Enter customer attributes and click Predict to see results</p>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};

export default PredictionSandbox;
