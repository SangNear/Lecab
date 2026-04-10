import React from 'react'
import { SynonymGroup } from '@/store/api/wordApi'


const SynonymComponent = ({ synonyms }: { synonyms: SynonymGroup[] }) => {

    console.log("synonyms from component", synonyms)
    return (
        <div className="flex-1 overflow-y-auto p-6 space-y-8 custom-scrollbar border border-border max-h-[500px] rounded-2xl bg-card">

            <div className="space-y-1">
                <h4 className="text-2xl font-lora text-foreground">Từ đồng nghĩa</h4>

            </div>

            {synonyms.map((synonym) => (
                <section className="space-y-4" key={synonym.sense}>
                    <div className="flex items-center gap-3">
                        <div className="flex-1 h-px bg-border"></div>
                        <span className="text-[10px] font-bold text-subtle uppercase tracking-[0.15em]">Sense: {synonym.sense}</span>
                        <div className="flex-1 h-px bg-border"></div>
                    </div>
                    {synonym.synonyms.map((item) => (
                        <div className="bg-card border border-border rounded-2xl p-5 hover:border-accent/40 hover:shadow-lg transition-all cursor-pointer group" key={item.word}>
                            <div className="flex justify-between items-start mb-3">
                                <div className="space-y-1">
                                    <div className="flex items-center gap-2">
                                        <span className="font-serif font-semibold text-lg text-foreground">{item.word}</span>
                                        <span className="bg-accent-soft text-accent text-[10px] font-bold px-1.5 py-0.5 rounded border border-border">{item.level}</span>
                                        <span className="text-[10px] text-subtle font-medium bg-surface px-1.5 py-0.5 rounded">{item.register}</span>
                                    </div>
                                    <div className="flex items-center gap-1">

                                        <span className="text-[12px] text-subtle ml-1">Thông dụng</span>
                                    </div>
                                </div>

                            </div>

                            <p className="text-xs text-subtle mb-3 italic leading-relaxed group-hover:text-foreground transition-colors">
                                {item.meaning}
                            </p>


                        </div>
                    ))}



                </section>
            ))
            }


        </div >
    )
}

export default SynonymComponent
