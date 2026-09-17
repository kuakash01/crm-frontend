"use client";

import { useState, useEffect } from "react";
import { toast } from "sonner";
import {
  KeyRound,
  Copy,
  Check,
  Eye,
  EyeOff,
  RefreshCw,
  Code2,
  ShieldAlert,
  Terminal,
  CheckCircle2,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  regenerateInboundKey,
} from "@/features/organizations/organizations.service";

interface InboundApiSectionProps {
  inboundKey: string;
  onKeyRegenerated?: (newKey: string) => void;
  isCardWrapper?: boolean;
}

export default function InboundApiSection({
  inboundKey: initialKey,
  onKeyRegenerated,
  isCardWrapper = true,
}: InboundApiSectionProps) {
  const [currentKey, setCurrentKey] = useState(initialKey);
  const [showKey, setShowKey] = useState(false);
  const [copiedKey, setCopiedKey] = useState(false);
  const [copiedUrl, setCopiedUrl] = useState(false);
  const [copiedCurl, setCopiedCurl] = useState(false);
  const [copiedJs, setCopiedJs] = useState(false);
  const [regenerating, setRegenerating] = useState(false);
  const [showConfirmRegen, setShowConfirmRegen] = useState(false);
  const [endpointUrl, setEndpointUrl] = useState("/api/leads/public");

  useEffect(() => {
    setCurrentKey(initialKey);
  }, [initialKey]);

  useEffect(() => {
    if (typeof window !== "undefined") {
      setEndpointUrl(`${window.location.origin}/api/leads/public`);
    }
  }, []);

  const handleCopy = async (
    text: string,
    setter: (val: boolean) => void,
    label: string
  ) => {
    try {
      await navigator.clipboard.writeText(text);
      setter(true);
      toast.success(`${label} copied to clipboard!`);
      setTimeout(() => setter(false), 2000);
    } catch {
      toast.error(`Failed to copy ${label.toLowerCase()}`);
    }
  };

  const handleRegenerate = async () => {
    try {
      setRegenerating(true);
      const res = await regenerateInboundKey();
      setCurrentKey(res.inboundLeadKey);
      onKeyRegenerated?.(res.inboundLeadKey);
      setShowConfirmRegen(false);
      setShowKey(true);
      toast.success("Inbound Lead API Key successfully regenerated!");
    } catch (error: unknown) {
      const msg =
        (error as { response?: { data?: { message?: string } } })?.response
          ?.data?.message ?? "Failed to regenerate API key";
      toast.error(msg);
    } finally {
      setRegenerating(false);
    }
  };

  const curlSnippet = `curl -X POST "${endpointUrl}" \\
  -H "Content-Type: application/json" \\
  -H "X-Inbound-Key: ${currentKey || "YOUR_INBOUND_KEY"}" \\
  -d '{
    "firstName": "Alex",
    "lastName": "Rivera",
    "email": "alex.rivera@example.com",
    "phone": "+1 (555) 019-2834",
    "company": "Acme Innovations",
    "source": "Website Landing Page",
    "notes": "Requested a product demo via web form"
  }'`;

  const jsSnippet = `// Submit an inbound lead from your website frontend or serverless function
const response = await fetch("${endpointUrl}", {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
    "X-Inbound-Key": "${currentKey || "YOUR_INBOUND_KEY"}",
  },
  body: JSON.stringify({
    firstName: "Alex",
    lastName: "Rivera",
    email: "alex.rivera@example.com",
    phone: "+1 (555) 019-2834",
    company: "Acme Innovations",
    source: "Website Landing Page",
  }),
});

const result = await response.json();
console.log("Lead captured:", result);`;

  const content = (
    <div className="space-y-6">
      <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <div className="flex items-center gap-2">
            <h3 className="text-lg font-semibold tracking-tight text-foreground">
              Inbound Lead API & Webhooks
            </h3>
            <Badge variant="secondary" className="bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/20 font-medium">
              Admin Only
            </Badge>
          </div>
          <p className="text-sm text-muted-foreground mt-1">
            Capture leads automatically from external websites, landing pages, Webflow, or custom forms into your workspace.
          </p>
        </div>
      </div>

      {/* Security alert */}
      <div className="flex items-start gap-3 rounded-lg border border-amber-500/20 bg-amber-500/5 p-3.5 text-xs text-amber-700 dark:text-amber-400">
        <ShieldAlert className="h-4 w-4 shrink-0 mt-0.5" />
        <div>
          <span className="font-semibold">Confidential Access:</span> This key grants write-only permission to insert new leads into your workspace. It is visible only to Organization Admins and Owners.
        </div>
      </div>

      {/* Inbound Key */}
      <div className="space-y-2">
        <Label htmlFor="inbound-key" className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
          Publishable Organization Key
        </Label>
        <div className="flex flex-col sm:flex-row gap-2">
          <div className="relative flex-1">
            <Input
              id="inbound-key"
              type={showKey ? "text" : "password"}
              value={currentKey || "No key generated yet"}
              readOnly
              className="font-mono text-xs pr-20 bg-muted/40 selection:bg-primary/20"
            />
            <Button
              type="button"
              variant="ghost"
              size="icon"
              className="absolute right-1 top-1/2 -translate-y-1/2 h-7 w-7 text-muted-foreground hover:text-foreground"
              onClick={() => setShowKey(!showKey)}
              title={showKey ? "Hide key" : "Show key"}
            >
              {showKey ? <EyeOff className="h-3.5 w-3.5" /> : <Eye className="h-3.5 w-3.5" />}
            </Button>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={() => handleCopy(currentKey, setCopiedKey, "Inbound API Key")}
              disabled={!currentKey}
              className="gap-1.5 text-xs h-9"
            >
              {copiedKey ? (
                <>
                  <Check className="h-3.5 w-3.5 text-emerald-500" />
                  <span>Copied</span>
                </>
              ) : (
                <>
                  <Copy className="h-3.5 w-3.5" />
                  <span>Copy Key</span>
                </>
              )}
            </Button>

            {!showConfirmRegen ? (
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={() => setShowConfirmRegen(true)}
                className="gap-1.5 text-xs h-9 text-muted-foreground hover:text-destructive hover:border-destructive/30"
              >
                <RefreshCw className="h-3.5 w-3.5" />
                <span>Regenerate</span>
              </Button>
            ) : (
              <div className="flex items-center gap-1.5 bg-destructive/10 border border-destructive/20 rounded-md p-1">
                <span className="text-[11px] text-destructive font-medium px-1">Sure?</span>
                <Button
                  type="button"
                  variant="destructive"
                  size="sm"
                  disabled={regenerating}
                  onClick={handleRegenerate}
                  className="h-7 px-2 text-xs"
                >
                  {regenerating ? "Regenerating..." : "Confirm"}
                </Button>
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  onClick={() => setShowConfirmRegen(false)}
                  className="h-7 px-2 text-xs"
                >
                  Cancel
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Webhook Endpoint */}
      <div className="space-y-2">
        <Label htmlFor="webhook-url" className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
          Webhook Endpoint URL (POST)
        </Label>
        <div className="flex flex-col sm:flex-row gap-2">
          <Input
            id="webhook-url"
            value={endpointUrl}
            readOnly
            className="font-mono text-xs bg-muted/40 selection:bg-primary/20 flex-1"
          />
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={() => handleCopy(endpointUrl, setCopiedUrl, "Webhook Endpoint URL")}
            className="gap-1.5 text-xs shrink-0 h-9"
          >
            {copiedUrl ? (
              <>
                <Check className="h-3.5 w-3.5 text-emerald-500" />
                <span>Copied</span>
              </>
            ) : (
              <>
                <Copy className="h-3.5 w-3.5" />
                <span>Copy URL</span>
              </>
            )}
          </Button>
        </div>
      </div>

      {/* Integration Code Examples */}
      <div className="space-y-2 pt-2">
        <div className="flex items-center justify-between">
          <Label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
            Code Example & Payload Format
          </Label>
        </div>

        <Tabs defaultValue="curl" className="w-full">
          <div className="flex items-center justify-between border-b pb-2">
            <TabsList className="h-8 p-0 bg-transparent">
              <TabsTrigger
                value="curl"
                className="data-[state=active]:bg-muted data-[state=active]:text-foreground text-xs h-7 px-2.5 rounded-sm"
              >
                <Terminal className="h-3.5 w-3.5 mr-1.5" />
                cURL
              </TabsTrigger>
              <TabsTrigger
                value="javascript"
                className="data-[state=active]:bg-muted data-[state=active]:text-foreground text-xs h-7 px-2.5 rounded-sm"
              >
                <Code2 className="h-3.5 w-3.5 mr-1.5" />
                JavaScript (fetch)
              </TabsTrigger>
            </TabsList>

            <TabsContent value="curl" className="m-0">
              <Button
                type="button"
                variant="ghost"
                size="sm"
                onClick={() => handleCopy(curlSnippet, setCopiedCurl, "cURL command")}
                className="h-7 text-xs gap-1.5 text-muted-foreground hover:text-foreground"
              >
                {copiedCurl ? <Check className="h-3 w-3 text-emerald-500" /> : <Copy className="h-3 w-3" />}
                <span>{copiedCurl ? "Copied" : "Copy Snippet"}</span>
              </Button>
            </TabsContent>

            <TabsContent value="javascript" className="m-0">
              <Button
                type="button"
                variant="ghost"
                size="sm"
                onClick={() => handleCopy(jsSnippet, setCopiedJs, "JavaScript snippet")}
                className="h-7 text-xs gap-1.5 text-muted-foreground hover:text-foreground"
              >
                {copiedJs ? <Check className="h-3 w-3 text-emerald-500" /> : <Copy className="h-3 w-3" />}
                <span>{copiedJs ? "Copied" : "Copy Snippet"}</span>
              </Button>
            </TabsContent>
          </div>

          <TabsContent value="curl" className="mt-2">
            <pre className="p-3.5 rounded-lg bg-slate-950 text-slate-100 text-xs font-mono overflow-x-auto border border-slate-800 leading-relaxed">
              <code>{curlSnippet}</code>
            </pre>
          </TabsContent>

          <TabsContent value="javascript" className="mt-2">
            <pre className="p-3.5 rounded-lg bg-slate-950 text-slate-100 text-xs font-mono overflow-x-auto border border-slate-800 leading-relaxed">
              <code>{jsSnippet}</code>
            </pre>
          </TabsContent>
        </Tabs>
      </div>

      {/* Feature capabilities info */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2 text-xs">
        <div className="flex items-start gap-2 rounded-md border p-2.5 bg-muted/20">
          <CheckCircle2 className="h-4 w-4 text-emerald-500 shrink-0 mt-0.5" />
          <span className="text-muted-foreground">
            <strong className="text-foreground">Zero Leaks:</strong> Workspace credentials and internal user records are never exposed.
          </span>
        </div>
        <div className="flex items-start gap-2 rounded-md border p-2.5 bg-muted/20">
          <CheckCircle2 className="h-4 w-4 text-emerald-500 shrink-0 mt-0.5" />
          <span className="text-muted-foreground">
            <strong className="text-foreground">Deduplication:</strong> Updates existing leads if email exists or creates new records automatically.
          </span>
        </div>
        <div className="flex items-start gap-2 rounded-md border p-2.5 bg-muted/20">
          <CheckCircle2 className="h-4 w-4 text-emerald-500 shrink-0 mt-0.5" />
          <span className="text-muted-foreground">
            <strong className="text-foreground">Instant Alerts:</strong> Sales reps receive live socket events whenever a new lead lands.
          </span>
        </div>
      </div>
    </div>
  );

  if (!isCardWrapper) {
    return content;
  }

  return (
    <Card className="border-0 shadow-lg">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <KeyRound className="h-5 w-5 text-primary" />
          Inbound Webhook & API Key
        </CardTitle>
        <CardDescription>
          Connect your marketing websites, forms, and webhooks to automatically capture leads.
        </CardDescription>
      </CardHeader>
      <CardContent>{content}</CardContent>
    </Card>
  );
}
