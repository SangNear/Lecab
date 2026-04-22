"use client"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion'
import { Button } from '@/components/ui/button'
import { useGetWordDetailQuery } from '@/store/api/wordApi';
import { Languages, Layers, Loader2, StarIcon, Volume2, Zap } from 'lucide-react'
import React from 'react'
import { motion } from 'motion/react'
import { playTextAudio } from '@/lib/audio';

const WordDetailPage = ({ params }: { params: Promise<{ slug: string }> }) => {

    const { slug } = React.use(params)
    const decoedSlug = decodeURIComponent(slug)
    const { data: wordDetail, isLoading } = useGetWordDetailQuery({ wordParams: decoedSlug });

    console.log("wordDetail", wordDetail);

    const handlePlayAudio = async () => {
        if (!decoedSlug) return;
        try {
            await playTextAudio("always dreamed of a small bakery, a place filled with the smell of warm bread.  - starting from nothing - felt daunting. She would procrastinate on her plan, but soon realized she was vulnerable to fear. Eventually, she focused on the aesthetic presentation and started with small innovations. She discovered she was surprisingly resilient. Although not an eloquent businesswoman, she spoke through her baking");

        } catch (error) {
            console.error("Audio error:", error);
        }
    };

    return (
        <div className='grid grid-cols-1 lg:grid-cols-12 gap-10'>
            <div className='flex flex-col lg:col-span-8 space-y-4'>
                <div className='flex items-center '>
                    <span className='w-8 h-8 bg-accent-soft text-accent rounded-full text-center flex items-center justify-center text-xs font-bold '>{wordDetail?.cefrLevel}</span>
                </div>
                <div className='flex items-center gap-10'>

                    <motion.h1
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.3, ease: "easeInOut" }}
                        className='text-6xl md:text-7xl italic font-lora text-accent whitespace-normal'>
                        {decoedSlug}
                    </motion.h1>
                    <Button onClick={handlePlayAudio} className='p-3 w-12 h-12 rounded-xl font-bold transition-all duration-300  hover:scale-110 cursor-pointer'>
                        <Volume2 className='size-5' />
                    </Button>

                </div>
                <p className='text-muted mt-4 text-xl'>{wordDetail?.pronunciation}</p>

                <div className='space-y-4 mt-10 border border-border p-8 rounded-3xl bg-card relative shadow-lg'>
                    <Languages className='absolute top-0 right-3  text-muted/10 w-[100px] h-[100px] hidden md:block' />
                    <div className='flex items-center gap-2'>
                        <Languages className='size-6 text-accent' />
                        <h3 className='text-lg font-lora text-muted'>Danh sách định nghĩa và ví dụ</h3>
                    </div>

                    {isLoading ? (
                        <div className='flex items-center justify-center h-40'>
                            <Loader2 className='size-10 animate-spin text-accent' />
                        </div>
                    ) : (
                        <>
                            {wordDetail?.definitions?.length && wordDetail?.definitions?.length > 0 && wordDetail?.definitions?.map((def, index) => (
                                <motion.div
                                    initial={{ opacity: 0, x: -20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ duration: 0.3, ease: "easeInOut", delay: index * 0.1 }}
                                    className='flex items-start gap-6 relative'
                                    key={def.context}>

                                    <span className='border border-border px-4 py-2 rounded-xl text-muted text-sm font-semibold bg-foreground/5'>{index + 1}</span>
                                    <div className='flex flex-col '>
                                        <div className='flex items-center gap-2'>
                                            <span className='py-1 px-2 rounded-lg bg-muted/10 text-accent text-xs w-fit'>{def.partOfSpeech}</span>
                                            {index === 0 &&
                                                <span className='py-1 px-2 rounded-lg bg-yellow-500/10 text-yellow-500 text-xs w-fit flex items-center gap-2'>
                                                    <StarIcon className='size-4' />
                                                    Tiêu biểu
                                                </span>
                                            }

                                        </div>

                                        <Accordion className='' >
                                            <AccordionItem value={def.context.toLowerCase().replace(/ /g, "-")}>
                                                <AccordionTrigger className='hover:no-underline flex items-center justify-between gap-2'>


                                                    <span className='text-foreground md:text-2xl font-extralight italic font-lora tracking-wide'>{def.context}</span>
                                                </AccordionTrigger>
                                                <AccordionContent className='flex flex-col gap-2'>
                                                    <span onClick={handlePlayAudio} className='text-muted italic'>"{def.exampleEn}"</span>

                                                    <span className='text-foreground text-sm'>{def.exampleVi}</span>
                                                </AccordionContent>
                                            </AccordionItem>
                                        </Accordion>
                                    </div>

                                </motion.div>

                            ))}
                        </>
                    )}

                </div>


            </div>
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, ease: "easeInOut", delay: 0.2 }}
                className='lg:col-span-4 flex flex-col gap-10'>
                <div className='space-y-4 mt-10 border border-border p-8 rounded-3xl bg-card max-h-[450px] overflow-auto shadow-lg'>
                    <div className='flex items-center gap-2'>
                        <Layers className='size-6 text-accent' />
                        <h3 className='text-2xl font-lora text-foreground'>Cụm từ kết hợp</h3>
                    </div>

                    <div className='flex flex-wrap gap-2'>
                        {wordDetail?.collocations?.length && wordDetail?.collocations?.length > 0 && wordDetail?.collocations?.map((col) => (
                            <div className='p-4 border border-border shadow rounded-lg bg-card w-fit' key={col}>{col}</div>
                        ))}
                    </div>
                </div>
                <div className='p-8 rounded-3xl border border-border bg-card shadow-lg'>
                    <div className='flex items-center gap-2'>
                        <Zap className='size-6 text-accent' />
                        <h3 className='text-2xl font-lora text-foreground'>Từ đồng nghĩa</h3>
                    </div>
                    <div className='flex flex-wrap items-center gap-2'>
                        {wordDetail?.synonyms?.length && wordDetail?.synonyms?.length > 0 && wordDetail?.synonyms?.map((syn, index) => (
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.3, ease: "easeInOut", delay: index * 0.1 }} className='flex items-center gap-2 border border-border px-4 py-2 rounded-lg bg-card w-fit' key={index}>
                                <span className='text-foreground text-sm'>{syn.meaningEn}</span>
                                <span>-</span>
                                <span className='text-muted text-sm'>{syn.meaningVi}</span>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </motion.div>
        </div>
    )
}
export default WordDetailPage