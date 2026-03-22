"use client"
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { z } from "zod"
import ButtonCustom from './buttonCustom'

const wordSchema = z.object({
    word: z.string().min(1, { message: "Word is required" }),
    definition: z.string().min(1, { message: "Definition is required" }),
    sentencesText: z.string().optional(),
})

type WordFormValues = z.infer<typeof wordSchema>
const Form = () => {

    const { register, handleSubmit, formState: { errors } } = useForm<WordFormValues>({
        resolver: zodResolver(wordSchema),
    })
    const onSubmit = (data: WordFormValues) => {
        const sentences =
            data.sentencesText
                ?.split(/\r?\n/)
                .map((s) => s.trim())
                .filter(Boolean) ?? []

        const payload = {
            word: data.word,
            definition: data.definition,
            sentences,
        }

        console.log(payload)

    }
    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <div className='flex flex-col gap-2 mb-5'>
                <label htmlFor="" className='text-sm text-muted uppercase tracking-widest'>word</label>
                <input
                    placeholder='e.g Ephemeral'
                    className='py-[13.6px] placeholder:text-gray-400 font-medium px-4 border-[0.5px] border-border rounded-[14px] focus:border-accent focus:outline-none'
                    type="text"
                    id="word"
                    {...register("word")}
                />
                {errors.word && <p className='text-red-500'>{errors.word.message}</p>}
            </div>
            <div className='flex flex-col gap-2 mb-5'>
                <label htmlFor="" className='text-sm text-muted uppercase tracking-widest'>meaning</label>
                <input
                    placeholder='What does it mean?'
                    className='py-[13.6px] placeholder:text-gray-400 px-4 border-[0.5px] border-border rounded-[14px] focus:border-accent focus:outline-none'
                    type="text"
                    id="definition" {...register("definition")}
                />
                {errors.definition && <p className='text-red-500'>{errors.definition.message}</p>}
            </div>

            <div className='flex flex-col gap-2 mb-5'>
                <label htmlFor="" className='text-sm text-muted uppercase tracking-widest'>example sentences <span className='text-xs text-gray-400 lowercase'>(optional)</span></label>
                <textarea
                    placeholder={'One sentence per line.\nExample: This discovery was ephemeral.'}
                    className='min-h-[110px] py-[13.6px] placeholder:text-gray-400 px-4 border-[0.5px] border-border rounded-[14px] focus:border-accent focus:outline-none'
                    id="sentencesText"
                    {...register("sentencesText")}
                />
                {errors.sentencesText && <p className='text-red-500'>{errors.sentencesText.message}</p>}
            </div>

            <ButtonCustom
                className='bg-foreground text-white transition-transform hover:bg-[#2E2C2A]  hover:-translate-y-0.5 duration-150'
                title='Save word'
                type='submit'
            />

        </form>
    )
}

export default Form