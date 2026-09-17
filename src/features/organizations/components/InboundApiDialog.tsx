"use client";

import { useState, useEffect } from "react";
import { Webhook } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import InboundApiSection from "./InboundApiSection";
import { getMyOrganization } from "@/features/organizations/organizations.service";

interface InboundApiDialogProps {
  trigger?: React.ReactNode;
}

export default function InboundApiDialog({ trigger }: InboundApiDialogProps) {
  const [open, setOpen] = useState(false);
  const [inboundKey, setInboundKey] = useState<string>("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (open) {
      const loadOrg = async () => {
        try {
          setLoading(true);
          const org = await getMyOrganization();
          setInboundKey(org.inboundLeadKey ?? "");
        } catch {
          // handled gracefully
        } finally {
          setLoading(false);
        }
      };
      loadOrg();
    }
  }, [open]);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {trigger ? (
          trigger
        ) : (
          <Button variant="outline" className="gap-2">
            <Webhook className="h-4 w-4" />
            <span>Inbound API</span>
          </Button>
        )}
      </DialogTrigger>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto sm:max-w-2xl">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Webhook className="h-5 w-5 text-primary" />
            Inbound Lead API & Webhooks
          </DialogTitle>
        </DialogHeader>
        {loading ? (
          <div className="flex h-48 items-center justify-center text-sm text-muted-foreground">
            Loading API integration credentials...
          </div>
        ) : (
          <InboundApiSection
            inboundKey={inboundKey}
            onKeyRegenerated={(newKey) => setInboundKey(newKey)}
            isCardWrapper={false}
          />
        )}
      </DialogContent>
    </Dialog>
  );
}
