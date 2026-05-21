"use client"


import { Drawer, DrawerContent, DrawerHeader, DrawerTitle } from "@/components/ui/drawer"
import { useGetWordByIdQuery, useUpdateWordMutation, WordType } from "@/store/api/wordApi"
import { BookOpenCheck, Check, MessageSquareText, MousePointer2, Plus, Quote, Speaker, Volume2, X } from "lucide-react"
import { Button } from "../ui/button"
import { useState } from "react"
import { Input } from "../ui/input"
import { motion } from "motion/react"
import { TagInputSection } from "./tagInputSection"

interface WordDrawerProps {
    word: WordType | null
    open: boolean
    onClose: () => void
}



export function WordDetail({ word, open, onClose }: WordDrawerProps) {

    const [updateWord] = useUpdateWordMutation()

    const { data: currentWord, isLoading: isCurrentWordLoading } = useGetWordByIdQuery(
        { wordId: word?.id || "", categoryId: word?.categoryId || "" },
        { skip: !word?.id || !open }
    )


    const handleUpdateCollocation = async ({ add, remove, }: { add?: string; remove?: string; }) => {
        if (add && !add.trim()) return;
        try {
            await updateWord({
                wordId: word?.id || "",
                categoryId: word?.categoryId || "",
                ...(add && { addCollocations: [add] }),
                ...(remove && { removeCollocations: [remove] }),
            });
        } catch (error) {
            console.error("Failed to update collocation:", error);
        }
    };
    const handleUpdateSynonym = async ({ add, remove, }: { add?: string; remove?: string; }) => {
        if (add && !add.trim()) return;
        try {
            await updateWord({
                wordId: word?.id || "",
                categoryId: word?.categoryId || "",
                ...(add && { addSynonyms: [add] }),
                ...(remove && { removeSynonyms: [remove] }),
            });
        } catch (error) {
            console.error("Failed to update synonym:", error);
        }
    };
    return (
        <Drawer direction="right" open={open} onOpenChange={(v) => !v && onClose()}>
            <DrawerContent >
                <DrawerHeader className="relative">
                    <div className="flex items-center gap-2">

                        <span className="text-sm bg-accent px-2 rounded text-card ">{currentWord?.partsofSpeech}</span>
                        <p className="text-muted-foreground italic text-md tracking-wider">{currentWord?.pronunciation}</p>
                    </div>
                    <DrawerTitle className="text-5xl font-bold text-accent font-serif tracking-tighter flex items-center gap-4 mt-2 italic">
                        {currentWord?.word}
                        <Volume2 className="text-muted-foreground cursor-pointer hover:text-accent transition-colors duration-150" />
                    </DrawerTitle>
                    <X onClick={onClose} className="absolute right-4 top-0 opacity-70 rounded-full hover:opacity-60 hover:border cursor-pointer hover:scale-75 transition-all duration-75" />
                </DrawerHeader>

                <div className="flex flex-col   mt-10 gap-2">
                    <div className="flex items-center gap-1  text-accent">
                        <Quote />
                        <span className="font-bold uppercase tracking-widest">Meaning</span>
                    </div>

                    <div className="p-2 py-4 border-l-3 border-accent italic rounded-sm tracking-wider font-lora font-semibold ">
                        {currentWord?.meaning}
                    </div>

                </div>

                <div className="mt-10 flex flex-col gap-2 border-b pb-10">
                    <div className="flex items-center gap-1  text-accent">
                        <BookOpenCheck size={16} className="" />
                        <span className="font-bold uppercase ">Example</span>

                    </div>
                    {currentWord && currentWord.example && currentWord.example.length > 0 ? currentWord.example.map((item, index) => (
                        <p key={index} className="tracking-wider italic  font-semibold font-lora rounded-lg w-full ">
                            - {item}
                        </p>
                    )) : ""}
                </div>

                <div className="border-b pb-10">
                    <TagInputSection
                        icon={<MousePointer2 size={16} />}
                        label="Collocations"
                        tags={currentWord?.collocations ?? []}
                        placeholder="Nhập cụm từ..."
                        onAdd={(val) => handleUpdateCollocation({ add: val })}
                        onRemove={(val) => handleUpdateCollocation({ remove: val })}
                    />
                </div>

                <div className="mt-10">
                    <TagInputSection
                        icon={<MessageSquareText size={16} />}
                        label="Synonyms"
                        tags={currentWord?.synonyms ?? []}
                        placeholder="Nhập từ đồng nghĩa..."
                        onAdd={(val) => handleUpdateSynonym({ add: val })}
                    />
                </div>




            </DrawerContent>
        </Drawer>
    )
}