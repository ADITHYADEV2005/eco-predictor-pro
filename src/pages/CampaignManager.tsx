import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Megaphone, Sparkles, Shield, Heart } from "lucide-react";

const campaigns = [
  {
    segment: "Eco-Champions",
    tagColor: "bg-eco-champion text-primary-foreground",
    icon: Heart,
    subject: "🌍 Join the Movement — Your Impact Report Is Ready",
    body: "You've already made a difference. This month, your sustainable choices helped save 12kg of CO₂. Ready to go further? Discover our new Carbon-Negative Collection — products that give back more than they take. Because for changemakers like you, good isn't good enough.",
    tone: "Impact-driven, aspirational",
    cta: "Explore Carbon-Negative Products →",
  },
  {
    segment: "Pragmatic Greens",
    tagColor: "bg-eco-pragmatic text-primary-foreground",
    icon: Shield,
    subject: "Built to Last: Eco Products That Save You Money",
    body: "Sustainability shouldn't mean compromise. Our Eco-Essentials line is designed to outperform conventional alternatives — lasting 3x longer while reducing waste. See how switching saves the average household $340/year without changing your routine.",
    tone: "Value-focused, practical",
    cta: "See the Savings Breakdown →",
  },
  {
    segment: "Traditionalists",
    tagColor: "bg-eco-traditional text-primary-foreground",
    icon: Sparkles,
    subject: "Same Quality, Smarter Choice — Try It Free",
    body: "We get it — you want products that just work. Our Eco-Lite range delivers the exact same performance you expect, with materials that happen to be better for the planet. No lecture, no compromise. Try a sample pack on us.",
    tone: "Reassuring, low-pressure",
    cta: "Claim Your Free Trial →",
  },
];

const CampaignManager = () => {
  return (
    <div className="space-y-8 animate-fade-in">
      <div>
        <h1 className="font-display text-2xl font-bold text-foreground">Campaign Manager</h1>
        <p className="text-muted-foreground mt-1">AI-generated marketing copy tailored to each customer segment</p>
      </div>

      <Tabs defaultValue="Eco-Champions">
        <TabsList className="bg-muted">
          {campaigns.map((c) => (
            <TabsTrigger key={c.segment} value={c.segment} className="data-[state=active]:bg-card">
              {c.segment}
            </TabsTrigger>
          ))}
        </TabsList>

        {campaigns.map((c) => (
          <TabsContent key={c.segment} value={c.segment}>
            <Card className="eco-shadow animate-scale-in">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="font-display text-lg flex items-center gap-2">
                    <Megaphone className="h-5 w-5 text-primary" />
                    Campaign for {c.segment}
                  </CardTitle>
                  <Badge className={c.tagColor} variant="secondary">{c.segment}</Badge>
                </div>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-1">
                  <p className="text-xs text-muted-foreground uppercase tracking-wider font-medium">Tone</p>
                  <p className="text-sm text-foreground">{c.tone}</p>
                </div>

                <div className="space-y-1">
                  <p className="text-xs text-muted-foreground uppercase tracking-wider font-medium">Subject Line</p>
                  <p className="text-base font-medium text-foreground">{c.subject}</p>
                </div>

                <div className="space-y-1">
                  <p className="text-xs text-muted-foreground uppercase tracking-wider font-medium">Email Body</p>
                  <div className="p-4 rounded-lg bg-eco-surface border border-border">
                    <p className="text-sm text-foreground leading-relaxed">{c.body}</p>
                  </div>
                </div>

                <div className="space-y-1">
                  <p className="text-xs text-muted-foreground uppercase tracking-wider font-medium">Call to Action</p>
                  <div className="inline-block px-5 py-2.5 rounded-lg eco-gradient text-primary-foreground text-sm font-medium">
                    {c.cta}
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        ))}
      </Tabs>
    </div>
  );
};

export default CampaignManager;
