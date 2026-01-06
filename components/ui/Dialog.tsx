import { useEffect, ReactNode } from "react";

interface DialogProps {
    open: boolean;
    onClose: () => void;
    children: ReactNode;
}

export default function Dialog({ open, onClose, children }: DialogProps) {
    useEffect(() => {
        function onKey(e: KeyboardEvent) {
            if (e.key === "Escape") onClose();
        }
        if (open) document.addEventListener("keydown", onKey);
        return () => document.removeEventListener("keydown", onKey);
    }, [open, onClose]);

    if (!open) return null;
    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
            <div className="bg-white rounded shadow-lg p-6 min-w-[320px] relative">
                <button
                    onClick={onClose}
                    className="absolute top-2 right-2 text-gray-400 hover:text-gray-700"
                    aria-label="Close"
                >
                    ×
                </button>
                {children}
            </div>
        </div>
    );
}
