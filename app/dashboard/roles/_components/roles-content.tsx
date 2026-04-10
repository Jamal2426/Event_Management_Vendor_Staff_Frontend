"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Search, Shield, CheckCircle2, XCircle, Edit2, Trash2, MoreVertical } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle,
} from "@/components/ui/dialog";
import { useStaffPortalRoles, useDeleteStaffPortalRole } from "@/hooks/use-staff-portal";
import type { StaffPortalRole } from "@/hooks/use-staff-portal";
import { useStaffMe } from "@/hooks/use-staff-auth";

export default function RolesContent() {
  const router = useRouter();
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [roleToDelete, setRoleToDelete] = useState<StaffPortalRole | null>(null);

  const { data: staffData } = useStaffMe();
  const staffPermissions = new Set(staffData?.role?.permissions?.map((p) => p.slug) ?? []);
  const canEdit   = staffPermissions.has("roles.edit");
  const canDelete = staffPermissions.has("roles.delete");
  const canCreate = staffPermissions.has("roles.create");
  const hasActions = canEdit || canDelete;

  const { data, isLoading } = useStaffPortalRoles({ page, limit: 20, search });
  const deleteMutation = useDeleteStaffPortalRole();

  const roles = Array.isArray(data) ? data : [];

  return (
    <div className="h-[calc(100vh-86px)] overflow-y-auto px-6 pt-4 pb-10 custom-scrollbar">
      <div className="space-y-5 max-w-[1700px] mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-xl font-bold text-gray-800 dark:text-gray-100">Roles</h1>
            <p className="text-sm text-gray-500 mt-0.5">Staff roles and their permissions</p>
          </div>
          {canCreate && (
            <Button onClick={() => router.push("/dashboard/roles/create")} className="rounded-2xl h-10 px-5 font-semibold text-sm">
              + Add Role
            </Button>
          )}
        </div>

        {/* Search */}
        <div className="relative max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search roles..."
            value={search}
            onChange={(e) => { setSearch(e.target.value); setPage(1); }}
            className="pl-10 h-10 rounded-2xl border-gray-100 dark:border-gray-800"
          />
        </div>

        {/* Table */}
        <div className="bg-white dark:bg-[#1f2937] rounded-3xl border border-gray-100 dark:border-gray-800 shadow-[0_4px_20px_-4px_rgba(0,0,0,0.05)] overflow-hidden">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-50 dark:border-gray-800">
                <th className="text-left px-6 py-4 text-[11px] font-bold text-gray-400 uppercase tracking-widest">Role</th>
                <th className="text-left px-6 py-4 text-[11px] font-bold text-gray-400 uppercase tracking-widest">Description</th>
                <th className="text-left px-6 py-4 text-[11px] font-bold text-gray-400 uppercase tracking-widest">Permissions</th>
                <th className="text-left px-6 py-4 text-[11px] font-bold text-gray-400 uppercase tracking-widest">Status</th>
                {hasActions && (
                  <th className="text-right px-6 py-4 text-[11px] font-bold text-gray-400 uppercase tracking-widest">Actions</th>
                )}
              </tr>
            </thead>
            <tbody>
              {isLoading ? (
                <tr><td colSpan={hasActions ? 5 : 4} className="text-center py-12 text-sm text-gray-400">Loading...</td></tr>
              ) : roles.length === 0 ? (
                <tr>
                  <td colSpan={hasActions ? 5 : 4} className="text-center py-12">
                    <Shield className="mx-auto h-10 w-10 text-gray-300 mb-3" />
                    <p className="text-sm text-gray-400">No roles found.</p>
                  </td>
                </tr>
              ) : (
                roles.map((role) => (
                  <tr key={role.id} className="border-b border-gray-50 dark:border-gray-800 hover:bg-gray-50/50 dark:hover:bg-gray-800/30 transition-colors">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-9 h-9 rounded-xl bg-blue-50 dark:bg-blue-500/10 flex items-center justify-center">
                          <Shield size={16} className="text-blue-600" />
                        </div>
                        <span className="font-semibold text-sm text-gray-800 dark:text-gray-100">{role.name}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-500 dark:text-gray-400 max-w-xs truncate">
                      {role.description || "—"}
                    </td>
                    <td className="px-6 py-4">
                      <Badge variant="outline" className="text-[10px] font-bold border-purple-200 text-purple-600 bg-purple-50/50">
                        {role.permissions?.length ?? 0} permissions
                      </Badge>
                    </td>
                    <td className="px-6 py-4">
                      {role.is_active === 1 ? (
                        <span className="inline-flex items-center text-[11px] font-bold text-emerald-600 bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-100">
                          <CheckCircle2 size={12} className="mr-1" /> Active
                        </span>
                      ) : (
                        <span className="inline-flex items-center text-[11px] font-bold text-amber-600 bg-amber-50 px-2.5 py-1 rounded-full border border-amber-100">
                          <XCircle size={12} className="mr-1" /> Inactive
                        </span>
                      )}
                    </td>
                    {hasActions && (
                      <td className="px-6 py-4 text-right">
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon" className="h-8 w-8 rounded-lg">
                              <MoreVertical size={16} />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end" className="w-36">
                            {canEdit && (
                              <DropdownMenuItem onClick={() => router.push(`/dashboard/roles/edit/${role.id}`)}>
                                <Edit2 size={14} className="mr-2" /> Edit
                              </DropdownMenuItem>
                            )}
                            {canDelete && (
                              <DropdownMenuItem
                                onClick={() => setRoleToDelete(role)}
                                className="text-rose-600 focus:text-rose-600"
                              >
                                <Trash2 size={14} className="mr-2" /> Delete
                              </DropdownMenuItem>
                            )}
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </td>
                    )}
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Delete Dialog */}
      <Dialog open={!!roleToDelete} onOpenChange={(open) => { if (!open) setRoleToDelete(null); }}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Delete Role</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete &quot;{roleToDelete?.name}&quot;? Staff assigned to this role must be reassigned first.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setRoleToDelete(null)}>Cancel</Button>
            <Button
              variant="destructive"
              disabled={deleteMutation.isPending}
              onClick={() => {
                if (roleToDelete) {
                  deleteMutation.mutate(roleToDelete.id, { onSuccess: () => setRoleToDelete(null) });
                }
              }}
            >
              {deleteMutation.isPending ? "Deleting..." : "Delete"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
