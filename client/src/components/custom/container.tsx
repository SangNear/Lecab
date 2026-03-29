export default function Container({ children }: { children: React.ReactNode }) {
    return (
        <div className="
        w-full
        lg:px-20
        px-10
        py-10
        pb-20
        md:pb-10
        overflow-x-hidden
      ">
            {children}
        </div>
    );
}