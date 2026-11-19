"use client";

import React, { useState, useMemo } from "react";
import {
  Mail,
  Phone,
  Calendar,
  Building,
  Search,
  CheckCircle2,
  Clock,
  Trash2,
  Eye,
  ExternalLink,
  Download,
  MessageSquare,
  AlertCircle,
  RefreshCw,
  User,
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

export interface ContactInquiry {
  contact_id: number;
  name: string;
  email: string;
  phone: string | null;
  service_id: number | null;
  status: string;
  submitted_at: Date | string;
  responded_at: Date | string | null;
  notes: string | null;
}

interface ContactPageClientProps {
  initialContacts: ContactInquiry[];
}

export default function ContactPageClient({ initialContacts }: ContactPageClientProps) {
  const router = useRouter();
  const [contacts, setContacts] = useState<ContactInquiry[]>(initialContacts);
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("ALL");
  const [selectedContact, setSelectedContact] = useState<ContactInquiry | null>(null);
  const [isDetailOpen, setIsDetailOpen] = useState(false);
  const [isDeleting, setIsDeleting] = useState<number | null>(null);
  const [isUpdatingStatus, setIsUpdatingStatus] = useState<number | null>(null);

  // Helper to parse company and message from notes
  const parseNotes = (notes: string | null) => {
    if (!notes) return { company: null, service: null, message: null };
    const lines = notes.split("\n\n");
    let company: string | null = null;
    let service: string | null = null;
    const messageParts: string[] = [];

    for (const line of lines) {
      if (line.startsWith("Company:")) {
        company = line.replace("Company:", "").trim();
      } else if (line.startsWith("Selected Service:")) {
        service = line.replace("Selected Service:", "").trim();
      } else {
        messageParts.push(line);
      }
    }

    return {
      company,
      service,
      message: messageParts.join("\n\n").trim() || notes,
    };
  };

  // Filtered contacts
  const filteredContacts = useMemo(() => {
    return contacts.filter((contact) => {
      // Status filter
      if (statusFilter !== "ALL") {
        const contactStatus = (contact.status || "NEW").toUpperCase();
        if (contactStatus !== statusFilter) return false;
      }

      // Search filter
      if (searchQuery.trim()) {
        const query = searchQuery.toLowerCase().trim();
        const nameMatch = contact.name?.toLowerCase().includes(query);
        const emailMatch = contact.email?.toLowerCase().includes(query);
        const phoneMatch = contact.phone?.toLowerCase().includes(query);
        const notesMatch = contact.notes?.toLowerCase().includes(query);
        return nameMatch || emailMatch || phoneMatch || notesMatch;
      }

      return true;
    });
  }, [contacts, searchQuery, statusFilter]);

  // Statistics
  const stats = useMemo(() => {
    const total = contacts.length;
    const newCount = contacts.filter((c) => (c.status || "NEW").toUpperCase() === "NEW").length;
    const contactedCount = contacts.filter((c) => (c.status || "").toUpperCase() === "CONTACTED").length;
    const resolvedCount = contacts.filter((c) => (c.status || "").toUpperCase() === "RESOLVED").length;
    return { total, newCount, contactedCount, resolvedCount };
  }, [contacts]);

  // Handle status update
  const handleUpdateStatus = async (contact_id: number, newStatus: string) => {
    setIsUpdatingStatus(contact_id);
    try {
      const res = await fetch("/api/contact", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ contact_id, status: newStatus }),
      });

      if (!res.ok) {
        const err = await res.json();
        throw new Error(err?.error || "Failed to update status");
      }

      setContacts((prev) =>
        prev.map((c) =>
          c.contact_id === contact_id
            ? { ...c, status: newStatus, responded_at: newStatus === "RESOLVED" || newStatus === "CONTACTED" ? new Date().toISOString() : c.responded_at }
            : c
        )
      );

      if (selectedContact && selectedContact.contact_id === contact_id) {
        setSelectedContact((prev) => (prev ? { ...prev, status: newStatus } : null));
      }

      toast.success(`Inquiry marked as ${newStatus}`);
    } catch (error: any) {
      toast.error(error.message || "Failed to update status");
    } finally {
      setIsUpdatingStatus(null);
    }
  };

  // Handle delete inquiry
  const handleDeleteContact = async (contact_id: number) => {
    if (!window.confirm("Are you sure you want to permanently delete this inquiry?")) {
      return;
    }

    setIsDeleting(contact_id);
    try {
      const res = await fetch("/api/contact", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ contact_id }),
      });

      if (!res.ok) {
        const err = await res.json();
        throw new Error(err?.error || "Failed to delete inquiry");
      }

      setContacts((prev) => prev.filter((c) => c.contact_id !== contact_id));
      if (selectedContact?.contact_id === contact_id) {
        setIsDetailOpen(false);
        setSelectedContact(null);
      }
      toast.success("Inquiry deleted successfully");
    } catch (error: any) {
      toast.error(error.message || "Failed to delete inquiry");
    } finally {
      setIsDeleting(null);
    }
  };

  // Export to CSV
  const handleExportCSV = () => {
    if (contacts.length === 0) {
      toast.error("No inquiries to export");
      return;
    }

    const headers = ["ID", "Date", "Name", "Email", "Phone", "Status", "Notes"];
    const rows = filteredContacts.map((c) => [
      c.contact_id,
      new Date(c.submitted_at).toLocaleDateString(),
      `"${(c.name || "").replace(/"/g, '""')}"`,
      `"${(c.email || "").replace(/"/g, '""')}"`,
      `"${(c.phone || "").replace(/"/g, '""')}"`,
      c.status || "NEW",
      `"${(c.notes || "").replace(/"/g, '""')}"`,
    ]);

    const csvContent = "data:text/csv;charset=utf-8," + [headers.join(","), ...rows.map((e) => e.join(","))].join("\n");
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `softechsol_inquiries_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    toast.success("Export downloaded successfully");
  };

  const getStatusBadge = (status: string) => {
    const s = (status || "NEW").toUpperCase();
    switch (s) {
      case "NEW":
        return <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-200 border-blue-200">New</Badge>;
      case "CONTACTED":
        return <Badge className="bg-amber-100 text-amber-800 hover:bg-amber-200 border-amber-200">Contacted</Badge>;
      case "RESOLVED":
        return <Badge className="bg-emerald-100 text-emerald-800 hover:bg-emerald-200 border-emerald-200">Resolved</Badge>;
      case "ARCHIVED":
        return <Badge className="bg-gray-100 text-gray-700 hover:bg-gray-200 border-gray-200">Archived</Badge>;
      default:
        return <Badge variant="secondary">{status}</Badge>;
    }
  };

  return (
    <div className="space-y-6">
      {/* KPI Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card
          onClick={() => setStatusFilter("ALL")}
          className={`cursor-pointer transition-all border ${
            statusFilter === "ALL" ? "ring-2 ring-blue-500 border-blue-300 bg-blue-50/20" : "hover:border-gray-300"
          }`}
        >
          <CardContent className="p-4 flex items-center justify-between">
            <div>
              <p className="text-xs font-medium text-gray-500">Total Leads</p>
              <h3 className="text-2xl font-bold text-gray-900 mt-1">{stats.total}</h3>
            </div>
            <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-600">
              <Mail className="w-5 h-5" />
            </div>
          </CardContent>
        </Card>

        <Card
          onClick={() => setStatusFilter("NEW")}
          className={`cursor-pointer transition-all border ${
            statusFilter === "NEW" ? "ring-2 ring-blue-500 border-blue-300 bg-blue-50/20" : "hover:border-gray-300"
          }`}
        >
          <CardContent className="p-4 flex items-center justify-between">
            <div>
              <p className="text-xs font-medium text-gray-500">New / Unread</p>
              <h3 className="text-2xl font-bold text-blue-600 mt-1">{stats.newCount}</h3>
            </div>
            <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-600">
              <Clock className="w-5 h-5" />
            </div>
          </CardContent>
        </Card>

        <Card
          onClick={() => setStatusFilter("CONTACTED")}
          className={`cursor-pointer transition-all border ${
            statusFilter === "CONTACTED" ? "ring-2 ring-amber-500 border-amber-300 bg-amber-50/20" : "hover:border-gray-300"
          }`}
        >
          <CardContent className="p-4 flex items-center justify-between">
            <div>
              <p className="text-xs font-medium text-gray-500">Contacted / In Progress</p>
              <h3 className="text-2xl font-bold text-amber-600 mt-1">{stats.contactedCount}</h3>
            </div>
            <div className="w-10 h-10 rounded-full bg-amber-100 flex items-center justify-center text-amber-600">
              <MessageSquare className="w-5 h-5" />
            </div>
          </CardContent>
        </Card>

        <Card
          onClick={() => setStatusFilter("RESOLVED")}
          className={`cursor-pointer transition-all border ${
            statusFilter === "RESOLVED" ? "ring-2 ring-emerald-500 border-emerald-300 bg-emerald-50/20" : "hover:border-gray-300"
          }`}
        >
          <CardContent className="p-4 flex items-center justify-between">
            <div>
              <p className="text-xs font-medium text-gray-500">Resolved</p>
              <h3 className="text-2xl font-bold text-emerald-600 mt-1">{stats.resolvedCount}</h3>
            </div>
            <div className="w-10 h-10 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-600">
              <CheckCircle2 className="w-5 h-5" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Control & Search Bar */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 bg-white p-4 rounded-xl border border-gray-200 shadow-sm">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <Input
            placeholder="Search leads by name, email, phone, company..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-9 h-10"
          />
        </div>

        <div className="flex items-center gap-2 flex-wrap">
          <div className="inline-flex rounded-lg border border-gray-200 bg-gray-50 p-1">
            {["ALL", "NEW", "CONTACTED", "RESOLVED"].map((status) => (
              <button
                key={status}
                onClick={() => setStatusFilter(status)}
                className={`px-3 py-1.5 text-xs font-medium rounded-md transition-all ${
                  statusFilter === status
                    ? "bg-white text-gray-900 shadow-sm"
                    : "text-gray-600 hover:text-gray-900"
                }`}
              >
                {status === "ALL" ? "All" : status.charAt(0) + status.slice(1).toLowerCase()}
              </button>
            ))}
          </div>

          <Button
            variant="outline"
            size="sm"
            onClick={handleExportCSV}
            className="h-9 gap-1.5 text-xs text-gray-700"
          >
            <Download className="w-3.5 h-3.5" /> Export CSV
          </Button>

          <Button
            variant="outline"
            size="sm"
            onClick={() => router.refresh()}
            className="h-9 gap-1.5 text-xs text-gray-700"
          >
            <RefreshCw className="w-3.5 h-3.5" /> Refresh
          </Button>
        </div>
      </div>

      {/* Inquiries Table */}
      <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-50/80 border-b border-gray-200 text-xs font-semibold text-gray-600 uppercase tracking-wider">
                <th className="py-3.5 px-4">Date</th>
                <th className="py-3.5 px-4">Client / Company</th>
                <th className="py-3.5 px-4">Contact Info</th>
                <th className="py-3.5 px-4">Service Interest</th>
                <th className="py-3.5 px-4">Status</th>
                <th className="py-3.5 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 text-sm">
              {filteredContacts.length === 0 ? (
                <tr>
                  <td colSpan={6} className="py-12 text-center text-gray-500">
                    <div className="flex flex-col items-center justify-center">
                      <AlertCircle className="w-8 h-8 text-gray-400 mb-2" />
                      <p className="font-medium text-gray-700">No contact inquiries found</p>
                      <p className="text-xs text-gray-500 mt-1">
                        {searchQuery ? "Try adjusting your search criteria" : "New submissions will appear here automatically"}
                      </p>
                    </div>
                  </td>
                </tr>
              ) : (
                filteredContacts.map((contact) => {
                  const { company, service, message } = parseNotes(contact.notes);
                  const dateStr = new Date(contact.submitted_at).toLocaleDateString("en-US", {
                    month: "short",
                    day: "numeric",
                    year: "numeric",
                  });

                  return (
                    <tr
                      key={contact.contact_id}
                      className="hover:bg-blue-50/30 transition-colors cursor-pointer group"
                      onClick={() => {
                        setSelectedContact(contact);
                        setIsDetailOpen(true);
                      }}
                    >
                      {/* Date */}
                      <td className="py-3.5 px-4 text-xs text-gray-500 whitespace-nowrap">
                        <div className="flex items-center gap-1.5">
                          <Calendar className="w-3.5 h-3.5 text-gray-400" />
                          <span>{dateStr}</span>
                        </div>
                      </td>

                      {/* Name & Company */}
                      <td className="py-3.5 px-4">
                        <div className="font-semibold text-gray-900 flex items-center gap-1.5">
                          <span>{contact.name}</span>
                        </div>
                        {company && (
                          <div className="text-xs text-gray-500 flex items-center gap-1 mt-0.5">
                            <Building className="w-3 h-3 text-gray-400" />
                            <span>{company}</span>
                          </div>
                        )}
                      </td>

                      {/* Contact Info */}
                      <td className="py-3.5 px-4">
                        <div className="text-xs text-gray-700 flex items-center gap-1.5">
                          <Mail className="w-3.5 h-3.5 text-blue-600 shrink-0" />
                          <a
                            href={`mailto:${contact.email}`}
                            onClick={(e) => e.stopPropagation()}
                            className="hover:underline hover:text-blue-600"
                          >
                            {contact.email}
                          </a>
                        </div>
                        {contact.phone && (
                          <div className="text-xs text-gray-500 flex items-center gap-1.5 mt-1">
                            <Phone className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                            <a
                              href={`tel:${contact.phone}`}
                              onClick={(e) => e.stopPropagation()}
                              className="hover:underline hover:text-emerald-600"
                            >
                              {contact.phone}
                            </a>
                          </div>
                        )}
                      </td>

                      {/* Service Interest */}
                      <td className="py-3.5 px-4">
                        <span className="text-xs font-medium text-gray-700 bg-gray-100 px-2.5 py-1 rounded-md">
                          {service || "General Inquiry"}
                        </span>
                      </td>

                      {/* Status */}
                      <td className="py-3.5 px-4" onClick={(e) => e.stopPropagation()}>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <button
                              disabled={isUpdatingStatus === contact.contact_id}
                              className="focus:outline-none"
                            >
                              {getStatusBadge(contact.status)}
                            </button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="start" className="w-36">
                            <DropdownMenuItem onClick={() => handleUpdateStatus(contact.contact_id, "NEW")}>
                              <span className="w-2 h-2 rounded-full bg-blue-500 mr-2" /> Mark as New
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={() => handleUpdateStatus(contact.contact_id, "CONTACTED")}>
                              <span className="w-2 h-2 rounded-full bg-amber-500 mr-2" /> Mark Contacted
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={() => handleUpdateStatus(contact.contact_id, "RESOLVED")}>
                              <span className="w-2 h-2 rounded-full bg-emerald-500 mr-2" /> Mark Resolved
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={() => handleUpdateStatus(contact.contact_id, "ARCHIVED")}>
                              <span className="w-2 h-2 rounded-full bg-gray-400 mr-2" /> Archive
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </td>

                      {/* Actions */}
                      <td className="py-3.5 px-4 text-right whitespace-nowrap" onClick={(e) => e.stopPropagation()}>
                        <div className="flex items-center justify-end gap-1">
                          <Button
                            variant="ghost"
                            size="sm"
                            className="h-8 w-8 p-0 text-gray-600 hover:text-blue-600 hover:bg-blue-50"
                            onClick={() => {
                              setSelectedContact(contact);
                              setIsDetailOpen(true);
                            }}
                            title="View inquiry details"
                          >
                            <Eye className="w-4 h-4" />
                          </Button>

                          <Button
                            variant="ghost"
                            size="sm"
                            disabled={isDeleting === contact.contact_id}
                            className="h-8 w-8 p-0 text-gray-500 hover:text-rose-600 hover:bg-rose-50"
                            onClick={() => handleDeleteContact(contact.contact_id)}
                            title="Delete inquiry"
                          >
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </div>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Detail Dialog */}
      <Dialog open={isDetailOpen} onOpenChange={setIsDetailOpen}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          {selectedContact && (() => {
            const { company, service, message } = parseNotes(selectedContact.notes);
            const dateStr = new Date(selectedContact.submitted_at).toLocaleString("en-US", {
              dateStyle: "medium",
              timeStyle: "short",
            });

            return (
              <>
                <DialogHeader className="border-b pb-4">
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <DialogTitle className="text-xl font-bold text-gray-900">
                        {selectedContact.name}
                      </DialogTitle>
                      {company && (
                        <p className="text-sm font-medium text-blue-600 mt-0.5 flex items-center gap-1">
                          <Building className="w-4 h-4" /> {company}
                        </p>
                      )}
                    </div>
                    {getStatusBadge(selectedContact.status)}
                  </div>
                  <DialogDescription className="text-xs text-gray-500 mt-2 flex items-center gap-1.5">
                    <Calendar className="w-3.5 h-3.5" /> Submitted on {dateStr}
                  </DialogDescription>
                </DialogHeader>

                <div className="space-y-5 py-4 text-sm">
                  {/* Contact Channels */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 p-3 bg-gray-50 rounded-lg border border-gray-100">
                    <div>
                      <span className="text-xs text-gray-500 block">Email Address</span>
                      <a
                        href={`mailto:${selectedContact.email}`}
                        className="font-medium text-blue-600 hover:underline flex items-center gap-1 mt-0.5"
                      >
                        <Mail className="w-3.5 h-3.5" /> {selectedContact.email}
                      </a>
                    </div>
                    {selectedContact.phone && (
                      <div>
                        <span className="text-xs text-gray-500 block">Phone / WhatsApp</span>
                        <a
                          href={`tel:${selectedContact.phone}`}
                          className="font-medium text-emerald-600 hover:underline flex items-center gap-1 mt-0.5"
                        >
                          <Phone className="w-3.5 h-3.5" /> {selectedContact.phone}
                        </a>
                      </div>
                    )}
                  </div>

                  {/* Selected Service */}
                  {service && (
                    <div>
                      <span className="text-xs font-semibold text-gray-500 uppercase tracking-wide block mb-1">
                        Service of Interest
                      </span>
                      <div className="p-3 bg-blue-50/60 border border-blue-100 rounded-lg text-blue-900 font-medium">
                        {service}
                      </div>
                    </div>
                  )}

                  {/* Message Body */}
                  <div>
                    <span className="text-xs font-semibold text-gray-500 uppercase tracking-wide block mb-1">
                      Inquiry Message
                    </span>
                    <div className="p-4 bg-gray-50 border border-gray-200 rounded-lg whitespace-pre-wrap leading-relaxed text-gray-800">
                      {message || "No message body provided."}
                    </div>
                  </div>
                </div>

                <DialogFooter className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-2 border-t pt-4">
                  <div className="flex items-center gap-2">
                    <span className="text-xs text-gray-500">Update Status:</span>
                    <select
                      value={selectedContact.status || "NEW"}
                      onChange={(e) => handleUpdateStatus(selectedContact.contact_id, e.target.value)}
                      className="text-xs border rounded-md px-2.5 py-1.5 bg-white font-medium text-gray-700"
                    >
                      <option value="NEW">New</option>
                      <option value="CONTACTED">Contacted</option>
                      <option value="RESOLVED">Resolved</option>
                      <option value="ARCHIVED">Archived</option>
                    </select>
                  </div>

                  <div className="flex items-center gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setIsDetailOpen(false)}
                    >
                      Close
                    </Button>
                    <Button
                      size="sm"
                      asChild
                      className="bg-blue-600 hover:bg-blue-700 text-white gap-1.5"
                    >
                      <a href={`mailto:${selectedContact.email}?subject=Re: Your inquiry with Softech Solutions`}>
                        <Mail className="w-4 h-4" /> Reply via Email
                      </a>
                    </Button>
                  </div>
                </DialogFooter>
              </>
            );
          })()}
        </DialogContent>
      </Dialog>
    </div>
  );
}
