import { useAppDispatch } from '@/store/hooks';
import { setActiveFilter } from '@/store/slices/wordSlices';
import { motion } from 'motion/react'


interface FilterCefrLevelProps {
    activeFilterUI: string;
}

const FilterCefrLevel = ({ activeFilterUI }: FilterCefrLevelProps) => {
    const filters = ['all', 'A1', 'A2', 'B1', 'B2', 'C1', 'C2']
    const dispatch = useAppDispatch();
    return (
        <div className='p-2 flex items-center justify-around rounded-2xl border max-w-fit gap-2 transition-all duration-100 overflow-x-auto'>
            {filters.map((filter) => (
                <div
                    key={filter}
                    className='relative cursor-pointer rounded-xl py-2 px-6 uppercase'
                    onClick={() => dispatch(setActiveFilter(filter))}
                >
                    {/* Animated background pill */}
                    {activeFilterUI === filter && (
                        <motion.div
                            layoutId="active-pill"
                            className="absolute inset-0 bg-accent rounded-xl"
                            transition={{ type: 'spring', stiffness: 400, damping: 35 }}
                        />
                    )}
                    {/* Text */}
                    <span className={`relative z-10 ${activeFilterUI === filter ? 'text-primary-foreground' : 'hover:text-subtle'}`}>
                        {filter}
                    </span>
                </div>
            ))}
        </div>
    )
}

export default FilterCefrLevel