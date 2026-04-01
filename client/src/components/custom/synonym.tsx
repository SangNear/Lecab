import React from 'react'
import { Layers } from 'lucide-react'
import { SynonymGroup } from '@/store/api/wordApi'


const SynonymComponent = ({ synonyms }: { synonyms: SynonymGroup[] }) => {

    console.log("synonyms from component", synonyms)
    return (
        <div className="flex-1 overflow-y-auto p-6 space-y-8 custom-scrollbar border max-h-[500px] rounded-2xl">

            {/* {/* Original Word Header */}
            <div className="space-y-1">
                <h4 className="text-2xl font-lora text-gray-900">Từ đồng nghĩa</h4>

            </div>

            {/* Sense Group 1 */}
            <section className="space-y-4">
                <div className="flex items-center gap-3">
                    <div className="flex-1 h-px bg-gray-200"></div>
                    <span className="text-[10px] font-bold text-gray-400 uppercase tracking-[0.15em]">Sắc thái: Coi thường người khác</span>
                    <div className="flex-1 h-px bg-gray-200"></div>
                </div>

                {/* Synonym Card 1 */}
                <div className="bg-white border border-gray-100 rounded-2xl p-5 hover:border-blue-200 hover:shadow-lg transition-all cursor-pointer group">
                    <div className="flex justify-between items-start mb-3">
                        <div className="space-y-1">
                            <div className="flex items-center gap-2">
                                <span className="font-serif font-semibold text-lg text-gray-900">conceited</span>
                                <span className="bg-blue-50 text-blue-500 text-[10px] font-bold px-1.5 py-0.5 rounded border border-blue-100">C1</span>
                                <span className="text-[10px] text-gray-400 font-medium bg-gray-50 px-1.5 py-0.5 rounded">Informal</span>
                            </div>
                            {/* Popularity Dots */}
                            <div className="flex items-center gap-1">

                                <span className="text-[12px] text-gray-400 ml-1">Thông dụng</span>
                            </div>
                        </div>

                    </div>

                    <p className="text-xs text-gray-500 mb-3 italic leading-relaxed group-hover:text-gray-700 transition-colors">
                        "He’s too <span className="text-blue-500 font-medium">conceited</span> to admit he’s wrong about the project."
                    </p>

                    {/* Collocations */}
                    <div className="flex flex-wrap gap-2">
                        <span className="text-[10px] bg-gray-50 text-gray-500 px-2 py-1 rounded-md border border-gray-100">extremely conceited</span>
                        <span className="text-[10px] bg-gray-50 text-gray-500 px-2 py-1 rounded-md border border-gray-100">conceited person</span>
                    </div>
                </div>

                {/* Synonym Card 2 */}
                <div className="bg-white border border-gray-100 rounded-2xl p-5 hover:border-blue-200 hover:shadow-lg transition-all cursor-pointer group opacity-80 hover:opacity-100">
                    <div className="flex justify-between items-start mb-3">
                        <div className="space-y-1">
                            <div className="flex items-center gap-2">
                                <span className="font-serif font-semibold text-lg text-gray-900">haughty</span>
                                <span className="bg-blue-50 text-blue-500 text-[10px] font-bold px-1.5 py-0.5 rounded border border-blue-100">C2</span>
                                <span className="text-[10px] text-gray-400 font-medium bg-gray-50 px-1.5 py-0.5 rounded">Formal</span>
                            </div>
                            <div className="flex items-center gap-1">
                                <span className="dot dot-filled"></span>
                                <span className="dot dot-filled"></span>
                                <span className="dot dot-empty"></span>
                                <span className="dot dot-empty"></span>
                                <span className="dot dot-empty"></span>
                                <span className="text-[10px] text-gray-400 ml-1">Ít dùng</span>
                            </div>
                        </div>
                        <button className="w-8 h-8 rounded-full border border-gray-100 flex items-center justify-center text-gray-300 hover:bg-blue-500 hover:text-white transition-all">+</button>
                    </div>
                    <p className="text-xs text-gray-400 mb-3 group-hover:text-gray-500">She threw him a haughty look before leaving.</p>
                </div>
            </section>

            {/* Sense Group 2 */}
            <section className="space-y-4">
                <div className="flex items-center gap-3">
                    <div className="flex-1 h-px bg-gray-200"></div>
                    <span className="text-[10px] font-bold text-gray-400 uppercase tracking-[0.15em]">Sắc thái: Tự tin quá mức</span>
                    <div className="flex-1 h-px bg-gray-200"></div>
                </div>

                <div className="bg-white border border-gray-100 rounded-2xl p-5 hover:border-blue-200 hover:shadow-lg transition-all cursor-pointer group">
                    <div className="flex justify-between items-start">
                        <div className="space-y-1">
                            <div className="flex items-center gap-2">
                                <span className="font-serif font-semibold text-lg text-gray-900">overconfident</span>
                                <span className="bg-blue-50 text-blue-500 text-[10px] font-bold px-1.5 py-0.5 rounded border border-blue-100">B2</span>
                            </div>
                            <div className="flex items-center gap-1">
                                <span className="dot dot-filled"></span>
                                <span className="dot dot-filled"></span>
                                <span className="dot dot-filled"></span>
                                <span className="dot dot-filled"></span>
                                <span className="dot dot-filled"></span>
                                <span className="text-[10px] text-gray-400 ml-1">Rất phổ biến</span>
                            </div>
                        </div>
                        <button className="w-8 h-8 rounded-full border border-gray-100 flex items-center justify-center text-gray-300 hover:bg-blue-500 hover:text-white transition-all">+</button>
                    </div>
                </div>
            </section>

        </div>
    )
}

export default SynonymComponent