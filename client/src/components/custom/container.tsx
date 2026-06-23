export default function Container({ children }: { children: React.ReactNode }) {
    return (
        <div className="
        w-full
        max-w-7xl
        mx-auto
        lg:px-20
        px-6
        py-10
        pb-20
        md:pb-10
        overflow-x-hidden
      ">
            {children}
        </div>
    );
}