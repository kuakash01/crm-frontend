"use client";

import { useEffect, useState } from "react";
import { toast } from "sonner";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";

import {
  getNotes,
  createNote,
} from "../notes.service";

import { Note } from "../notes.types";

interface NotesTabProps {
  entityType: "LEAD" | "CUSTOMER" | "DEAL";
  entityId: number;
}

export default function NotesTab({
  entityType,
  entityId,
}: NotesTabProps) {
  const [notes, setNotes] = useState<Note[]>([]);

  const [loading, setLoading] =
    useState(true);

  const [creating, setCreating] =
    useState(false);

  const [newNote, setNewNote] =
    useState("");

  useEffect(() => {
    fetchNotes();
  }, [entityType, entityId]);

  const fetchNotes = async () => {

    try {

      const data =
        await getNotes(
          entityType,
          entityId
        );

      setNotes(data);

    } catch {

      toast.error(
        "Failed to load notes"
      );

    } finally {

      setLoading(false);

    }

  };

  const handleCreateNote =
    async () => {

      if (!newNote.trim()) {

        toast.error(
          "Note cannot be empty"
        );

        return;

      }

      try {

        setCreating(true);

        const note =
          await createNote(
            entityType,
            entityId,
            newNote
          );

        setNotes(prev => [
          note,
          ...prev,
        ]);

        setNewNote("");

        toast.success(
          "Note added"
        );

      } catch {

        toast.error(
          "Failed to add note"
        );

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
        <CardTitle>
          Notes
        </CardTitle>
      </CardHeader>

      <CardContent className="space-y-6">

        <div className="space-y-3">

          <Textarea
            placeholder="Write a note..."
            value={newNote}
            onChange={(e) =>
              setNewNote(
                e.target.value
              )
            }
          />

          <div className="flex justify-end">

            <Button
              onClick={
                handleCreateNote
              }
              disabled={
                creating
              }
            >
              {creating
                ? "Adding..."
                : "Add Note"}
            </Button>

          </div>

        </div>

        <div className="space-y-4">

          {notes.length === 0 ? (

            <p className="text-sm text-muted-foreground">
              No notes found.
            </p>

          ) : (

            notes.map(note => (

              <Card
                key={note.id}
              >
                <CardContent className="space-y-3 pt-4">

                  <div>

                    <p className="font-medium">
                      {
                        note.created_by_name
                      }
                    </p>

                    <p className="text-xs text-muted-foreground">
                      {new Date(
                        note.created_at
                      ).toLocaleString()}
                    </p>

                  </div>

                  <p className="whitespace-pre-wrap">
                    {note.note}
                  </p>

                </CardContent>
              </Card>

            ))

          )}

        </div>

      </CardContent>
    </Card>
  );

}