"use client"
import { Button } from '@/components/ui/button'
import { Popover, PopoverContent, PopoverDescription, PopoverHeader, PopoverTrigger } from '@/components/ui/popover'
import { useDebounce } from '@/hooks/useDebounce'
import { speak } from '@/lib/audio'
import { useGetAllCategoriesQuery, useGetCategoriesWithoutWordQuery } from '@/store/api/categoryApi'
import { Definition, useCreateWordsMutation, useLazyLookupWordQuery, WordType } from '@/store/api/wordApi'
import { ArrowDown, CheckCircle2, Loader2, Plus, PlusCircle, Search, Volume2 } from 'lucide-react'
import { useState } from 'react'
import { toast } from 'sonner'
const DictionaryPage = () => {
    const [inputValue, setInputValue] = useState('')

    const [lookupWord, { data: wordData, isLoading, error, isFetching }] =
        useLazyLookupWordQuery();

    const [createWord, { isLoading: isLoadingCreateWord }] = useCreateWordsMutation()
    const debouncedValue = useDebounce(wordData?.word || '', 800)

    const { data: categories, isLoading: isLoadingCategories } = useGetCategoriesWithoutWordQuery(
        { word: debouncedValue },
        {
            refetchOnMountOrArgChange: true,
            skip: !debouncedValue.trim(), // tránh gọi khi rỗng
        }
    )
    console.log("từ điển:", wordData);

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault()
        if (!inputValue.trim()) return;

        lookupWord({ word: inputValue });
    }
    const handleSpeak = (word: string, voice: "us" | "uk") => {
        speak(word, voice)

    }
    const handleAddWord = async (definition: Definition, categoryId: string) => {
        const newWord = {
            categoryId: categoryId,
            words: [
                {
                    word: definition.word,
                    meaning: definition.meaning.en,
                    pronounciation: definition.pronunciation,
                    partsofSpeech: definition.partsofSpeech,
                    example: definition.example.map((example) => example.en),
                    collocations: definition.collocations.map((collocation) => collocation.en),
                    synonyms: definition.synonyms.map((synonym) => synonym.en)
                }
            ]
        }
        await createWord(newWord)
            .unwrap()
            .then(() => {
                toast.success("Thêm từ thành công");
            })
            .catch((err) => {
                toast.error("Thêm từ thất bại");
            })

    }
    const loading = isLoading || isFetching;

    console.log("categories:", categories);

    return (
        <div className="">
            <form onSubmit={handleSearch} className="relative w-full">
                <div className="relative group">
                    <input
                        type="text"
                        value={inputValue}
                        onChange={(e) => setInputValue(e.target.value)}
                        placeholder="Nhập từ hoặc cụm từ cần tra cứu..."
                        className="w-full bg-transparent border-0 border-b-2 border-[#EADDC9]/50 
                        focus:border-[#EA7A21] focus:ring-0 
                        rounded-none py-4 px-1 text-2xl md:text-3xl placeholder-[#CDCECD] 
                        transition-all duration-300 outline-none"
                        autoFocus
                    />
                    <Search className='absolute right-5 top-6 opacity-40' />

                </div>
            </form>
            {/* Loading state */}
            {loading && (
                <div className='flex items-center justify-center gap-2 mt-10 py-10 text-muted/70'>
                    <Loader2 className='animate-spin' size={20} />
                    <span className='text-sm italic'>Đang tra cứu...</span>
                </div>
            )}
            {!loading && error && (
                <div className='mt-10 py-6 px-4 border border-red-200 bg-red-50 rounded-lg text-red-600 text-sm'>
                    Có lỗi xảy ra khi tra cứu từ. Vui lòng thử lại.
                </div>
            )}

            {!loading && !error && wordData && wordData.definitions.length === 0 && (
                <div className='mt-10 py-6 px-4 border border-sidebar bg-card/40 rounded-lg text-muted/70 text-sm italic'>
                    "{wordData.word}" không có nghĩa hoặc chưa tra cứu được. Thử lại với từ khác nhé.
                </div>
            )}

            {!loading && !error && wordData && wordData.definitions.length > 0 && (
                <div className='flex flex-col gap-6 mt-10'>
                    <div className='flex flex-col'>
                        <div className='flex items-center gap-4'>
                            <h1 className='text-2xl font-semibold capitalize tracking-wider'>{wordData.word}</h1>

                            <button onClick={() => handleSpeak(wordData.word, 'us')} className=" flex items-center justify-center gap-1  p-2 bg-accent/10 rounded-lg cursor-pointer hover:scale-110 transition-transform">
                                <span className='text-xs text-accent font-semibold'>US</span>
                                <div className='p2'>
                                    <Volume2 className='font-bold text-accent/70' size={16} />
                                </div>
                            </button>

                            <button onClick={() => handleSpeak(wordData.word, 'uk')} className=" flex items-center justify-center gap-1  p-2 bg-accent/10 rounded-lg cursor-pointer hover:scale-110 transition-transform">
                                <span className='text-xs text-blue-500 font-semibold'>UK</span>
                                <div className='p2'>
                                    <Volume2 className='font-bold text-blue-500/70' size={16} />
                                </div>
                            </button>

                        </div>

                        <span className='text-muted/70 italic text-sm'>{wordData.definitions[0].pronunciation}</span>
                    </div>

                    {wordData.definitions.map((definition, index) => (
                        <div key={index} className='relative bg-card/10 shadow-xl p-4 border border-sidebar rounded-lg mt-10'>

                            <Popover>
                                <PopoverTrigger render={
                                    <Button className='absolute right-4 top-4 cursor-pointer'>
                                        Thêm vào bộ từ
                                        <ArrowDown className='' size={16} />
                                    </Button>
                                } />
                                <PopoverContent align="start" className='p-4'>
                                    <PopoverHeader>
                                        <div className='space-y-4'>
                                            {categories && categories.length > 0 ? (
                                                categories.map((cate) => (
                                                    <div key={cate.id} className='flex items-center justify-between'>
                                                        <div className='flex flex-col'>
                                                            <span className='font-semibold'>{cate.name}</span>
                                                            <span className='text-xs text-muted/70'>{cate.wordCount} từ</span>
                                                        </div>
                                                        <div onClick={() => handleAddWord(definition, cate.id)}>
                                                            <Plus size={16} className='text-green-500 hover:scale-115 cursor-pointer' />
                                                        </div>
                                                    </div>
                                                ))
                                            ) : (
                                                <div className='flex flex-col items-center gap-2 py-4 text-center'>
                                                    <CheckCircle2 size={24} className='text-green-500' />

                                                    <p className='text-xs text-muted/70'>Bạn đã có từ này vào mọi bộ từ vựng hiện có rồi.</p>
                                                </div>
                                            )}
                                        </div>
                                    </PopoverHeader>
                                </PopoverContent>
                            </Popover>
                            <div className='flex flex-col gap-8'>
                                <div className='flex items-center gap-2'>
                                    <span className='px-4 py-1 rounded-full bg-accent/10 text-accent'>{index + 1}</span>
                                    <span className='px-4 py-1 rounded-lg bg-accent/10 text-xs uppercase font-bold text-accent tracking-wider'>{definition.partsofSpeech}</span>
                                    <span className='italic opacity-70'>{definition.register}</span>
                                </div>

                                {/* definitions */}
                                <div className='flex flex-col gap-2'>

                                    <span className='tracking-wider uppercase text-sm text-muted/70'>Định nghĩa</span>

                                    <div className='py-5 px-4 border-l-4 border-accent w-full flex gap-2 flex-col'>
                                        <h2 className='text-lg font-semibold text-foreground  '>{definition.meaning.en}</h2>
                                        <h3 className='text-sm text-muted/70 italic'>{definition.meaning.vi}</h3>
                                    </div>
                                </div>

                                {/* examples */}
                                <div className='flex flex-col gap-2'>


                                    <span className='tracking-wider uppercase text-sm text-muted/70'>Ví dụ</span>

                                    {/* list examples */}

                                    {definition.example && definition.example.map((example, index) => (
                                        <div key={index} className='flex flex-col p-2 border-l-2 border-foreground/10'>
                                            <p className='text-foreground text-sm   '>{example.en}</p>
                                            <p className='text-muted/70 italic text-xs'>{example.vi}</p>
                                        </div>
                                    ))}
                                </div>

                                {/* collocation */}
                                <div className='flex flex-col gap-2'>


                                    <span className='tracking-wider uppercase text-sm text-muted/70'>Cụm từ / Collocations</span>

                                    <div className='flex gap-2 flex-wrap'>
                                        {definition.collocations && definition.collocations.map((collocation, index) => (
                                            <div key={index} className='flex gap-2 flex-nowrap items-center bg-accent/5 border rounded-lg px-2 py-1'>
                                                <span className=' text-sm'>{collocation.en}</span>
                                                <span className='w-1 h-1 rounded-full bg-muted'></span>
                                                <span className=' italic text-muted/70 text-sm'>{collocation.vi}</span>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                                {/* synonyms */}
                                <div className='flex flex-col gap-2'>
                                    <span className='tracking-wider uppercase text-sm text-muted/70'>Từ đồng nghĩa</span>

                                    <div className='flex gap-2 flex-wrap'>
                                        {definition.synonyms && definition.synonyms.map((synonym, index) => (
                                            <div key={index} className='flex gap-2 flex-nowrap items-center bg-accent/5 border rounded-lg px-2 py-1'>
                                                <span className=' text-sm'>{synonym.en}</span>
                                                <span className='w-1 h-1 rounded-full bg-muted'></span>
                                                <span className='italic text-muted/70 text-sm'>{synonym.vi}</span>
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                {/* word family */}
                                {definition.wordFamily && definition.wordFamily.length > 0 && (
                                    <div className='flex flex-col gap-2'>
                                        <span className='tracking-wider uppercase text-sm text-muted/70'>Họ từ</span>
                                        <div className='flex gap-2 flex-wrap'>
                                            {definition.wordFamily.map((word, index) => (
                                                <div key={index} className='flex gap-2 flex-nowrap items-center bg-accent/5 border rounded-lg px-2 py-1'>
                                                    <span className=' text-sm'>{word.en}</span>
                                                    {word.partsofSpeech && <span className='text-xs text-muted/70'>({word.partsofSpeech})</span>}
                                                    <span className='w-1 h-1 rounded-full bg-muted'></span>
                                                    <span className='italic text-muted/70 text-sm'>{word.vi}</span>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                )}

                            </div>
                        </div>
                    ))}
                </div>
            )}



        </div>
    )
}

export default DictionaryPage