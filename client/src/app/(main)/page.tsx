
import HeroComponent from '../components/hero'
import Stats from '../components/stats'
import ButtonCustom from '../components/buttonCustom'
import { ArrowRight, Plus } from 'lucide-react'
import WordList from '../components/wordList'

const HomePage = () => {
    return (
        <div>
            <HeroComponent />
            <Stats />
            <div className='mt-8 flex flex-col gap-3'>
                <ButtonCustom
                    className='bg-foreground text-white transition-transform hover:bg-[#2E2C2A] hover:-translate-y-0.5 duration-150'
                    title='Start Review '
                    icon={<ArrowRight />}
                    redirectTo={true}
                    redirectToPath="/review"
                />
                <ButtonCustom
                    redirectToPath="/add-a-word"
                    redirectTo={true}
                    className=' text-[14.4px] font-normal bg-transparent text-accent transition-transform hover:bg-accent/10 hover:-translate-y-0.5 duration-150 border-[0.5px] border-accent rounded-[14px]'
                    title='Add new words'
                    icon={<Plus />}
                />
            </div>
            <WordList />
        </div>
    )
}

export default HomePage