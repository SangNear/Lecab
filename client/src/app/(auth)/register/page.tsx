"use client"
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import Link from 'next/link'
import ButtonCustom from '@/components/custom/buttonCustom'
import { MoveRight } from 'lucide-react'
import { useRegisterMutation } from '@/store/api/authApi'
import { useRouter } from 'next/navigation'
import { setCredentials } from '@/store/slices/authSlices'
import { useAppDispatch } from '@/store/hooks'
const registerSchema = z.object({
  name: z.string().min(1, { message: 'Name is required' }),
  email: z.string().email({ message: 'Invalid email address' }),
  password: z.string().min(8, { message: 'Password must be at least 8 characters long' }),
})
type RegisterFormValues = z.infer<typeof registerSchema>

const RegisterPage = () => {
  const router = useRouter()
  const dispatch = useAppDispatch()
  const [registerFn, { isLoading }] = useRegisterMutation()
  const { register, handleSubmit, formState: { errors } } = useForm<RegisterFormValues>({
    resolver: zodResolver(registerSchema),
  })
  const onSubmit = async (data: RegisterFormValues) => {
    try {
      const response = await registerFn(data).unwrap()
      if (response.accessToken) {
        dispatch(setCredentials({
          accessToken: response.accessToken,
          user: {
            id: response.user.id,
            name: response.user.name || '',
            email: response.user.email,

          }
        }))

      }
      router.replace('/login')
    } catch (error) {
      console.log(error)
    }
  }
  return (
    <div className='py-12 px-16 flex items-center justify-center w-full bg-background'>
      <div className='w-full max-w-90'>
        <h1 className='font-lora text-[26px] text-foreground font-normal mb-1.5 text-center '>Đăng ký</h1>

        <form onSubmit={handleSubmit(onSubmit)}>
          <div className='flex flex-col gap-2 mb-5'>
            <label htmlFor="name" className='text-[12px] text-muted uppercase tracking-widest'>tên</label>
            <input type="text" id="name" className='py-[13.6px] placeholder:text-subtle px-4 border-[0.5px] border-border rounded-[14px] focus:border-accent focus:outline-none bg-card' placeholder='Enter your name' {...register("name")} />
            {errors.name && <p className='text-destructive'>{errors.name.message}</p>}
          </div>
          <div className='flex flex-col gap-2 mb-5'>
            <label htmlFor="email" className='text-[12px] text-muted uppercase tracking-widest'>email</label>
            <input type="email" id="email" className='py-[13.6px] placeholder:text-subtle px-4 border-[0.5px] border-border rounded-[14px] focus:border-accent focus:outline-none bg-card' placeholder='Enter your email' {...register("email")} />
            {errors.email && <p className='text-destructive'>{errors.email.message}</p>}
          </div>
          <div className='flex flex-col gap-2 mb-5'>
            <label htmlFor="password" className='text-[12px] text-muted uppercase tracking-widest'>mật khẩu</label>
            <input type="password" id="password" className='py-[13.6px] placeholder:text-subtle px-4 border-[0.5px] border-border rounded-[14px] focus:border-accent focus:outline-none bg-card' placeholder='Enter your password' {...register("password")} />
            {errors.password && <p className='text-destructive'>{errors.password.message}</p>}
          </div>
          <ButtonCustom icon={<MoveRight />} type='submit' title='Tạo tài khoản' className='bg-foreground text-primary-foreground transition-transform hover:opacity-90 hover:-translate-y-0.5 duration-150' />
        </form>
        <div className='mt-3.5 text-center'>
          <p className='text-subtle text-[12px]'>Đã có tài khoản?
            <Link className='text-accent font-medium hover:underline ' href="/login"> Đăng nhập</Link>
          </p>
        </div>

      </div>
    </div>
  )
}

export default RegisterPage
