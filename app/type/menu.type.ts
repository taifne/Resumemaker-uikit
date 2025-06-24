export type Menu = {
    _id: string;
    name: string;
    label: string; // <- make sure this is included
    icon?: string;
    path?: string;
    parent?: string;
    isActive?: boolean;
  };
  