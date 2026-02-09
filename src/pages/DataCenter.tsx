import { useState, useCallback } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Upload, FileSpreadsheet, CheckCircle2, AlertCircle, Clock, Database } from "lucide-react";

const healthChecks = [
  { label: "No missing values detected", status: "pass" as const },
  { label: "Column types validated", status: "pass" as const },
  { label: "Outlier check (Income > $500K)", status: "warn" as const },
  { label: "Duplicate rows removed", status: "pass" as const },
  { label: "Date format consistency", status: "pass" as const },
];

const DataCenter = () => {
  const [file, setFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [uploaded, setUploaded] = useState(false);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    const f = e.dataTransfer.files[0];
    if (f && f.name.endsWith(".csv")) {
      setFile(f);
    }
  }, []);

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const f = e.target.files?.[0];
    if (f) setFile(f);
  };

  const handleUpload = () => {
    if (!file) return;
    setUploading(true);
    setProgress(0);
    const interval = setInterval(() => {
      setProgress((p) => {
        if (p >= 100) {
          clearInterval(interval);
          setUploading(false);
          setUploaded(true);
          return 100;
        }
        return p + 8;
      });
    }, 120);
  };

  return (
    <div className="space-y-8 animate-fade-in">
      <div>
        <h1 className="font-display text-2xl font-bold text-foreground">Data Center</h1>
        <p className="text-muted-foreground mt-1">Upload and validate customer datasets for analysis</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="eco-shadow">
          <CardHeader>
            <CardTitle className="font-display text-lg flex items-center gap-2">
              <Upload className="h-5 w-5 text-primary" />
              Upload Dataset
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div
              onDragOver={(e) => e.preventDefault()}
              onDrop={handleDrop}
              className="border-2 border-dashed border-border rounded-xl p-10 text-center hover:border-primary/50 transition-colors cursor-pointer"
              onClick={() => document.getElementById("file-input")?.click()}
            >
              <input id="file-input" type="file" accept=".csv" className="hidden" onChange={handleFileSelect} />
              <Database className="h-10 w-10 text-muted-foreground/40 mx-auto mb-3" />
              {file ? (
                <div className="space-y-1">
                  <div className="flex items-center justify-center gap-2">
                    <FileSpreadsheet className="h-4 w-4 text-primary" />
                    <span className="text-sm font-medium text-foreground">{file.name}</span>
                  </div>
                  <p className="text-xs text-muted-foreground">{(file.size / 1024).toFixed(1)} KB</p>
                </div>
              ) : (
                <div>
                  <p className="text-sm text-muted-foreground mb-1">Drag & drop a CSV file here, or click to browse</p>
                  <p className="text-xs text-muted-foreground">Supports .csv up to 50MB</p>
                </div>
              )}
            </div>

            {file && !uploaded && (
              <div className="mt-4 space-y-3">
                {uploading && <Progress value={Math.min(progress, 100)} className="h-2" />}
                <Button onClick={handleUpload} disabled={uploading} className="w-full eco-gradient border-0">
                  {uploading ? `Processing... ${Math.min(progress, 100)}%` : "Upload & Validate"}
                </Button>
              </div>
            )}

            {uploaded && (
              <div className="mt-4 flex items-center gap-2 p-3 rounded-lg bg-accent text-accent-foreground">
                <CheckCircle2 className="h-4 w-4" />
                <span className="text-sm font-medium">Dataset uploaded and validated successfully</span>
              </div>
            )}
          </CardContent>
        </Card>

        <Card className="eco-shadow">
          <CardHeader>
            <CardTitle className="font-display text-lg">Data Health Checklist</CardTitle>
            <p className="text-sm text-muted-foreground">Automated quality checks on your dataset</p>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {healthChecks.map((check, i) => (
                <div key={i} className="flex items-center gap-3 py-2 border-b border-border/50 last:border-0">
                  {check.status === "pass" ? (
                    <CheckCircle2 className="h-4 w-4 text-primary flex-shrink-0" />
                  ) : check.status === "warn" ? (
                    <AlertCircle className="h-4 w-4 text-eco-pragmatic flex-shrink-0" />
                  ) : (
                    <Clock className="h-4 w-4 text-muted-foreground flex-shrink-0" />
                  )}
                  <span className="text-sm text-foreground">{check.label}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default DataCenter;
