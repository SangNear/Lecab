"use client"
import ButtonCustom from '@/components/custom/buttonCustom'

import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import Link from 'next/link'
import { useLoginMutation } from '@/store/api/authApi'
import { useAppDispatch } from '@/store/hooks'
import { setCredentials } from '@/store/slices/authSlices'
import { useRouter } from 'next/navigation'

const loginSchema = z.object({
  email: z.string().email({ message: 'Invalid email address' }),
  password: z.string().min(4, { message: 'Password must be at least 4 characters long' }),
})
type LoginFormValues = z.infer<typeof loginSchema>

const LoginPage = () => {
  const [login, { isLoading }] = useLoginMutation()

  const router = useRouter()
  const dispatch = useAppDispatch()
  const { register, handleSubmit, formState: { errors } } = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
  })
  const onSubmit = async (payload: LoginFormValues) => {

    try {
      const data = await login(payload).unwrap()
      if (data.accessToken) {
        dispatch(setCredentials({
          accessToken: data.accessToken,
          user: {
            id: data.user.id,
            name: data.user.name || '',
            email: data.user.email,
            
          }
        }))

        console.log("logged in", data);
        router.replace('/')
      }
    } catch (error) {
      console.log(error);
    }

  }

  return (  
    <div className='py-12 px-16 flex items-center justify-center w-full bg-background'>
      <div className='w-full max-w-90 '>
        <h1 className='font-lora text-[26px] text-foreground font-normal mb-1.5'>Welcome back</h1>
        <p className='text-subtle text-[12px] mb-7'>Sign in to continue your streak</p>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className='flex flex-col gap-2 mb-5'>
            <label htmlFor="email" className='text-[12px] text-muted uppercase tracking-widest'>email</label>
            <input type="email" id="email" className='py-[13.6px] placeholder:text-subtle px-4 border-[0.5px] border-border rounded-[14px] focus:border-accent focus:outline-none bg-card' placeholder='Enter your email' {...register("email")} />
            {errors.email && <p className='text-destructive'>{errors.email.message}</p>}
          </div>
          <div className='flex flex-col gap-2 mb-5'>
            <label htmlFor="password" className='text-[12px] text-muted uppercase tracking-widest'>password</label>
            <input type="password" id="password" className='py-[13.6px] placeholder:text-subtle px-4 border-[0.5px] border-border rounded-[14px] focus:border-accent focus:outline-none bg-card' placeholder='Enter your password' {...register("password")} />
            {errors.password && <p className='text-destructive'>{errors.password.message}</p>}
          </div>
          <ButtonCustom type='submit' title='Sign in' className='bg-foreground text-primary-foreground transition-transform hover:opacity-90 hover:-translate-y-0.5 duration-150' />
        </form>
        <div className='mt-3.5 text-center'>
          <p className='text-subtle text-[12px]'>Don't have an account?
            <Link className='text-accent font-medium hover:underline ' href="/register"> Create one</Link>
          </p>
        </div>

      </div>
    </div>

  )
}

export default LoginPage