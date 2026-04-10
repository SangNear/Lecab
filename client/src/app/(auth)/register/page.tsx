"use client"
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import Link from 'next/link'
import ButtonCustom from '@/components/custom/buttonCustom'
import { MoveRight } from 'lucide-react'

const registerSchema = z.object({
  name: z.string().min(1, { message: 'Name is required' }),
  email: z.string().email({ message: 'Invalid email address' }),
  password: z.string().min(8, { message: 'Password must be at least 8 characters long' }),
})
type RegisterFormValues = z.infer<typeof registerSchema>

const RegisterPage = () => {
  const { register, handleSubmit, formState: { errors } } = useForm<RegisterFormValues>({
    resolver: zodResolver(registerSchema),
  })
  const onSubmit = (data: RegisterFormValues) => {
    console.log(data)
  }
  return (
    <div className='py-12 px-16 flex items-center justify-center w-full bg-background'>
      <div className='w-full max-w-[360px]'>
        <h1 className='font-lora text-[26px] text-foreground font-normal mb-[6px]'>Create account</h1>
        <p className='text-subtle text-[12px] mb-7'>Free for now, but i don't know future plans</p>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className='flex flex-col gap-2 mb-5'>
            <label htmlFor="name" className='text-[12px] text-muted uppercase tracking-widest'>name</label>
            <input type="text" id="name" className='py-[13.6px] placeholder:text-subtle px-4 border-[0.5px] border-border rounded-[14px] focus:border-accent focus:outline-none bg-card' placeholder='Enter your name' {...register("name")} />
            {errors.name && <p className='text-destructive'>{errors.name.message}</p>}
          </div>
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
          <ButtonCustom icon={<MoveRight />} type='submit' title='Create account' className='bg-foreground text-primary-foreground transition-transform hover:opacity-90 hover:-translate-y-0.5 duration-150' />
        </form>
        <div className='mt-3.5 text-center'>
          <p className='text-subtle text-[12px]'>Already have an account?
            <Link className='text-accent font-medium hover:underline ' href="/login"> Sign in</Link>
          </p>
        </div>

      </div>
    </div>
  )
}

export default RegisterPage
