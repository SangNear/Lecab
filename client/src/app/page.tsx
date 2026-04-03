import { Button } from '@/components/ui/button'
import { ArrowRight, BookOpen, ChartColumn, CircleCheck, Languages, Library, LogIn, Play, Rocket, Rotate3D, Sparkles } from 'lucide-react'
import Link from 'next/link'
import React from 'react'

const Homepage = () => {
  return (
    <div className='pt-6  min-h-screen overflow-hidden relative  '>
      <nav className='w-full fixed top-0 bg-white border-b border-gray-100 z-50'>
        <div className='mx-auto max-w-7xl p-6 flex items-center justify-between'>
          <div className='flex items-center gap-2'>
            <div className='p-2 bg-amber-500 rounded-lg'>
              <BookOpen className='w-5 h-5 text-white' />
            </div>
            <span className='text-black font-lora text-xl font-bold'>Lexis</span>
          </div>
          <div className='flex items-center gap-2 '>
            <Link href="/login" className='  rounded-lg hover:text-amber-500 transition-all duration-300'>

              <span className='text-[#57534e] font-semibold'>Đăng nhập</span>
            </Link>
            <Link href="/dashboard" className='bg-amber-500 text-white rounded-lg hover:bg-amber-600 transition-all duration-300 px-4 py-2 '>

              <span className='text-white'>Bắt đầu ngay</span>
            </Link>
          </div>
        </div>
      </nav>

      <section className='pt-40 pb-20  mx-auto flex flex-col items-center justify-center max-w-7xl overflow-hidden'>
        <div className='bg-amber-50 py-[6px] px-4 border border-amber-100 rounded-lg inline-flex items-center mb-8 gap-2'>
          <Sparkles className='w-3 h-3 text-amber-500' />
          <span className='text-[#b45309] font-bold uppercase text-xs  tracking-widest'>Học tập chuyên sâu</span>
        </div>

        <h1 className='text-5xl mb-8 md:text-7xl lg:text-8xl text-center italic tracking-wider'>Làm chủ tiếng anh <br /> <span className='text-amber-500  '>tự nhiên</span></h1>

        <p className='text-[#78716c] font-light px-4 mx-6 mb-10 text-lg tracking-wider font-sans text-center'>Ứng dụng kết hợp thuật toán lặp lại ngắt quãng (SRS) giúp bạn ghi nhớ từ vựng vĩnh viễn thông qua bối cảnh thực tế.</p>
        <div className='px-6 flex flex-col md:flex-row w-full items-center justify-center gap-4'>
          <Button className='bg-amber-500 text-white rounded-lg hover:bg-amber-600 transition-all duration-300 px-8 py-8 flex items-center gap-2'>
            <span className='text-white font-bold'>Bắt đầu miễn phí</span>
            <ArrowRight className='w-4 h-4' />
          </Button>
          <Button className=' rounded-lg  transition-all duration-300 px-8 py-8 flex items-center gap-2'>
            <span className='text- font-bold'>Xem cách hoạt động</span>

          </Button>
        </div>
      </section>

      <section className='max-w-7xl mx-auto pt-12 px-6'>
        <div className='grid grid-cols-1 md:grid-cols-12 gap-6'>
          <div className='p-12 relative  flex flex-col border md:col-span-8 rounded-[2.5rem] border-stone-200/60 min-h-[380px]'>
            <div className='mb-8 w-12 h-12 flex items-center justify-center bg-[#fffbeb] border-amber-100 border rounded-lg'>
              <Library className=' text-orange-500' />
            </div>
            <h3 className='tracking-tight text-3xl font-bold font-serif mb-4'>Thư viện từ vựng chuẩn hóa</h3>
            <p className='text-[#78716c] text-sm md:text-base  font-sans leading-relaxed max-w-md'>Chúng tôi đang hoàn thiện kho dữ liệu 50,000+ từ vựng, tập trung vào tính chính xác và bối cảnh sử dụng thực tế của người bản xứ.</p>
            <div className='absolute  bottom-0 right-0 p-8 flex gap-3 items-center justify-center'>
              <div className='py-2 px-4 rounded-xl bg-blue-100 transition-all duration-100 hover:translate-y-[-10px]'>
                <span className='text-blue-600 uppercase text-xs   tracking-widest font-bold'>business</span>
              </div>
              <div className='py-2 px-4 rounded-xl bg-[#fef3c7] transition-all duration-100 hover:translate-y-[-10px]'>
                <span className='text-[#b45309] uppercase text-xs   tracking-widest font-bold'>IELTS Core</span>
              </div>
              <div className='py-2 px-4 rounded-xl bg-[#d1fae5] transition-all duration-100 hover:translate-y-[-10px]'>
                <span className='text-[#047857] uppercase text-xs   tracking-widest font-bold'>Daily Mix
                </span>
              </div>
            </div>
          </div>

          <div className='md:col-span-4 bg-[#1C1917] rounded-[2.5rem] p-8 flex flex-col justify-between group overflow-hidden relative min-h-[380px] shadow-2xl'>
            <div className='relative z-10'>
              <div className='w-10 h-10 bg-white/10 rounded-xl flex items-center justify-center border border-white/10 mb-8'>
                <Rotate3D className='w-5 h-5 text-amber-400' />
              </div>
              <h3 className='text-xl font-bold text-white mb-3'>Học ít, nhớ lâu</h3>
              <p className='text-stone-400 text-xs leading-relaxed font-light'>"Ứng dụng thuật toán Spaced Repetition (SRS) giúp bạn tối ưu hóa thời gian ôn tập một cách khoa học."</p>
            </div>
            <div className='relative z-10 space-y-3'>
              <div className='bg-white/5 border border-white/10 p-3 rounded-2xl flex items-center gap-3'>
                <div className='w-2 h-2 rounded-full bg-amber-500'>

                </div>
                <span className='text-xs font-bold text-stone-300 uppercase tracking-widest'>Ghi nhớ dài hạn</span>
              </div>
              <div className='bg-white/5 border border-white/10 p-3 rounded-2xl flex items-center gap-3'>
                <div className='w-2 h-2 rounded-full bg-green-500'></div>
                <span className='text-xs font-bold text-stone-300 uppercase tracking-widest'>Đúng thời điểm vàng</span>
              </div>
            </div>
          </div>

          <div className='md:col-span-5 p-10 min-h-[300px] flex flex-col bg-amber-50 border border-amber-100 rounded-[2.5rem] group hover:bg-amber-100/50 justify-between'>
            <div className='mb-8 w-12 h-12 flex items-center justify-center bg-white border-amber-100 border rounded-xl'>
              <Rocket className='w-5 h-5 text-amber-500 group-hover:-translate-y-1 group-hover:translate-x-1 transition-transform' />
            </div>
            <h3 className='text-2xl font-serif font-medium text-stone-900 mb-2'>Cùng xây dựng</h3>
            <p className='text-stone-700 text-sm font-light leading-relaxed'>Chúng tôi đang ở những bước đầu tiên. Hãy trở thành những người dùng sớm nhất để cùng đóng góp ý kiến và định hình VocabMaster.</p>
          </div>

          <div className='md:col-span-7 min-h-[300px] flex flex-col border border-stone-200/60 rounded-[2.5rem] p-10'>
            <div className='mb-8 w-12 h-12 flex items-center justify-center bg-[#fffbeb] border-amber-100 border rounded-lg'>
              <Languages className=' text-orange-500' />
            </div>
            <h3 className='text-2xl mb-3 font-bold font-lora'>Ngữ cảnh AI</h3>
            <p className='text-stone-700 text-sm font-light leading-relaxed'>AI hỗ trợ tạo ví dụ cá nhân hóa, giúp bạn hiểu rõ cách dùng từ</p>
            <div className='bg-black p-6 rounded-[2.5rem] flex flex-col mt-8'>
              <div className='uppercase text-[10px] tracking-widest font-bold text-amber-400 mb-3'>Live Context</div>
              <p className='text-[12px]  text-muted italic'>"Small consistency leads to big results."</p>
              <p className='mt-4 pt-4 border-t border-white/10 text-muted text-[10px]'>Sự kiên trì nhỏ dẫn tới kết quả lớn.</p>
            </div>
          </div>
        </div>

      </section>

      <section className='py-24 px-6 max-w-7xl mx-auto'>
        <div className='mb-20 text-center'>
          <h3 className='tracking-wide text-3xl md:text-5xl font-lora uppercase text-amber-600 mb-6'>Cốt lõi của ứng dụng</h3>
          <p className='text-stone-500 font-light max-w-xl mx-auto text-sm md:text-base'>Tập trung vào sự đơn giản và hiệu quả thực tế của người học thay vì những con số hào nhoáng.</p>
        </div>
        <div className='grid sm:grid-cols-2 lg:grid-cols-3 gap-12'>
          <div className='p-8 border border-stone-100 bg-stone-50/50 transition-all flex flex-col justify-between gap-4 rounded-[2.5rem]'>
            <div className='mb-8 w-12 h-12 flex items-center justify-center bg-white border-amber-100 border rounded-xl'>
              <Rocket className='w-5 h-5 text-amber-500 group-hover:-translate-y-1 group-hover:translate-x-1 transition-transform' />
            </div>
            <h4 className='text-lg font-bold text-stone-900'>Học đúng trọng tâm</h4>
            <p className='text-stone-500 text-sm leading-relaxed font-light'>Không nhồi nhét, chỉ học những từ vựng bạn thực sự cần dùng.</p>
          </div>



          <div className='p-8 border border-stone-100 bg-stone-50/50 transition-all flex flex-col justify-between gap-4 rounded-[2.5rem]'>
            <div className='mb-8 w-12 h-12 flex items-center justify-center bg-white border-blue-100 border rounded-xl'>
              <ChartColumn className='w-5 h-5 text-blue-500 group-hover:-translate-y-1 group-hover:translate-x-1 transition-transform' />
            </div>
            <h4 className='text-lg font-bold text-stone-900'>Minh bạch lộ trình</h4>
            <p className='text-stone-500 text-sm leading-relaxed font-light'>Bạn sẽ luôn biết mình đang đứng ở đâu trên hành trình ngôn ngữ.</p>
          </div>



          <div className='p-8 border border-stone-100 bg-stone-50/50 transition-all flex flex-col justify-between gap-4 rounded-[2.5rem]'>
            <div className='mb-8 w-12 h-12 flex items-center justify-center bg-white border-green-100 border rounded-xl'>
              <CircleCheck className='w-5 h-5 text-green-500 group-hover:-translate-y-1 group-hover:translate-x-1 transition-transform' />
            </div>
            <h4 className='text-lg font-bold text-stone-900'>Chất lượng hơn số lượng</h4>
            <p className='text-stone-500 text-sm leading-relaxed font-light'>Mỗi từ vựng được trau chuốt về ví dụ, âm thanh và ngữ cảnh.</p>
          </div>


        </div>
      </section>

      <footer className='pt-24 pb-12 px-6 bg-[#1c1917] text-white'>
        <div className='max-w-7xl mx-auto'>
          <div className='mb-20 grid md:grid-cols-2'>
            <div className='flex flex-col'>
              <h3 className='text-4xl tracking-wider mb-8'>Đồng hành cùng dự án VocabMaster</h3>
              <div className='flex flex-col gap-4'>
                <Link href="#" className='py-[14px] px-8 bg-amber-500 text-white w-fit rounded-2xl font-bold'>Đăng ký trải nghiệm</Link>
                <Link href="#" className='py-[14px] px-8 bg-transparent border border-white/10 text-white w-fit rounded-2xl font-bold'>Đóng góp ý tưởng</Link>
              </div>
            </div>

            <div className='flex flex-col justify-center text-left items-end'>
              <h3 className='text-stone-400 font-light mb-8 max-w-xs italic text-left'>"Học tập là một hành trình dài, hãy bắt đầu một cách khiêm tốn và kiên trì."</h3>
              <div className='flex items-center justify-between gap-8 font-black uppercase tracking-[0.2rem]'>
                <span className='hover:text-amber-500 transition-colors cursor-pointer text-xs'>facebook</span>
                <span className='hover:text-amber-500 transition-colors cursor-pointer text-xs'>threads</span>
                <span className='hover:text-amber-500 transition-colors cursor-pointer text-xs'>github</span>
              </div>
            </div>
          </div>
          <div className='border-t border-white/5 pt-10 flex flex-col gap-6 text-center text-[12px] font-bold tracking-widest text-stone-600 uppercase'>
            <span>© 2026 VocabMaster. Giai đoạn phát triển Early Access.</span>
            <div>Copyright © {new Date().getFullYear()} Lexis. All rights reserved.</div>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default Homepage