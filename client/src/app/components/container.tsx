export default function Container({ children }: { children: React.ReactNode }) {
    return (
        <div className="
        min-w-[360px] 
        w-full
        mx-auto 
        sm:max-w-[680px]
        py-8
        pb-16
        px-5
      ">
            {children}
        </div>
    );
}