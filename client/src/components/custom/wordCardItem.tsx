import { WordType } from '@/store/api/wordApi';
import { ArrowRight } from 'lucide-react';
import { motion } from 'motion/react'
import Link from 'next/link';

interface WordCardItemProps {
    item: WordType;
}


const WordCardItem = ({ item }: WordCardItemProps) => {

    return (
        <motion.div
            initial={{ y: 70, opacity: 0 }}
            transition={{ duration: 0.1, }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true }}
            className='p-8 relative group flex flex-col gap-4 rounded-2xl overflow-hidden   bg-card shadow-sm hover:translate-y-[-10px] hover:shadow-2xl transition-all duration-300'>
            <div className=''>

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