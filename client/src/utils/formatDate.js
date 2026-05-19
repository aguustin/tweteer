export const formatRelativeTime = (dateInput) => {
    if (!dateInput) return "";
    const date = new Date(dateInput);
    if (isNaN(date.getTime())) return String(dateInput);

    const now = Date.now();
    const diff = now - date.getTime();
    const seconds = Math.floor(diff / 1000);

    if (seconds < 60)  return "ahora";
    if (seconds < 3600) return `hace ${Math.floor(seconds / 60)}m`;
    if (seconds < 86400) return `hace ${Math.floor(seconds / 3600)}h`;
    if (seconds < 604800) return `hace ${Math.floor(seconds / 86400)}d`;

    return date.toLocaleDateString("es-AR", { day: "numeric", month: "short" });
};
