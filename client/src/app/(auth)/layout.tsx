import Image from 'next/image';


export default function AuthLayout({ children }: { children: React.ReactNode }) {
    return (
        <div className="min-h-screen flex items-center justify-center bg-background">
            <div className="flex h-full w-full ">
                {/* left side */}
                <div className="max-lg:hidden w-[38%] min-h-screen bg-foreground py-12 px-10 flex flex-col items-center justify-center gap-5 text-background">
                    <div className="w-[52px]">
                        <Image
                            src="/icon.svg"
                            alt="logo"
                            width={0}
                            height={0}
                            sizes="100vw"
                            className="w-full h-auto"
                        />
                    </div>
                    <div className="flex flex-col text-center">
                        <div className="font-lora text-2xl tracking-wider">Lexis</div>
                        <div className="uppercase text-accent tracking-widest text-[12px] mt-0.5">Vocabulary</div>
                    </div>
                    <div className="font-lora italic text-background/75 text-center tracking-wider max-w-[200px] mt-2 text-[14px]">
                        "The limits of my language are the limits of my world."
                    </div>
                    <div className='flex gap-1 mt-2'>
                        <span className='w-2 h-2 rounded-full bg-accent'></span>
                        <span className='w-2 h-2 rounded-full bg-background/35'></span>
                        <span className='w-2 h-2 rounded-full bg-background/35'></span>
                    </div>
                </div>
                {/* right side */}
                {children}
            </div>


        </div>
    );
}
