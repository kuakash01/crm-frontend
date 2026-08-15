"use client";

import { useEffect, useState } from "react";
import { toast } from "sonner";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";

import { getNotes, createNote } from "../notes.service";

import { Note } from "../notes.types";

import { usePagination } from "@/shared/hooks/usePagination";
import DataTablePagination from "@/shared/components/pagination/DataTablePagination";

import { Badge } from "@/components/ui/badge";
import { NotebookPen, Clock3 } from "lucide-react";
import { formatDistanceToNow } from "date-fns";

interface NotesTabProps {
  entityType: "LEAD" | "CUSTOMER" | "DEAL";
  entityId: number;
}

export default function NotesTab({ entityType, entityId }: NotesTabProps) {
  const [notes, setNotes] = useState<Note[]>([]);

  const [loading, setLoading] = useState(true);

  const [pagination, setPagination] = useState({
    page: 1,
    limit: 10,
    total: 0,
    totalPages: 0,
  });

  const { currentPage, handlePageChange, handleJump, visiblePages } =
    usePagination({
      totalPages: pagination.totalPages,
    });

  const [creating, setCreating] = useState(false);

  const [newNote, setNewNote] = useState("");

  useEffect(() => {
    fetchNotes();
  }, [entityType, entityId, currentPage]);

  const fetchNotes = async () => {
    try {
      setLoading(true);

      const response = await getNotes(entityType, entityId, {
        page: currentPage,
        limit: pagination.limit,
      });
      console.log("response notes", response);
      setNotes(response.data);

      setPagination(response.pagination);
    } catch {
      toast.error("Failed to load notes");
    } finally {
      setLoading(false);
    }
  };

  const handleCreateNote = async () => {
    if (!newNote.trim()) {
      toast.error("Note cannot be empty");

      return;
    }

    try {
      setCreating(true);

      const note = await createNote(entityType, entityId, newNote);

      await fetchNotes();

      setNewNote("");

      toast.success("Note added");
    } catch {
      toast.error("Failed to add note");
    } finally {
      setCreating(false);
    }
  };

  if (loading) {
    return (
      <Card>
        <CardContent className="py-10 text-center">
          Loading notes...
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Notes</CardTitle>
      </CardHeader>

      <CardContent className="space-y-6">
        {/* Create Note */}
        <Card className="border-dashed">
          <CardHeader className="pb-3">
            <CardTitle className="text-lg">Add Note</CardTitle>
          </CardHeader>

          <CardContent className="space-y-4">
            <Textarea
              placeholder="Write an internal note..."
              value={newNote}
              onChange={(e) => setNewNote(e.target.value)}
              className="min-h-28 resize-none"
            />

            <div className="flex justify-end">
              <Button onClick={handleCreateNote} disabled={creating}>
                {creating ? "Adding..." : "Add Note"}
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Notes */}
        {notes.length === 0 ? (
          <Card>
            <CardContent className="flex flex-col items-center justify-center py-12">
              <NotebookPen className="mb-3 h-10 w-10 text-muted-foreground" />

              <h3 className="font-medium">No notes yet</h3>

              <p className="mt-1 text-sm text-muted-foreground">
                Add your first note to keep track of important information.
              </p>
            </CardContent>
          </Card>
        ) : (
          <>
            <div className="space-y-4">
              {notes.map((note) => (
                <Card
                  key={note.id}
                  className="transition-shadow hover:shadow-md"
                >
                  <CardContent className="space-y-4 pt-5">
                    <div className="flex items-start justify-between">
                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <p className="font-medium">{note.created_by_name}</p>

                          <Badge variant="outline">Note</Badge>
                        </div>

                        <div className="flex items-center gap-2 text-xs text-muted-foreground">
                          <Clock3 className="h-3.5 w-3.5" />

                          <span>
                            {formatDistanceToNow(new Date(note.created_at), {
                              addSuffix: true,
                            })}
                          </span>
                        </div>
                      </div>
                    </div>

                    <p className="whitespace-pre-wrap text-sm leading-6">
                      {note.note}
                    </p>
                  </CardContent>
                </Card>
              ))}
            </div>

            <DataTablePagination
              total={pagination.total}
              limit={pagination.limit}
              totalPages={pagination.totalPages}
              currentPage={currentPage}
              visiblePages={visiblePages}
              itemName="notes"
              onPageChange={handlePageChange}
              onJump={handleJump}
            />
          </>
        )}
      </CardContent>
    </Card>
  );
}
