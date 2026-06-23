
import ThemeSwitcher from '@/components/custom/theme-switcher'
import { Button } from '@/components/ui/button'
import { ArrowRight, BookOpen, ChartColumn, CircleCheck, Languages, Library, Rocket, Rotate3D, Sparkles } from 'lucide-react'
import { cookies } from 'next/headers'

import Link from 'next/link'

async function getAuthStatus() {
  const cookieStore = await cookies() // 👈 thêm await
  const token = cookieStore.get("refreshToken")
  console.log('Token from cookies:', token) // Debug: Kiểm tra giá trị token
  return !!token
}

const Homepage = async () => {
  const isAuthenticated = await getAuthStatus()
  return (
    <div className='pt-6 min-h-screen overflow-hidden relative bg-background'>
      <nav className='w-full fixed top-0 z-50 border-b border-border bg-card'>
        <div className='mx-auto max-w-7xl p-6 flex items-center justify-between'>
          <div className='flex items-center gap-2'>
            <div className='p-2 bg-accent rounded-lg'>
              <BookOpen className='w-5 h-5 text-primary-foreground' />
            </div>
            <span className='text-foreground font-lora text-xl font-bold'>Lexis</span>
          </div>
          <div className='flex items-center gap-4 '>
            <ThemeSwitcher />
            {isAuthenticated ? (
              <Link href="/dashboard" className='bg-accent text-primary-foreground rounded-lg hover:bg-accent-hover transition-all duration-300 px-4 py-2 '>

                <span className='text-primary-foreground'>Dashboard</span>
              </Link>
            ) : (
              <Link href="/login" className='rounded-lg transition-all duration-300 hover:text-accent'>

                <span className='text-subtle font-semibold'>Đăng nhập</span>
              </Link>
            )}
            <Link href="/dashboard" className='bg-accent text-primary-foreground rounded-lg hover:bg-accent-hover transition-all duration-300 px-4 py-2 '>

              <span className='text-primary-foreground'>Bắt đầu ngay</span>
            </Link>

          </div>
        </div>
      </nav>

      <section className='pt-40 pb-20  mx-auto flex flex-col items-center justify-center max-w-7xl overflow-hidden'>
        <div className='bg-accent-soft border border-border py-1.5 px-4 rounded-lg inline-flex items-center mb-8 gap-2'>
          <Sparkles className='w-3 h-3 text-accent' />
          <span className='text-accent font-bold uppercase text-xs  tracking-widest'>Học tập chuyên sâu</span>
        </div>

        <h1 className='text-5xl mb-8 md:text-7xl lg:text-8xl text-center italic tracking-wider text-foreground'>Làm chủ tiếng anh <br /> <span className='text-accent  '>tự nhiên</span></h1>

        <p className='text-subtle font-light px-4 mx-6 mb-10 text-lg tracking-wider font-sans text-center'>Ứng dụng kết hợp thuật toán lặp lại ngắt quãng (SRS) giúp bạn ghi nhớ từ vựng vĩnh viễn thông qua bối cảnh thực tế.</p>
        <div className='px-6 flex flex-col md:flex-row w-full items-center justify-center gap-4'>
          <Button className='bg-accent text-primary-foreground rounded-lg hover:bg-accent-hover transition-all duration-300 px-8 py-8 flex items-center gap-2'>
            <span className='text-primary-foreground font-bold'>Bắt đầu miễn phí</span>
            <ArrowRight className='w-4 h-4' />
          </Button>
          <Button variant='outline' className='rounded-lg border-border transition-all duration-300 px-8 py-8 flex items-center gap-2'>
            <span className='text-foreground font-bold'>Xem cách hoạt động</span>

          </Button>
        </div>
      </section>

      <section className='max-w-7xl mx-auto pt-12 px-6'>
        <div className='grid grid-cols-1 md:grid-cols-12 gap-6'>
          <div className='p-12 relative  flex flex-col border md:col-span-8 rounded-[2.5rem] border-border bg-card min-h-95'>
            <div className='mb-8 w-12 h-12 flex items-center justify-center bg-accent-soft border border-border rounded-lg'>
              <Library className=' text-accent' />
            </div>
            <h3 className='tracking-tight text-3xl font-bold font-serif mb-4 text-foreground'>Thư viện từ vựng chuẩn hóa</h3>
            <p className='text-subtle text-sm md:text-base  font-sans leading-relaxed max-w-md'>Chúng tôi đang hoàn thiện kho dữ liệu 50,000+ từ vựng, tập trung vào tính chính xác và bối cảnh sử dụng thực tế của người bản xứ.</p>
            <div className='absolute  bottom-0 right-0 p-8 flex gap-3 items-center justify-center'>
              <div className='py-2 px-4 rounded-xl bg-surface border border-border transition-all duration-100 hover:-translate-y-2.5'>
                <span className='text-accent uppercase text-xs   tracking-widest font-bold'>business</span>
              </div>
              <div className='py-2 px-4 rounded-xl bg-accent-soft border border-border transition-all duration-100 hover:-translate-y-2.5'>
                <span className='text-muted uppercase text-xs   tracking-widest font-bold'>IELTS Core</span>
              </div>
              <div className='py-2 px-4 rounded-xl bg-success-soft border border-success-border transition-all duration-100 hover:-translate-y-2.5'>
                <span className='text-success uppercase text-xs   tracking-widest font-bold'>Daily Mix
                </span>
              </div>
            </div>
          </div>

          <div className='md:col-span-4 bg-foreground rounded-[2.5rem] p-8 flex flex-col justify-between group overflow-hidden relative min-h-95 shadow-2xl text-background'>
            <div className='relative z-10'>
              <div className='w-10 h-10 bg-background/10 rounded-xl flex items-center justify-center border border-background/10 mb-8'>
                <Rotate3D className='w-5 h-5 text-accent' />
              </div>
              <h3 className='text-xl font-bold mb-3'>Học ít, nhớ lâu</h3>
              <p className='text-background/70 text-xs leading-relaxed font-light'>"Ứng dụng thuật toán Spaced Repetition (SRS) giúp bạn tối ưu hóa thời gian ôn tập một cách khoa học."</p>
            </div>
            <div className='relative z-10 space-y-3'>
              <div className='bg-background/5 border border-background/10 p-3 rounded-2xl flex items-center gap-3'>
                <div className='w-2 h-2 rounded-full bg-accent'>

                </div>
                <span className='text-xs font-bold text-background/80 uppercase tracking-widest'>Ghi nhớ dài hạn</span>
              </div>
              <div className='bg-background/5 border border-background/10 p-3 rounded-2xl flex items-center gap-3'>
                <div className='w-2 h-2 rounded-full bg-success'></div>
                <span className='text-xs font-bold text-background/80 uppercase tracking-widest'>Đúng thời điểm vàng</span>
              </div>
            </div>
          </div>

          <div className='md:col-span-5 p-10 min-h-75 flex flex-col bg-accent-soft border border-border rounded-[2.5rem] group hover:bg-accent-soft/80 justify-between'>
            <div className='mb-8 w-12 h-12 flex items-center justify-center bg-card border border-border rounded-xl'>
              <Rocket className='w-5 h-5 text-accent group-hover:-translate-y-1 group-hover:translate-x-1 transition-transform' />
            </div>
            <h3 className='text-2xl font-serif font-medium text-foreground mb-2'>Cùng xây dựng</h3>
            <p className='text-subtle text-sm font-light leading-relaxed'>Chúng tôi đang ở những bước đầu tiên. Hãy trở thành những người dùng sớm nhất để cùng đóng góp ý kiến và định hình VocabMaster.</p>
          </div>

          <div className='md:col-span-7 min-h-75 flex flex-col border border-border rounded-[2.5rem] p-10 bg-card'>
            <div className='mb-8 w-12 h-12 flex items-center justify-center bg-accent-soft border border-border rounded-lg'>
              <Languages className=' text-accent' />
            </div>
            <h3 className='text-2xl mb-3 font-bold font-lora text-foreground'>Ngữ cảnh AI</h3>
            <p className='text-subtle text-sm font-light leading-relaxed'>AI hỗ trợ tạo ví dụ cá nhân hóa, giúp bạn hiểu rõ cách dùng từ</p>
            <div className='bg-foreground p-6 rounded-[2.5rem] flex flex-col mt-8 text-background'>
              <div className='uppercase text-[10px] tracking-widest font-bold text-accent mb-3'>Live Context</div>
              <p className='text-[12px] text-muted italic'>"Small consistency leads to big results."</p>
              <p className='mt-4 pt-4 border-t border-background/10 text-background/70 text-[10px]'>Sự kiên trì nhỏ dẫn tới kết quả lớn.</p>
            </div>
          </div>
        </div>

      </section>

      <section className='py-24 px-6 max-w-7xl mx-auto'>
        <div className='mb-20 text-center'>
          <h3 className='tracking-wide text-3xl md:text-5xl font-lora uppercase text-accent mb-6'>Cốt lõi của ứng dụng</h3>
          <p className='text-subtle font-light max-w-xl mx-auto text-sm md:text-base'>Tập trung vào sự đơn giản và hiệu quả thực tế của người học thay vì những con số hào nhoáng.</p>
        </div>
        <div className='grid sm:grid-cols-2 lg:grid-cols-3 gap-12'>
          <div className='p-8 border border-border bg-surface transition-all flex flex-col justify-between gap-4 rounded-[2.5rem]'>
            <div className='mb-8 w-12 h-12 flex items-center justify-center bg-card border border-border rounded-xl'>
              <Rocket className='w-5 h-5 text-accent group-hover:-translate-y-1 group-hover:translate-x-1 transition-transform' />
            </div>
            <h4 className='text-lg font-bold text-foreground'>Học đúng trọng tâm</h4>
            <p className='text-subtle text-sm leading-relaxed font-light'>Không nhồi nhét, chỉ học những từ vựng bạn thực sự cần dùng.</p>
          </div>

          <div className='p-8 border border-border bg-surface transition-all flex flex-col justify-between gap-4 rounded-[2.5rem]'>
            <div className='mb-8 w-12 h-12 flex items-center justify-center bg-card border border-border rounded-xl'>
              <ChartColumn className='w-5 h-5 text-muted group-hover:-translate-y-1 group-hover:translate-x-1 transition-transform' />
            </div>
            <h4 className='text-lg font-bold text-foreground'>Minh bạch lộ trình</h4>
            <p className='text-subtle text-sm leading-relaxed font-light'>Bạn sẽ luôn biết mình đang đứng ở đâu trên hành trình ngôn ngữ.</p>
          </div>

          <div className='p-8 border border-border bg-surface transition-all flex flex-col justify-between gap-4 rounded-[2.5rem]'>
            <div className='mb-8 w-12 h-12 flex items-center justify-center bg-card border border-border rounded-xl'>
              <CircleCheck className='w-5 h-5 text-success group-hover:-translate-y-1 group-hover:translate-x-1 transition-transform' />
            </div>
            <h4 className='text-lg font-bold text-foreground'>Chất lượng hơn số lượng</h4>
            <p className='text-subtle text-sm leading-relaxed font-light'>Mỗi từ vựng được trau chuốt về ví dụ, âm thanh và ngữ cảnh.</p>
          </div>


        </div>
      </section>

      <footer className='pt-24 pb-12 px-6 bg-foreground text-background'>
        <div className='max-w-7xl mx-auto'>
          <div className='mb-20 grid md:grid-cols-2'>
            <div className='flex flex-col'>
              <h3 className='text-4xl tracking-wider mb-8'>Đồng hành cùng dự án VocabMaster</h3>
              <div className='flex flex-col gap-4'>
                <Link href="#" className='py-3.5 px-8 bg-accent text-primary-foreground w-fit rounded-2xl font-bold hover:bg-accent-hover transition-colors'>Đăng ký trải nghiệm</Link>
                <Link href="#" className='py-3.5 px-8 bg-transparent border border-background/20 text-background w-fit rounded-2xl font-bold hover:border-background/40 transition-colors'>Đóng góp ý tưởng</Link>
              </div>
            </div>

            <div className='flex flex-col justify-center text-left items-end'>
              <h3 className='text-background/60 font-light mb-8 max-w-xs italic text-left'>"Học tập là một hành trình dài, hãy bắt đầu một cách khiêm tốn và kiên trì."</h3>
              <div className='flex items-center justify-between gap-8 font-black uppercase tracking-[0.2rem]'>
                <span className='hover:text-accent transition-colors cursor-pointer text-xs text-background/80'>facebook</span>
                <span className='hover:text-accent transition-colors cursor-pointer text-xs text-background/80'>threads</span>
                <span className='hover:text-accent transition-colors cursor-pointer text-xs text-background/80'>github</span>
              </div>
            </div>
          </div>
          <div className='border-t border-background/10 pt-10 flex flex-col gap-6 text-center text-[12px] font-bold tracking-widest text-background/50 uppercase'>
            <span>© 2026 VocabMaster. Giai đoạn phát triển Early Access.</span>
            <div>Copyright © {new Date().getFullYear()} Lexis. All rights reserved.</div>
          </div>
        </div>
      </footer>

    </div>
  )
}

export default Homepage
