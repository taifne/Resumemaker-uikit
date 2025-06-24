"use client";
import React, { useEffect, useState } from "react";
import { TrashIcon } from "../../components/Icons";
import {
  useAllMenus,
  useCreateMenu,
  useDeleteMenu,
} from "../../hooks/useMenuMutation";
import {
  useAllRoles,
  useCreateRole,
  useDeleteRole,
  useRole,
  useUpdateMenusInRole,
} from "../../hooks/useRoleMutation";
import Button from "../../components/Button";
import { Input } from "../../components/Input";

export default function ManageMenusPage() {
  const { data: menus, isLoading: loadingMenus } = useAllMenus();
  const { data: roles, isLoading: loadingRoles } = useAllRoles();
  const deleteMenu = useDeleteMenu();
  const createMenu = useCreateMenu();
  const createRole = useCreateRole();
  const deleteRole = useDeleteRole();
  const updateMenusInRole = useUpdateMenusInRole();
  const [selectedRoleId, setSelectedRoleId] = useState<string | null>(null);
  const { data: selectedRoleData } = useRole(selectedRoleId || "");
  const [newRoleName, setNewRoleName] = useState("");
  const [newMenuName, setNewMenuName] = useState("");
  const [newMenuLabel, setNewMenuLabel] = useState("");

  const [assignedMenuIds, setAssignedMenuIds] = useState<string[]>([]);

  useEffect(() => {
    if (selectedRoleData?.menus) {
      setAssignedMenuIds(selectedRoleData.menus.map((m: any) => m._id));
    }
  }, [selectedRoleData]);

  const handleCheckboxChange = (menuId: string) => {
    setAssignedMenuIds((prev) =>
      prev.includes(menuId)
        ? prev.filter((id) => id !== menuId)
        : [...prev, menuId]
    );
  };

  const handleSaveMenus = () => {
    if (!selectedRoleId) return;
    updateMenusInRole.mutate({
      roleId: selectedRoleId,
      menuIds: assignedMenuIds,
    });
  };
  const handleCreateMenu = () => {
    if (!newMenuName.trim() || !newMenuLabel.trim()) return;
    createMenu.mutate({ name: newMenuName, label: newMenuLabel });
    setNewMenuName("");
    setNewMenuLabel("");
  };
  const handleCreateRole = () => {
    if (!newRoleName.trim()) return;
    createRole.mutate({ name: newRoleName });
    setNewRoleName("");
  };
  const handleDeleteRole = (id: string) => {
    if (confirm("Are you sure you want to delete this role?")) {
      deleteRole.mutate(id);
      if (selectedRoleId === id) setSelectedRoleId(null);
    }
  };

  return (
    <div className="flex gap-4 p-6 w-full">
      {/* Menus list */}
      <div className="w-1/3 space-y-4 ">
        <div className="space-y-2 h-48 bg-blue-100 rounded p-2">
          {" "}
          <h2 className="text-xl font-semibold">Menus</h2>
          <Input
            placeholder="Menu name"
            value={newMenuName}
            onChange={setNewMenuName}
          />
          <Input
            placeholder="Menu label"
            value={newMenuLabel}
            onChange={setNewMenuLabel}
          />
          <Button onClick={handleCreateMenu}>Create Menu</Button>
        </div>

        {loadingMenus ? (
          <p>Loading menus...</p>
        ) : (
          <ul className="space-y-2">
            {menus?.map((menu) => (
              <li
                key={menu._id}
                className="flex justify-between items-center p-2 border rounded"
              >
                <span>{menu.label}</span>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => deleteMenu.mutate(menu._id)}
                >
                  <TrashIcon className="w-4 h-4 text-red-500" />
                </Button>
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* Role management */}
      <div className=" space-y-4 w-1/3 ">
        <div className="h-48 bg-blue-100 rounded p-2">
          <h2 className="text-xl font-semibold">Roles</h2>

          <div className="flex gap-2 items-center">
            <Input
              placeholder="Enter new role name"
              value={newRoleName}
              onChange={setNewRoleName}
            />
            <Button onClick={handleCreateRole}>Create Role</Button>
          </div>
        </div>

        {loadingRoles ? (
          <p>Loading roles...</p>
        ) : (
          <ul className="space-y-1">
            {roles?.map((role) => (
              <li
                key={role._id}
                className={`p-2 border rounded cursor-pointer flex justify-between items-center ${
                  selectedRoleId === role._id
                    ? "bg-blue-100 dark:bg-blue-900"
                    : ""
                }`}
                onClick={() => setSelectedRoleId(role._id)}
              >
                <span>{role.name}</span>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleDeleteRole(role._id);
                  }}
                >
                  <TrashIcon className="w-4 h-4 text-red-500" />
                </Button>
              </li>
            ))}
          </ul>
        )}
      </div>

      <div className="space-y-4 w-1/3">
        <div className="h-48 bg-blue-100 rounded p-2">
          <h2 className="text-xl font-semibold">Acess BASE Role</h2>
        </div>

        {selectedRoleId && menus && (
          <div className="mt-6">
            <h3 className="font-medium mb-2">Assign Menus to Role</h3>
            <div className="space-y-1 ">
              {menus.map((menu) => (
                <label key={menu._id} className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={assignedMenuIds.includes(menu._id)}
                    onChange={() => handleCheckboxChange(menu._id)}
                  />
                  <span>{menu.label}</span>
                </label>
              ))}
            </div>
            <Button className="mt-4" onClick={handleSaveMenus}>
              Save Changes
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
