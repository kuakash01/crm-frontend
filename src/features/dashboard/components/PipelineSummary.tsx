import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface PipelineSummaryProps {
  pipeline: {
    OPEN: number;
    QUOTATION_SENT: number;
    NEGOTIATION: number;
    WON: number;
    LOST: number;
  };
}

const stages = [
  {
    key: "OPEN",
    label: "Open",
    color: "bg-slate-500",
  },
  {
    key: "QUOTATION_SENT",
    label: "Quotation",
    color: "bg-violet-500",
  },
  {
    key: "NEGOTIATION",
    label: "Negotiation",
    color: "bg-amber-500",
  },
  {
    key: "WON",
    label: "Won",
    color: "bg-emerald-500",
  },
  {
    key: "LOST",
    label: "Lost",
    color: "bg-red-500",
  },
] as const;

export default function PipelineSummary({ pipeline }: PipelineSummaryProps) {
  const total = Object.values(pipeline).reduce((sum, value) => sum + value, 0);

  return (
      <Card className="h-full">
        <CardHeader className="pb-4">
          <CardTitle>Deal Pipeline</CardTitle>

          <p className="text-sm text-muted-foreground">{total} Total Deals</p>
        </CardHeader>

        <CardContent className="space-y-4">
          {stages.map((stage) => {
            const count = pipeline[stage.key];

            const percentage =
              total === 0 ? 0 : Math.round((count / total) * 100);

            return (
              <div key={stage.key} className="space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div
                      className={`h-2.5 w-2.5 rounded-full ${stage.color}`}
                    />

                    <span className="text-sm font-medium">{stage.label}</span>
                  </div>

                  <div className="flex items-center gap-3">
                    <span className="text-xs text-muted-foreground">
                      {percentage}%
                    </span>

                    <span className="w-7 text-right text-lg font-bold">
                      {count}
                    </span>
                  </div>
                </div>

                <div className="h-2 w-full rounded-full bg-gray-200 dark:bg-gray-800">
                  <div
                    className="h-2 rounded-full transition-all"
                    style={{
                      width: `${percentage}%`,
                      backgroundColor:
                        stage.key === "OPEN"
                          ? "#64748b"
                          : stage.key === "QUOTATION_SENT"
                            ? "#8b5cf6"
                            : stage.key === "NEGOTIATION"
                              ? "#f59e0b"
                              : stage.key === "WON"
                                ? "#22c55e"
                                : "#ef4444",
                    }}
                  />
                </div>
              </div>
            );
          })}
        </CardContent>
      </Card>
     
  );
}
