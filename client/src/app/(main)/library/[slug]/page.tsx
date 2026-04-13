"use client"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion'
import { Button } from '@/components/ui/button'
import { useGetWordDetailQuery } from '@/store/api/wordApi';
import { ArrowRightIcon, ChevronDownIcon, Languages, Layers, Loader2, StarIcon, Volume2, Zap } from 'lucide-react'
import React from 'react'


const WordDetailPage = ({ params }: { params: Promise<{ slug: string }> }) => {

    const { slug } = React.use(params)
    const { data: wordDetail, isLoading } = useGetWordDetailQuery({ wordParams: slug });

    console.log("wordDetail", wordDetail);

    return (
        <div className='grid grid-cols-1 lg:grid-cols-12 gap-10'>
            <div className='flex flex-col lg:col-span-8 space-y-4'>
                <div className='flex items-center '>
                    <span className='w-8 h-8 bg-accent-soft text-accent rounded-full text-center flex items-center justify-center text-xs font-bold '>{wordDetail?.cefrLevel}</span>
                </div>
                <div className='flex items-center gap-10'>
                    <h1 className='text-6xl md:text-7xl italic font-lora text-accent '>{slug}</h1>
                    <Button className='p-3 w-12 h-12 rounded-xl font-bold transition-all duration-300  hover:scale-110 cursor-pointer'>
                        <Volume2 className='size-5' />
                    </Button>

                </div>
                <p className='text-muted mt-4 text-xl'>{wordDetail?.pronunciation}</p>

                <div className='space-y-4 mt-10 border border-border p-8 rounded-3xl bg-card relative'>
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
                                <div className='flex items-start gap-6 relative' key={def.context}>

                                    <span className='border border-border px-4 py-2 rounded-xl text-muted text-sm font-semibold bg-foreground/5'>{index + 1}</span>
                                    <div className='flex flex-col '>
                                        <div className='flex items-center gap-2'>
                                            <span className='py-1 px-2 rounded-lg bg-muted/10 text-accent text-xs w-fit'>Adjective</span>
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
                                                    <span className='text-muted italic'>"{def.exampleEn}"</span>
                                                    <span className='text-foreground text-sm'>{def.exampleVi}</span>
                                                </AccordionContent>
                                            </AccordionItem>
                                        </Accordion>
                                    </div>

                                </div>

                            ))}
                        </>
                    )}

                </div>


            </div>
            <div className='lg:col-span-4 flex flex-col gap-10'>
                <div className='space-y-4 mt-10 border border-border p-8 rounded-3xl bg-card max-h-[450px] overflow-auto'>
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
                <div className='p-8 rounded-3xl border border-border bg-card'>
                    <div className='flex items-center gap-2'>
                        <Zap className='size-6 text-accent' />
                        <h3 className='text-2xl font-lora text-foreground'>Từ đồng nghĩa</h3>
                    </div>
                    <div className='flex flex-wrap items-center gap-2'>
                        {wordDetail?.synonyms?.length && wordDetail?.synonyms?.length > 0 && wordDetail?.synonyms?.map((syn, index) => (
                            <div className='flex items-center gap-2 border border-border px-4 py-2 rounded-lg bg-card w-fit' key={index}>
                                <span className='text-foreground text-sm'>{syn.meaningEn}</span>
                                <span>-</span>
                                <span className='text-muted text-sm'>{syn.meaningVi}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    )
}
export default WordDetailPage