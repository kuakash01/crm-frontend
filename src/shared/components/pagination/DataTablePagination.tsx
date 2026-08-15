"use client";

import { useState } from "react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

type DataTablePaginationProps = {
  total: number;
  limit: number;
  totalPages: number;
  currentPage: number;
  visiblePages: (number | "...")[];
  itemName?: string;
  onPageChange: (page: number) => void;
  onJump: (page: number) => void;
};

export default function DataTablePagination({
  total,
  limit,
  totalPages,
  currentPage,
  visiblePages,
  itemName = "records",
  onPageChange,
  onJump,
}: DataTablePaginationProps) {
  const [jumpPage, setJumpPage] = useState("");

  const start = total === 0 ? 0 : (currentPage - 1) * limit + 1;
  const end = Math.min(currentPage * limit, total);

  if (totalPages <= 1) return null; // Don't render pagination if there are no pages;

  return (
    <div className="flex flex-col gap-4 border-t pt-4 lg:flex-row lg:items-center lg:justify-between overflow-hidden">
      <p className="text-sm text-muted-foreground">
        Showing <span className="font-medium">{start}</span>–
        <span className="font-medium">{end}</span> of{" "}
        <span className="font-medium">{total}</span> {itemName}
      </p>

      <Pagination>
        <PaginationContent>
          <PaginationItem>
            <PaginationPrevious
              href="#"
              onClick={(e) => {
                e.preventDefault();
                onPageChange(currentPage - 1);
              }}
              className={
                currentPage === 1 ? "pointer-events-none opacity-50" : ""
              }
            />
          </PaginationItem>

          {visiblePages.map((item, index) => (
            <PaginationItem key={index}>
              {item === "..." ? (
                <PaginationEllipsis />
              ) : (
                <PaginationLink
                  href="#"
                  isActive={item === currentPage}
                  onClick={(e) => {
                    e.preventDefault();
                    onPageChange(item);
                  }}
                >
                  {item}
                </PaginationLink>
              )}
            </PaginationItem>
          ))}

          <PaginationItem>
            <PaginationNext
              href="#"
              onClick={(e) => {
                e.preventDefault();
                onPageChange(currentPage + 1);
              }}
              className={
                currentPage === totalPages
                  ? "pointer-events-none opacity-50"
                  : ""
              }
            />
          </PaginationItem>
        </PaginationContent>
      </Pagination>

      <div className="flex items-center gap-2">
        <span className="text-sm text-muted-foreground">Jump to</span>

        <Input
          type="number"
          min={1}
          max={totalPages}
          value={jumpPage}
          onChange={(e) => setJumpPage(e.target.value)}
          placeholder="1"
          className="h-9 w-20"
        />

        <Button
          size="sm"
          onClick={() => {
            onJump(Number(jumpPage));
            setJumpPage("");
          }}
        >
          Go
        </Button>
      </div>
    </div>
  );
}
