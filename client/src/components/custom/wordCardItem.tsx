import { WordType } from '@/store/api/wordApi';
import { ArrowRight } from 'lucide-react';
import { motion } from 'motion/react'
import Link from 'next/link';

interface WordCardItemProps {
    item: WordType;
}
const WordCardItem = ({ item }: WordCardItemProps) => {
    const colorLevel = {
        'A1': 'from-green-400 to-green-600',
        'A2': 'from-yellow-400 to-yellow-600',
        'B1': 'from-muted to-accent',
        'B2': 'from-blue-400 to-blue-600',
        'C1': 'from-purple-400 to-purple-600',
        'C2': 'from-rose-400 to-rose-600',
    }
    return (
        <motion.div
            initial={{ y: 70, opacity: 0 }}
            transition={{ duration: 0.1, }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true }}
            className='p-8 relative group flex flex-col gap-4 rounded-2xl overflow-hidden   bg-card shadow-sm hover:translate-y-[-10px] hover:shadow-2xl transition-all duration-300'>
            <div className=''>
                <div className={`py-1 px-3 group-hover:bg-accent bg-muted rounded-xl mb-6 text-primary-foreground w-fit text-sm font-semibold uppercase  bg-linear-to-r 
                                ${item.cefrLevel in colorLevel ? colorLevel[item.cefrLevel as keyof typeof colorLevel] : ''}`}>
                    {item.cefrLevel}
                </div>
                <h4 className='font-serif mb-3 text-3xl -tracking-wide group-hover:text-accent'>{item.word}</h4>
                <p className='text-muted text-sm font-semibold italic min-h-[100px]'>"{item.meaning}"</p>
            </div>
            <Link href={`/library/${item.word}`} className='absolute -bottom-10 right-4 flex items-center gap-2  group-hover:bottom-4  transition-all duration-200'>
                <span className='text-accent text-sm font-semibold cursor-pointer '>Chi tiết</span>
                <ArrowRight className='w-4 h-4 text-accent' />
            </Link>
        </motion.div>
    )
}
export default WordCardItem