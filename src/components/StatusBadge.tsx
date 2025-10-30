interface StatusBadgeProps {
  status: "active" | "inactive" | "warning" | "error";
  text?: string;
}

export const StatusBadge = ({ status, text }: StatusBadgeProps) => {
  const statusConfig = {
    active: {
      bg: "bg-success/10",
      text: "text-success",
      dot: "bg-success",
      label: text || "Active",
    },
    inactive: {
      bg: "bg-muted",
      text: "text-muted-foreground",
      dot: "bg-muted-foreground",
      label: text || "Inactive",
    },
    warning: {
      bg: "bg-warning/10",
      text: "text-warning",
      dot: "bg-warning",
      label: text || "Warning",
    },
    error: {
      bg: "bg-destructive/10",
      text: "text-destructive",
      dot: "bg-destructive",
      label: text || "Error",
    },
  };

  const config = statusConfig[status];

  return (
    <span className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-medium ${config.bg} ${config.text}`}>
      <span className={`h-2 w-2 rounded-full ${config.dot} animate-pulse`} />
      {config.label}
    </span>
  );
};
