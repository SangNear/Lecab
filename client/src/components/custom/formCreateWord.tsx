"use client"
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { z } from "zod"
import ButtonCustom from './buttonCustom'
import { useCreateWordMutation } from '@/store/api/wordApi'
import { toast } from 'sonner'
import { useRouter } from 'next/navigation'

const wordSchema = z.object({
    word: z.string().min(1, { message: "Word is required" }),
    meaning: z.string().min(1, { message: "Definition is required" }),
    examples: z.string().min(1, { message: "Examples are required" }),
})

type WordFormValues = z.infer<typeof wordSchema>
const formCreateWord = () => {
    const router = useRouter()
    const [createWord, { isLoading, error }] = useCreateWordMutation()
    const { register, handleSubmit, formState: { errors } } = useForm<WordFormValues>({
        resolver: zodResolver(wordSchema),
    })
    const onSubmit = async (data: WordFormValues) => {
        const sentences =
            data.examples
                ?.split(/\r?\n/)
                .map((s) => s.trim())
                .filter(Boolean) ?? []

        const payload = {
            word: data.word,
            meaning: data.meaning,
            example: sentences,
        }

        console.log(payload)
        await createWord(payload).unwrap().then((res) => {
            router.push("/library")
            toast.success("Word added successfully")
        }).catch(() => {
            toast.error("Failed to add word")
        })
    }
    return (
        <form className='bg-white px-4 py-12 md:px-12  rounded-[4rem] border border-gray-100 shadow-sm space-y-10 mt-16' onSubmit={handleSubmit(onSubmit)}>
            <div className='flex flex-col gap-2 mb-5'>
                <label htmlFor="" className='text-[12px] uppercase  font-black text-gray-400 tracking-widest'>Từ vựng / cụm từ</label>
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
                <label htmlFor="" className='text-[12px] uppercase  font-black text-gray-400 tracking-widest'>định nghĩa</label>
                <input
                    placeholder='What does it mean?'
                    className='py-[13.6px] placeholder:text-gray-400 px-4 border-[0.5px] border-border rounded-[14px] focus:border-accent focus:outline-none'
                    type="text"
                    id="meaning" {...register("meaning")}
                />
                {errors.meaning && <p className='text-red-500'>{errors.meaning.message}</p>}
            </div>

            <div className='flex flex-col gap-2 mb-5'>
                <label htmlFor="" className='text-[12px] uppercase  font-black text-gray-400 tracking-widest'>Câu ví dụ <span className='text-xs text-gray-400 lowercase'>(optional)</span></label>
                <textarea
                    placeholder={'One sentence per line.\nExample: This discovery was ephemeral.'}
                    className='min-h-[110px] py-[13.6px] placeholder:text-gray-400 px-4 border-[0.5px] border-border rounded-[14px] focus:border-accent focus:outline-none'
                    id="examples"
                    {...register("examples")}
                />
                {errors.examples && <p className='text-red-500'>{errors.examples.message}</p>}
            </div>

            <ButtonCustom
                className='bg-foreground text-white transition-transform hover:bg-[#2E2C2A]  hover:-translate-y-0.5 duration-150'
                title='Save word'
                type='submit'
            />

        </form>
    )
}

export default formCreateWord