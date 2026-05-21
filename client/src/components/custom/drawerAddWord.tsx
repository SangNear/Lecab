"use client"
import { Drawer, DrawerContent, DrawerHeader, DrawerTitle } from '../ui/drawer';
import { MessageSquareText, MousePointer2, Save, X } from 'lucide-react';
import z from 'zod';
import { Controller, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Input } from '../ui/input';
import { Textarea } from '../ui/textarea';
import { CategoryType } from '@/store/api/categoryApi';
import CustomSelect from './selectCustom';
import { TagInputSection } from './tagInputSection';
import { useState } from 'react';
import { Button } from '../ui/button';
import { useCreateWordMutation } from '@/store/api/wordApi';
import { toast } from 'sonner';





interface DrawerAddWordProps {
    open: boolean;
    onClose: () => void;
    categories: CategoryType[]
}

const wordSchema = z.object({
    categoryId: z.string().uuid({ message: "Category is required" }),
    word: z.string().min(2, { message: "Word is required" }),
    meaning: z.string().min(2, { message: "Meaning is required" }),
    pronunciation: z.string().optional(),
    partsofSpeech: z.enum(['noun', 'verb', 'adjective', 'adverb', 'pronoun', 'preposition', 'conjunction', 'interjection']).optional(),
    example: z.string().min(1, { message: "At least one example is required" }),
    collocations: z.array(z.string()).optional(),
    synonyms: z.array(z.string()).optional(),

})

type WordFormValues = z.infer<typeof wordSchema>


const DrawerAddWord = ({ open, onClose, categories }: DrawerAddWordProps) => {
    const alignItemWithTrigger = false;
    const [collocations, setCollocations] = useState<string[]>([]);
    const [synonyms, setSynonyms] = useState<string[]>([]);
    const [createWord, { isLoading }] = useCreateWordMutation();
    const { register, handleSubmit, formState: { errors, isValid }, control, reset } = useForm<WordFormValues>({
        resolver: zodResolver(wordSchema),
        mode: "onChange",
    })
    const onSubmit = async (payload: WordFormValues) => {
        const data = {
            ...payload,
            example: payload.example.split('\n').filter(Boolean)
        }
        try {
            await createWord(data);
            reset();
            setCollocations([]);
            setSynonyms([]);
            onClose();
            toast.success("Thêm từ mới thành công!");
        } catch (error) {
            console.error("Error creating word:", error);
            toast.error("Có lỗi xảy ra khi thêm từ mới!");
        }
    }
    const handleAddCollocation = (val: string) => {
        setCollocations((prev) => [...prev, val]);
    };

    const handleRemoveCollocation = (val: string) => {
        setCollocations((prev) => prev.filter((c) => c !== val));
    };
    const handleAddSynonym = (val: string) => {
        setSynonyms((prev) => [...prev, val]);
    };

    const handleRemoveSynonym = (val: string) => {
        setSynonyms((prev) => prev.filter((s) => s !== val));
    };
    return (
        <Drawer direction="right" open={open} onOpenChange={(v) => !v && onClose()} >
            <DrawerContent className='md:min-w-125 overflow-visible'  >
                <DrawerHeader className="">
                    <DrawerTitle className=" gap-4 mt-2  text-base font-bold flex items-center justify-between">
                        Thêm từ vựng mới
                        <X className='opacity-70 rounded-full hover:opacity-60 hover:border cursor-pointer hover:scale-75 transition-all duration-75' onClick={onClose} />
                    </DrawerTitle>

                    <div className='w-full  mt-5'>
                        <form className='space-y-6' onSubmit={handleSubmit(onSubmit)}>
                            <div className='flex flex-col gap-2'>
                                <label htmlFor="word" className='text-sm uppercase font-semibold tracking-widest text-muted'>
                                    Nhập Từ mới <span className="text-red-500">*</span>
                                </label>
                                <Input className='focus:none focus:ring-2 focus:outline-none focus:border-none' id="word" placeholder='Ví dụ: apple, quiet, arrogant' {...register("word")} />
                                {errors.word && <p className='text-red-500 text-sm'>{errors.word.message}</p>}
                            </div>
                            <div className='flex flex-col gap-2'>
                                <label htmlFor="meaning" className='text-sm uppercase font-semibold tracking-widest text-muted'>Nghĩa của từ <span className="text-red-500">*</span></label>
                                <Textarea placeholder='Nên dùng nghĩa bằng tiếng anh...' minLength={1} className='focus:none focus:ring-2 focus:outline-none focus:border-none' id="meaning"  {...register("meaning")} />
                                {errors.meaning && <p className='text-red-500 text-sm'>{errors.meaning.message}</p>}
                            </div>
                            <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
                                <div className='flex flex-col gap-2'>

                                    <Controller
                                        control={control}
                                        name="partsofSpeech"
                                        render={({ field }) => (
                                            <CustomSelect
                                                label="Từ loại"
                                                placeholder="Chọn từ loại"
                                                value={field.value ?? ''}
                                                onChange={field.onChange}
                                                options={[
                                                    { value: 'noun', label: 'Noun' },
                                                    { value: 'verb', label: 'Verb' },
                                                    { value: 'adjective', label: 'Adjective' },
                                                    { value: 'adverb', label: 'Adverb' },
                                                    { value: 'pronoun', label: 'Pronoun' },
                                                    { value: 'preposition', label: 'Preposition' },
                                                    { value: 'conjunction', label: 'Conjunction' },
                                                    { value: 'interjection', label: 'Interjection' },
                                                ]}
                                                error={errors.partsofSpeech?.message}
                                            />
                                        )}
                                    />
                                </div>
                                <div className='flex flex-col gap-2'>
                                    <label htmlFor="pronunciation" className='text-sm uppercase font-semibold tracking-widest text-muted'>Phiên âm (IPA)</label>
                                    <Input
                                        className='focus:none focus:ring-2 focus:outline-none focus:border-none'
                                        id="pronunciation"
                                        placeholder='/ˈæp.əl/'
                                        {...register("pronunciation")}
                                    />
                                </div>
                            </div>


                            <div className='flex flex-col gap-2'>
                                <label htmlFor="example" className='text-sm uppercase font-semibold tracking-widest text-muted'>Ví dụ <span className='text-red-500'>*</span></label>
                                <Textarea minLength={1} className='focus:none focus:ring-2 focus:outline-none focus:border-none' placeholder='Mỗi câu một dòng...' id="example"  {...register("example")} />
                                {errors.example && <p className='text-red-500 text-sm'>{errors.example.message}</p>}
                            </div>
                            <Controller
                                control={control}
                                name="categoryId"
                                render={({ field }) => (
                                    <CustomSelect
                                        label="Lưu vào thư viện"
                                        placeholder="Chọn thư viện"
                                        value={field.value}
                                        onChange={field.onChange}
                                        options={categories.map(cat => ({ value: cat.id, label: cat.name }))}
                                        error={errors.categoryId?.message}
                                    />
                                )}
                            />
                            <div className="">
                                <TagInputSection
                                    icon={<MousePointer2 size={16} />}
                                    label="Collocations"
                                    tags={collocations}
                                    placeholder="Nhập cụm từ..."
                                    onAdd={handleAddCollocation}
                                    onRemove={handleRemoveCollocation}
                                />
                            </div>
                            <TagInputSection
                                icon={<MessageSquareText size={16} />}
                                label="Synonyms"
                                tags={synonyms}
                                placeholder="Nhập từ đồng nghĩa..."
                                onAdd={handleAddSynonym}
                                onRemove={handleRemoveSynonym}
                            />
                            <Button type='submit' className='w-full cursor-pointer bg-none  text-white py-4 rounded-2xl hover:bg-primary/90 transition-colors duration-200' disabled={!isValid}>
                                <Save />
                                Lưu
                            </Button>
                        </form>
                    </div>
                </DrawerHeader>
            </DrawerContent>
        </Drawer>
    )
}

export default DrawerAddWord