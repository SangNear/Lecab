"use client"
import { Input } from '@/components/ui/input'
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Plus, Search } from 'lucide-react'
import { useEffect, useMemo, useRef, useState } from 'react'
import { DataTable } from './data-table'
import { WordDetail } from '@/components/custom/wordDetail'
import { useGetAllCategoriesQuery } from '@/store/api/categoryApi'
import { useGetWordsQuery, WordType } from '@/store/api/wordApi'
import PaginationCustom from '@/components/custom/paginationCustom'
import { useAppDispatch, useAppSelector } from '@/store/hooks'
import { setSearchStore } from '@/store/slices/wordSlices'
import StatItem from '@/components/custom/statItem'
import { getColumns } from './columns'
import { Button } from '@/components/ui/button'
import DrawerAddWord from '@/components/custom/drawerAddWord'
import { generateQuiz } from '@/lib/generateQuiz'





const Words = () => {
  const alignItemWithTrigger = false;
  const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set())
  const [searchInput, setSearchInput] = useState("")
  const [selectedWord, setSelectedWord] = useState<WordType | null>(null)
  const [openWordDetail, setOpenWordDetail] = useState(false)
  const [categoryIdCurrent, setCategoryIdCurrent] = useState<string>("all")
  const [openAddWord, setOpenAddWord] = useState(false)
  const handleRowClick = (word: WordType) => {
    setSelectedWord(word)
    setOpenWordDetail(true)
  }
  const { currentPage, searchStore } = useAppSelector((state: any) => state.wordUI);

  const { data: categories } = useGetAllCategoriesQuery()

  const { data: wordsData } = useGetWordsQuery({ page: currentPage, categoryId: categoryIdCurrent, search: searchStore, })
  const data = wordsData?.data ?? []

  const dispatch = useAppDispatch();
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const handleSearch = (value: string) => {
    setSearchInput(value);
    if (timerRef.current) {
      clearTimeout(timerRef.current);
    }
    timerRef.current = setTimeout(() => {
      dispatch(setSearchStore(value));
    }, 500);
  }
  useEffect(() => {
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, []);



  const handleToggle = (id: string) => {
    setSelectedIds((prev) => {
      const next = new Set(prev)
      next.has(id) ? next.delete(id) : next.add(id)
      return next
    })
  }

  const columns = useMemo(
    () => getColumns(selectedIds, handleToggle),
    [selectedIds]
  )




  const selectedCategoryName =
    categoryIdCurrent === "all"
      ? "Tất cả"
      : categories?.find(
        (category) => category.id === categoryIdCurrent
      )?.name


  return (
    <div className='flex flex-col gap-6'>
      <div className='flex items-center justify-between'>
        <h1 className='font-serif text-4xl md:text-5xl italic font-extralight mb-3 -space-x-0.5 tracking-tighter'>Kho từ vựng</h1>
        <Button className="hover:scale-110 cursor-pointer" variant="outline" onClick={() => setOpenAddWord(true)}>
          <Plus className="h-4 w-4 text-accent" />
          <span className="hidden md:block text-accent">Thêm từ</span>
        </Button>
        <DrawerAddWord
          categories={categories ?? []}
          open={openAddWord}
          onClose={() => setOpenAddWord(false)} />
      </div>

      <div className='grid grid-cols-2 md:grid-cols-4 gap-4 mb-10'>
        <StatItem iconName='book-open' iconColor='orange' title='Tổng vốn từ' value={wordsData?.pagination.totalItems ?? 0} />
        <StatItem iconName='check-circle' iconColor='green' title='Đã thuộc' value="20" />
        <StatItem iconName='brain-circuit' iconColor='red' title='Cần ôn tập' value="12" />
        <StatItem iconName='flame' iconColor='yellow' title='Streak' value="20" />
      </div>

      <div className='bg-card flex  flex-col md:flex-row md:items-center px-4 py-6 shadow rounded-xl gap-4 md:gap-10 overflow-hidden'>
        <div className='relative bg-red'>
          <Input
            placeholder='Tìm kiếm từ'
            type='text'
            className=' outline-none pl-8  '
            value={searchInput}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleSearch(e.target.value)}
          />
          <Search className='absolute left-2 top-1/2 -translate-y-1/2 text-muted-foreground size-4' />
        </div>

        <div className=' flex items-center gap-2'>
          <label htmlFor="filter" className='text-sm  font-bold'>Bộ từ</label>
          <Select
            value={categoryIdCurrent ?? "all"}  // controlled
            onValueChange={(value) => {
              if (value == null) return
              setCategoryIdCurrent(value === "all" ? "Tất cả" : value)
            }}
          >
            <SelectTrigger className="w-40">
              <SelectValue>
                {selectedCategoryName}
              </SelectValue>
            </SelectTrigger>
            <SelectContent
              alignItemWithTrigger={alignItemWithTrigger}
            >
              <SelectGroup className='w-40'>
                <SelectItem value="all">Tất cả</SelectItem>
                {categories?.map((category) => (
                  <SelectItem key={category.id} value={category.id}>{category.name}</SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>

        <div className=' flex items-center gap-2'>
          <label htmlFor="filter" className='text-sm font-bold '>Sắp xếp</label>
          <Select defaultValue="all" >
            <SelectTrigger className='w-40' >
              <SelectValue />
            </SelectTrigger>
            <SelectContent
              alignItemWithTrigger={alignItemWithTrigger}
            >
              <SelectGroup className='w-40'>
                <SelectItem value="name">Theo tên</SelectItem>
                <SelectItem value="latest">Mới nhất</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className='container mx-auto py-10  '>
        <DataTable columns={columns} data={data} onRowClick={handleRowClick} />
        <WordDetail
          word={selectedWord}
          open={openWordDetail}
          onClose={() => setOpenWordDetail(false)}
        />
        <PaginationCustom
          totalPages={wordsData?.pagination.totalPages ?? 1}
          currentPage={wordsData?.pagination.currentPage ?? 1}
          totalItems={wordsData?.pagination.totalItems ?? 0}
          search={""}
        />
      </div>
    </div>
  )
}

export default Words