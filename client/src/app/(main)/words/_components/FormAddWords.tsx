import CustomSelect from '@/components/custom/selectCustom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { CategoryType } from '@/store/api/categoryApi';
import { zodResolver } from '@hookform/resolvers/zod';
import { CircleQuestionMark, CloudUpload, Download, Eye, EyeOff, Plus, Save, Trash } from 'lucide-react';
import React, { ChangeEvent } from 'react';
import { Controller, useFieldArray, useForm } from 'react-hook-form';
import z from 'zod';
import { AnimatePresence, motion } from 'motion/react';
import * as XLSX from 'xlsx'; // <-- Import SheetJS
import { Dialog, DialogContent, DialogHeader, DialogTrigger } from '@/components/ui/dialog';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { useCreateWordsMutation, WordPayload } from '@/store/api/wordApi';
import { toast } from 'sonner';

interface FormAddWordsProps {
    categories: CategoryType[]
    setOpenAddWord: (open: boolean) => void
}

const vocabularyColumns = [
    {
        index: 1,
        key: "word",
        required: "Bắt buộc",
        note: "-",
    },
    {
        index: 2,
        key: "meaning",
        required: "Bắt buộc",
        note: "-",
    },
    {
        index: 3,
        key: "pronunciation",
        required: "Tùy chọn",
        note: "-",
    },
    {
        index: 4,
        key: "partOfSpeech",
        required: "Tùy chọn",
        note: "noun, verb, adjective, adverb,...",
    },
    {
        index: 5,
        key: "example",
        required: "Bắt buộc >= 1",
        note: "Mảng - các câu ngăn cách bằng dấu phẩy (,)",
    },
    {
        index: 6,
        key: "collocations",
        required: "Tùy chọn",
        note: "Mảng - các câu ngăn cách bằng dấu phẩy (,)",
    },
    {
        index: 7,
        key: "synonyms",
        required: "Tùy chọn",
        note: "Mảng - các câu ngăn cách bằng dấu phẩy (,)",
    },
];

const wordSchema = z.object({
    word: z.string().min(2, { message: "Word is required" }),
    meaning: z.string().min(2, { message: "Meaning is required" }),
    pronunciation: z.string().optional(),
    partsofSpeech: z.enum(['noun', 'verb', 'adjective', 'adverb', 'pronoun', 'preposition', 'conjunction', 'interjection']).optional(),
    example: z.string().min(1, { message: "At least one example is required" }),
    collocations: z.array(z.string()).optional(),
    synonyms: z.array(z.string()).optional(),
})

const wordFormSchema = z.object({
    categoryId: z.string().uuid({ message: "Category is required" }),
    words: z.array(wordSchema).min(1),
})

type WordFormValues = z.infer<typeof wordFormSchema>

const emptyWord: WordFormValues["words"][number] = {
    word: "",
    meaning: "",
    pronunciation: "",
    partsofSpeech: undefined,
    example: "",
    collocations: [],
    synonyms: [],
};

const FormAddWords = ({ categories, setOpenAddWord }: FormAddWordsProps) => {
    const [createWord, { isLoading }] = useCreateWordsMutation()
    const [showExample, setShowExample] = React.useState(false);
    const { register, control, handleSubmit, setValue, formState: { errors } } = useForm<WordFormValues>({
        resolver: zodResolver(wordFormSchema),
        defaultValues: {
            categoryId: "",
            words: [emptyWord],
        },
    })

    const { fields, append, remove } = useFieldArray({
        control,
        name: "words",
    })

    const handleFileUpload = (e: ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        const reader = new FileReader();


        reader.readAsBinaryString(file);

        reader.onload = (event) => {
            const binaryStr = event.target?.result;
            if (!binaryStr) return;


            const workbook = XLSX.read(binaryStr, { type: 'binary' });


            const firstSheetName = workbook.SheetNames[0];
            const worksheet = workbook.Sheets[firstSheetName];


            const rawData = XLSX.utils.sheet_to_json<string[]>(worksheet, { header: 1 });

            if (rawData.length <= 1) {
                alert("File không có dữ liệu hoặc chỉ có tiêu đề!");
                return;
            }


            const dataRows = rawData.slice(1);


            const importedWords: WordFormValues["words"] = dataRows
                .filter(row => row[0] && row[1])
                .map(row => {

                    const rawPartsOfSpeech = row[3]?.toString().trim().toLowerCase();
                    const validPartsOfSpeech = [
                        'noun', 'verb', 'adjective', 'adverb',
                        'pronoun', 'preposition', 'conjunction', 'interjection'
                    ].includes(rawPartsOfSpeech)
                        ? (rawPartsOfSpeech as WordFormValues["words"][number]["partsofSpeech"])
                        : undefined;

                    return {
                        word: row[0]?.toString().trim() || "",
                        meaning: row[1]?.toString().trim() || "",
                        pronunciation: row[2]?.toString().trim() || "",
                        partsofSpeech: validPartsOfSpeech,
                        example: row[4]?.toString().trim() || "",
                        collocations: [],
                        synonyms: [],
                    };
                });

            if (importedWords.length > 0) {

                setValue("words", importedWords, { shouldValidate: true });

                e.target.value = '';
            } else {
                alert("Không tìm thấy dữ liệu hợp lệ trong file!");
            }
        };
    };

    const handleShowExample = () => {
        setShowExample(!showExample);
    };

    const splitToArray = (value?: string): string[] =>
        value
            ?.split(/[\n,]+/)
            .map((item) => item.trim())
            .filter(Boolean) ?? [];

    const buildPayload = (data: WordFormValues): WordPayload => ({
        categoryId: data.categoryId,
        words: data.words.map(
            ({
                word,
                meaning,
                pronunciation,
                partsofSpeech,
                example,
                collocations,
                synonyms,
            }) => ({
                word: word.trim(),
                meaning: meaning.trim(),
                pronunciation: pronunciation?.trim() || "",
                partsofSpeech: partsofSpeech?.trim() || "",
                example: splitToArray(example),
                collocations,
                synonyms
            })
        ),
    });

    const onSubmit = async (data: WordFormValues) => {
        try {
            const payload = buildPayload(data);

            await createWord(payload).unwrap();
            setOpenAddWord(false);
            toast.success("Thêm từ vựng thành công");

        } catch (error) {
            toast.error("Có lỗi xảy ra");
        }
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 overflow-hidden">
            <div className='space-y-6'>
                <div className='w-fit'>
                    <div className='grid grid-cols-1 md:grid-cols-4 gap-5 overflow-hidden'>
                        <div className='w-full '>
                            <div className='flex items-center gap-5 md:flex-col md:items-start md:gap-2 w-full '>
                                <label className='text-sm font-semibold tracking-wide text-muted whitespace-nowrap'>
                                    Lưu vào bộ từ
                                </label>
                                <Controller
                                    control={control}
                                    name="categoryId"
                                    render={({ field }) => (
                                        <CustomSelect
                                            placeholder="Chọn thư viện"
                                            value={field.value ?? ''}
                                            onChange={field.onChange}
                                            options={categories?.map(cat => ({ value: cat.id, label: cat.name })) ?? []}
                                            error={errors.categoryId?.message}
                                        />
                                    )}
                                />
                            </div>
                        </div>

                        <div className='col-span-3  p-4 rounded-lg border flex flex-col md:flex-row md:items-center justify-between gap-3'>
                            <div>
                                <h3 className='font-semibold capitalize'>Import file</h3>
                                <p className='text-muted text-xs '>Hỗ trợ File .xlsx, .xls, .csv </p>
                            </div>
                            <div className='flex items-center gap-1 md:ml-10'>

                                <Download size={16} className='text-accent' />

                                <Dialog>
                                    <DialogTrigger className='text-accent text-xs hover:underline cursor-pointer tracking-tight whitespace-nowrap'>Tải file mẫu</DialogTrigger>
                                    <DialogContent>
                                        <DialogHeader>
                                            brug
                                        </DialogHeader>
                                        <div>
                                            nội dung
                                        </div>
                                    </DialogContent>
                                </Dialog>

                            </div>
                            <div
                                id="dropzone"
                                className="border-2 border-dashed border-slate-300 bg-muted/5 hover:border-brand-500/50 hover:bg-orange-50/20 rounded-lg p-2.5 transition-all text-center cursor-pointer flex items-center justify-center gap-3 relative"
                                onClick={() => document.getElementById('file-input')?.click()}
                            >
                                {/* Gắn hàm handleFileUpload vào đây */}
                                <Input
                                    type="file"
                                    id="file-input"
                                    className="hidden"
                                    accept=".csv, .xlsx, .xls"
                                    onChange={handleFileUpload}
                                />
                                <div className="p-1.5 bg-white rounded-md shadow-sm text-brand-500" id="import-icon-container">
                                    <CloudUpload className="w-5 h-5 text-accent animate-bounce" />
                                </div>
                                <div className="text-left hidden md:block">
                                    <p className="text-xs font-semibold" id="import-status">Kéo thả hoặc Click để Import file</p>
                                </div>
                            </div>
                        </div>

                    </div>
                    <div className='flex flex-col gap-2 mt-3'>
                        <div onClick={handleShowExample} className='flex items-end gap-2 bg-muted/20 px-2 py-1 rounded w-fit cursor-pointer group'>

                            {showExample ? (
                                <EyeOff className='group-hover:text-accent' size={16} />
                            ) : (
                                <Eye className='group-hover:text-accent' size={16} />
                            )}
                            <p className='text-xs text-foreground/80 font-semibold group-hover:text-accent'>Xem nhanh cấu trúc file import</p>
                        </div>
                        {showExample && (
                            <motion.div
                                initial={{ opacity: 0, height: 0 }}
                                animate={{ opacity: 1, height: 'auto' }}
                                exit={{ opacity: 0, height: 0 }}
                                transition={{ duration: 0.3 }}
                            >
                                <Table className="border border-border rounded-lg p-2">
                                    <TableHeader>
                                        <TableRow>
                                            <TableHead className="bg-accent/10 text-foreground/80 uppercase text-xs border-b border-foreground/10">
                                                Cột
                                            </TableHead>
                                            <TableHead className="bg-accent/10 text-foreground/80 uppercase text-xs border-b border-foreground/10">
                                                Tên Header
                                            </TableHead>
                                            <TableHead className="bg-accent/10 text-foreground/80 uppercase text-xs border-b border-foreground/10">
                                                Trạng thái
                                            </TableHead>
                                            <TableHead className="bg-accent/10 text-foreground/80 uppercase text-xs border-b border-foreground/10">
                                                Lưu ý định dạng
                                            </TableHead>
                                        </TableRow>
                                    </TableHeader>

                                    <TableBody className="text-xs">
                                        {vocabularyColumns.map((item) => (
                                            <TableRow key={item.key}>
                                                <TableCell>{item.index}</TableCell>
                                                <TableCell>{item.key}</TableCell>
                                                <TableCell>{item.required}</TableCell>
                                                <TableCell>{item.note}</TableCell>
                                            </TableRow>
                                        ))}
                                    </TableBody>
                                </Table>
                            </motion.div>
                        )}
                    </div>
                </div>

                <AnimatePresence mode="popLayout">
                    {fields.map((field, index) => (
                        <motion.div
                            layout
                            className="px-2 overflow-hidden md:px-4 py-4 rounded-lg bg-muted/10 shadow-lg"
                            key={field.id}
                            initial={{ opacity: 0, height: 0, y: 3 }}
                            animate={{ opacity: 1, height: "auto", y: 0 }}
                            transition={{ duration: 0.25, ease: "easeInOut" }}
                        >
                            <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                                <div className="flex items-center justify-between col-span-2 md:col-span-4 ">
                                    <span className="text-sm font-semibold text-accent">
                                        #{index + 1}
                                    </span>

                                    {index > 0 && (
                                        <Button
                                            type="button"
                                            variant="outline"
                                            className="flex items-center gap-2 cursor-pointer bg-none rounded-lg p-2 hover:scale-90"
                                            onClick={() => remove(index)}
                                        >
                                            <Trash className="text-red-500" size={16} />
                                            <span className="text-sm text-red-500">Xóa</span>
                                        </Button>
                                    )}
                                </div>

                                <div className="flex flex-col gap-2 col-span-2">
                                    <label className="text-sm font-semibold text-muted">
                                        Nhập Từ mới <span className="text-red-500">*</span>
                                    </label>
                                    <Input
                                        className="focus:none placeholder:text-xs focus:ring-2 focus:outline-none focus:border-none border border-gray-300"
                                        placeholder="Ví dụ: apple, quiet, arrogant"
                                        {...register(`words.${index}.word`)}
                                    />
                                    {errors.words?.[index]?.word && (
                                        <p className="text-red-500 text-sm">
                                            {errors.words[index].word.message}
                                        </p>
                                    )}
                                </div>

                                <div className="flex flex-col gap-2">
                                    <label className="text-sm font-semibold text-muted">Phiên âm (IPA)</label>
                                    <Input
                                        className="focus:none focus:ring-2 focus:outline-none focus:border-none placeholder:text-xs border-gray-300"
                                        placeholder="/ˈæp.əl/"
                                        {...register(`words.${index}.pronunciation`)}
                                    />
                                </div>

                                <div className="flex flex-col gap-2">
                                    <Controller
                                        control={control}
                                        name={`words.${index}.partsofSpeech`}
                                        render={({ field }) => (
                                            <CustomSelect
                                                label="Từ loại"
                                                placeholder="Chọn từ loại"
                                                value={field.value ?? ""}
                                                onChange={field.onChange}
                                                options={[
                                                    { value: "noun", label: "Noun" },
                                                    { value: "verb", label: "Verb" },
                                                    { value: "adjective", label: "Adjective" },
                                                    { value: "adverb", label: "Adverb" },
                                                    { value: "pronoun", label: "Pronoun" },
                                                    { value: "preposition", label: "Preposition" },
                                                    { value: "conjunction", label: "Conjunction" },
                                                    { value: "interjection", label: "Interjection" },
                                                ]}
                                                error={errors.words?.[index]?.partsofSpeech?.message}
                                            />
                                        )}
                                    />
                                </div>

                                <div className="flex flex-col gap-2 col-span-2">
                                    <label className="text-sm font-semibold text-muted">
                                        Nghĩa của từ <span className="text-red-500">*</span>
                                    </label>
                                    <Textarea
                                        placeholder="Nên dùng nghĩa bằng tiếng anh..."
                                        className="border-gray-300 placeholder:text-xs focus:none focus:ring-2 focus:outline-none focus:border-none"
                                        {...register(`words.${index}.meaning`)}
                                    />
                                    {errors.words?.[index]?.meaning && (
                                        <p className="text-red-500 text-sm">
                                            {errors.words[index].meaning.message}
                                        </p>
                                    )}
                                </div>

                                <div className="flex flex-col gap-2 col-span-2">
                                    <label className="text-sm font-semibold text-muted">
                                        Ví dụ <span className="text-red-500">*</span>
                                    </label>
                                    <Textarea
                                        className="border-gray-300 placeholder:text-xs focus:none focus:ring-2 focus:outline-none focus:border-none"
                                        placeholder="Mỗi câu một dòng..."
                                        {...register(`words.${index}.example`)}
                                    />
                                    {errors.words?.[index]?.example && (
                                        <p className="text-red-500 text-sm">
                                            {errors.words[index].example.message}
                                        </p>
                                    )}
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </AnimatePresence>

                <Button
                    type='button'
                    className="bg-white hover:bg-accent/5 text-accent border border-accent/30 hover:border-accent/80 px-4 py-2 rounded-xl text-xs font-bold tracking-wide transition flex items-center gap-2 shadow-sm"
                    onClick={() => append(emptyWord)}
                >
                    <Plus className="w-4 h-4 stroke-[3px]" />
                    Thêm từ tiếp theo
                </Button>
            </div>

            <div className='w-full flex items-center justify-end'>
                <Button
                    type='submit'
                    className='bg-accent px-4 py-2 flex items-center gap-2 cursor-pointer text-white rounded-2xl hover:bg-primary/90 transition-colors duration-200'
                >
                    <Save size={16} />
                    <span>Lưu</span>
                </Button>
            </div>
        </form>
    )
}

export default FormAddWords;