import { Keyboard, Layers, PenIcon, Zap } from 'lucide-react'
import React from 'react'

interface CardPractice {
    handleChooseMode: (mode: string) => void
}

const ChooseModeScreen = ({ handleChooseMode }: CardPractice) => {
    const cardPractice = [
        {
            title: "Trắc nghiệm",
            description: "Chọn một phương pháp học tập tối ưu. Bạn có thể tự mình cấu hình riêng từng chế độ để luyện trí nhớ hiệu quả nhất.",
            icon: Zap,
            mode: "quiz"
        },
        {
            title: "Nghe viết",
            description: "Nghe phát âm và gõ chính tả từ vựng. Phù hợp để luyện phát âm và ghi nhớ chính tả.",
            icon: PenIcon,
            mode: "listen"
        },
        {
            title: "Nhập từ vựng",
            description: "Gõ trực tiếp chính tả của từ vựng theo nghĩa gợi ý. Phù hợp nhất để học viết, ghi nhớ chiều sâu cấu trúc.",
            icon: Keyboard,
            mode: "write"
        },
        {
            title: "Flash card",
            description: "Học theo thuật toán giãn cách thời gian SM-2 của Leitner. Ôn tập đúng tần suất, ghi nhớ vĩnh viễn.",
            icon: Layers,
            mode: "flashcard"
        },
    ]
    return (
        <div>
            <h1 className="text-3xl font-semibold tracking-tight">Chế độ luyện tập</h1>
            <p className='text-gray-500 text-sm max-w-2xl'>
                Chọn một phương pháp học tập tối ưu. Bạn có thể tự mình cấu hình riêng từng chế độ để luyện trí nhớ hiệu quả nhất.
            </p>
            <div className='flex flex-col md:flex-row justify-between gap-4 w-full mt-10'>
                {cardPractice.map((card) => (
                    <div
                        key={card.mode}
                        onClick={() => handleChooseMode(card.mode)}
                        className="p-8 flex flex-col gap-4 bg-sidebar rounded-lg hover:shadow-lg transition-shadow cursor-pointer shadow items-center justify-center"
                    >
                        <div className='p-2 bg-accent/10 w-fit rounded-md '>
                            <card.icon size={34} className='text-accent' />
                        </div>
                        <h2 className='tracking-tight font-semibold text-xl'>{card.title}</h2>

                    </div>
                ))}
            </div>
        </div>
    )
}

export default ChooseModeScreen