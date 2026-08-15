"use client";

import { useEffect, useState } from "react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import UserSelect from "@/shared/components/user-assignment/UserSelect";
import RecordPickerDialog from "@/shared/components/pickers/RecordPickerDialog";

import { createTask, updateTask } from "../tasks.service";
import { usePermission } from "@/shared/hooks/usePermissions";

type EntityType = "GENERAL" | "LEAD" | "CUSTOMER" | "DEAL";

type TaskPriority = "LOW" | "NORMAL" | "HIGH" | "URGENT";

export interface TaskFormData {
  id?: number;

  title: string;
  description: string | null;
  due_date: string | null;
  priority: TaskPriority;

  assigned_to: number | null;

  entity_type?: EntityType | null;
  entity_id?: number | null;
}

interface SelectedRecord {
  id: number;
  name: string;
  subtitle?: string | null;

  meta?: {
    assigned_to?: number | null;
    assigned_to_name?: string | null;
  };
}

interface TaskFormProps {
  mode: "create" | "edit";

  initialData?: Partial<TaskFormData>;

  /*
   * Used when creating from a module task tab.
   *
   * Example:
   * entityType="LEAD"
   * entityId={leadId}
   */
  fixedEntityType?: "LEAD" | "CUSTOMER" | "DEAL";
  fixedEntityId?: number;

  /*
   * Optional default assignee.
   * Useful for module task creation.
   */
  defaultAssignedTo?: number | null;

  onSuccess?: () => void;
  onCancel?: () => void;
}

const formatDateTimeLocal = (date?: string | null) => {
  if (!date) return "";

  const parsed = new Date(date);

  if (Number.isNaN(parsed.getTime())) {
    return "";
  }

  const year = parsed.getFullYear();
  const month = String(parsed.getMonth() + 1).padStart(2, "0");
  const day = String(parsed.getDate()).padStart(2, "0");
  const hours = String(parsed.getHours()).padStart(2, "0");
  const minutes = String(parsed.getMinutes()).padStart(2, "0");

  return `${year}-${month}-${day}T${hours}:${minutes}`;
};

export default function TaskForm({
  mode,
  initialData,
  fixedEntityType,
  fixedEntityId,
  defaultAssignedTo,
  onSuccess,
  onCancel,
}: TaskFormProps) {
  const { can } = usePermission();

  const isEdit = mode === "edit";

  const isFixedEntity =
    fixedEntityType !== undefined && fixedEntityId !== undefined;

  const [loading, setLoading] = useState(false);

  const [title, setTitle] = useState(initialData?.title ?? "");

  const [description, setDescription] = useState(
    initialData?.description ?? "",
  );

  const [dueDate, setDueDate] = useState(
    formatDateTimeLocal(initialData?.due_date),
  );

  const [priority, setPriority] = useState<TaskPriority>(
    initialData?.priority ?? "NORMAL",
  );

  const [assignedTo, setAssignedTo] = useState<number | undefined>(
    initialData?.assigned_to ?? defaultAssignedTo ?? undefined,
  );

  /*
   * Entity state is only relevant
   * during CREATE.
   */
  const [entityType, setEntityType] = useState<EntityType>(
    fixedEntityType ?? initialData?.entity_type ?? "GENERAL",
  );

  const [entityId, setEntityId] = useState<number | null>(
    fixedEntityId ?? initialData?.entity_id ?? null,
  );

  const [selectedRecord, setSelectedRecord] = useState<SelectedRecord | null>(
    null,
  );

  const [recordPickerOpen, setRecordPickerOpen] = useState(false);

  /*
   * Keep fixed module entity in sync.
   */
  useEffect(() => {
    if (!isFixedEntity) return;

    setEntityType(fixedEntityType);
    setEntityId(fixedEntityId);
  }, [fixedEntityType, fixedEntityId, isFixedEntity]);

  /*
   * Keep default assignee in sync.
   */
  useEffect(() => {
    if (mode === "create" && defaultAssignedTo) {
      setAssignedTo(defaultAssignedTo);
    }
  }, [defaultAssignedTo, mode]);

  /*
   * Entity type changed on the
   * main Create Task page.
   */
  const handleEntityTypeChange = (value: string) => {
    const newEntityType = value as EntityType;

    setEntityType(newEntityType);
    setEntityId(null);
    setSelectedRecord(null);
    setAssignedTo(undefined);
    setRecordPickerOpen(false);
  };

  /*
   * Record selected from picker.
   */
  const handleRecordSelect = (record: SelectedRecord) => {
    setSelectedRecord(record);

    setEntityId(record.id);

    /*
     * Default task assignee to
     * the record owner.
     */
    const ownerId = record.meta?.assigned_to;

    setAssignedTo(ownerId ?? undefined);
  };

  /*
   * Submit
   */
  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    if (!title.trim()) {
      toast.error("Task title is required");
      return;
    }

    if (!assignedTo) {
      toast.error("Please assign the task");
      return;
    }

    /*
     * Entity validation is required
     * only for CREATE.
     */
    if (
      mode === "create" &&
      !isFixedEntity &&
      entityType !== "GENERAL" &&
      !entityId
    ) {
      toast.error("Please select a related record");
      return;
    }

    try {
      setLoading(true);

      if (mode === "create") {
        await createTask({
          title: title.trim(),

          description: description.trim() || null,

          due_date: dueDate || null,

          priority,

          assigned_to: assignedTo,

          entity_type: entityType === "GENERAL" ? null : entityType,

          entity_id: entityType === "GENERAL" ? null : entityId,
        });

        toast.success("Task created successfully");
      } else {
        if (!initialData?.id) {
          throw new Error("Task ID is required");
        }

        await updateTask(initialData.id, {
          title: title.trim(),

          description: description.trim() || null,

          due_date: dueDate || null,

          priority,

          assigned_to: assignedTo,
        });

        toast.success("Task updated successfully");
      }

      onSuccess?.();
    } catch {
      toast.error(
        mode === "create" ? "Failed to create task" : "Failed to update task",
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Title */}

        <div className="space-y-2">
          <Label>Task Title</Label>

          <Input
            placeholder="e.g. Follow up with client"
            value={title}
            onChange={(event) => setTitle(event.target.value)}
          />
        </div>

        {/* Description */}

        <div className="space-y-2">
          <Label>Description</Label>

          <Textarea
            placeholder="Add task details..."
            value={description}
            onChange={(event) => setDescription(event.target.value)}
            rows={5}
          />
        </div>

        {/* Related To */}
        {mode === "create" && !isFixedEntity && (
          <div className="grid gap-6 md:grid-cols-2">
            <div className="space-y-2">
              <Label>Related To</Label>

              <Select value={entityType} onValueChange={handleEntityTypeChange}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>

                <SelectContent>
                  <SelectItem value="GENERAL">General Task</SelectItem>

                  <SelectItem value="LEAD">Lead</SelectItem>

                  <SelectItem value="CUSTOMER">Customer</SelectItem>

                  <SelectItem value="DEAL">Deal</SelectItem>
                </SelectContent>
              </Select>

              <p className="text-xs text-muted-foreground">
                Optional. Leave as General Task if this isn't related to a CRM
                record.
              </p>
            </div>

            {entityType !== "GENERAL" && (
              <div className="space-y-2">
                <Label>Related Record</Label>

                <Button
                  type="button"
                  variant="outline"
                  className="w-full justify-start"
                  onClick={() => setRecordPickerOpen(true)}
                >
                  {selectedRecord ? (
                    <span className="truncate">{selectedRecord.name}</span>
                  ) : (
                    <span className="text-muted-foreground">
                      Select {entityType.toLowerCase()}
                      ...
                    </span>
                  )}
                </Button>

                {selectedRecord?.meta?.assigned_to_name && (
                  <p className="text-xs text-muted-foreground">
                    Record owner: {selectedRecord.meta.assigned_to_name}
                  </p>
                )}
              </div>
            )}
          </div>
        )}

        {/* Fixed entity information */}

        {mode === "create" && isFixedEntity && (
          <div className="rounded-lg border bg-muted/30 p-3">
            <p className="text-xs text-muted-foreground">Related To</p>

            <p className="mt-1 text-sm font-medium">{fixedEntityType}</p>
          </div>
        )}

        {/* Priority + Due Date */}

        <div className="grid gap-6 md:grid-cols-2">
          <div className="space-y-2">
            <Label>Priority</Label>

            <Select
              value={priority}
              onValueChange={(value) => setPriority(value as TaskPriority)}
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>

              <SelectContent>
                <SelectItem value="LOW">Low</SelectItem>

                <SelectItem value="NORMAL">Normal</SelectItem>

                <SelectItem value="HIGH">High</SelectItem>

                <SelectItem value="URGENT">Urgent</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label>Due Date</Label>

            <Input
              type="datetime-local"
              value={dueDate}
              onChange={(event) => setDueDate(event.target.value)}
            />
          </div>
        </div>

        {/* Assigned To */}

        <div className="w-full max-w-sm space-y-2">
          <Label>Assign to</Label>

          <UserSelect
            value={assignedTo}
            canAssign={can(isEdit ? "tasks:update" : "tasks:create") || false}
            onChange={(user) => {
              setAssignedTo(user.id);
            }}
          />
        </div>

        {/* Actions */}

        <div className="flex justify-end gap-3 border-t pt-6">
          {onCancel && (
            <Button
              type="button"
              variant="outline"
              onClick={onCancel}
              disabled={loading}
            >
              Cancel
            </Button>
          )}

          <Button type="submit" disabled={loading}>
            {loading
              ? isEdit
                ? "Saving..."
                : "Creating..."
              : isEdit
                ? "Save Changes"
                : "Create Task"}
          </Button>
        </div>
      </form>

      {/* Record Picker */}

      {mode === "create" && !isFixedEntity && entityType !== "GENERAL" && (
        <RecordPickerDialog
          module={entityType}
          open={recordPickerOpen}
          onOpenChange={setRecordPickerOpen}
          onSelect={handleRecordSelect}
        />
      )}
    </>
  );
}
