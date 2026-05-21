// components/TagInputSection.tsx
import { useState } from "react";
import { motion } from "framer-motion";
import { Plus, Check, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface TagInputSectionProps {
    icon: React.ReactNode;
    label: string;
    tags: string[];
    placeholder?: string;
    onAdd: (value: string) => void;
    onRemove?: (value: string) => void;
}

export function TagInputSection({
    icon,
    label,
    tags,
    placeholder = "Nhập...",
    onAdd,
    onRemove,
}: TagInputSectionProps) {
    const [open, setOpen] = useState(false);
    const [input, setInput] = useState("");

    const handleAdd = () => {
        if (input.trim()) {
            onAdd(input.trim());
            setInput("");
        }
    };

    const handleCancel = () => {
        setInput("");
        setOpen(false);
    };

    return (
        <div className="flex flex-col mt-4">
            <div className="flex items-center gap-1 text-accent">
                {icon}
                <span className="font-bold uppercase tracking-widest">{label}</span>
            </div>

            <div className="flex flex-wrap gap-2 mt-2">
                {tags.map((tag) => (
                    <div
                        key={tag}
                        className="flex items-center bg-secondary px-3 py-1 rounded-full gap-2"
                    >
                        <span className="text-muted text-sm">{tag}</span>
                        {onRemove && (
                            <X
                                onClick={() => onRemove(tag)}
                                className="text-muted p-1 hover:text-red-500 rounded-full cursor-pointer"
                                size={18}
                            />
                        )}
                    </div>
                ))}

                {open ? (
                    <motion.div
                        key="input-wrapper"
                        layout
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.95 }}
                        transition={{ type: "spring", stiffness: 350, damping: 25 }}
                        className="flex items-center border rounded-lg"
                    >
                        <Input
                            type="text"
                            className="px-3 py-1  rounded-full text-sm bg-secondary/20 focus:border-none focus-visible:ring-0"
                            placeholder={placeholder}
                            autoFocus
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            onKeyDown={(e) => e.key === "Enter" && handleAdd()}
                        />
                        <div className="flex items-center border-l px-1">
                            <Check
                                onClick={handleAdd}
                                className="text-green-500 p-2 hover:bg-green-100/50 rounded-2xl cursor-pointer"
                                size={28}
                            />
                            <X
                                onClick={handleCancel}
                                className="text-red-500 p-2 hover:bg-red-100/50 rounded-2xl cursor-pointer"
                                size={28}
                            />
                        </div>
                    </motion.div>
                ) : (
                    <Button
                        onClick={() => setOpen(true)}
                        variant="outline"
                        size="sm"
                        className="rounded-full border border-dashed border-accent bg-accent/10 text-accent hover:bg-accent/20 cursor-pointer"
                    >
                        <Plus size={16} />
                        <span className="ml-1">Thêm</span>
                    </Button>
                )}
            </div>
        </div>
    );
}