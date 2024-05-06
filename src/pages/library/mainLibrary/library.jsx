import { useEffect, useState } from 'react'
import { getApi, setCurrentBook, setBooksModal } from '../../../store/features/books'
import styles from '../mainLibrary/library.module.css'
import { useDispatch, useSelector } from 'react-redux'
import { Input } from "antd";
import LibraryModal from '../libraryModal/libraryModal';
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';
import { NavLink } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Button } from '@mui/material';
import { CircularProgress } from '@mui/material'



const Library = ()=>{
    const dispatch = useDispatch()
    const books = useSelector((state)=> state.books.booksList);
    const loading = useSelector((state)=> state.books.loading);
    const [searchValue, setSeacrhValue] = useState('')
    const [page, setPage] = useState(1)
    const favorites = useSelector((state)=> state.books.favorites)
    const dropdown = useSelector((state)=> state.books.dropdown)


    
    
    
    useEffect(()=>{
        dispatch(getApi(page))
    },[dispatch, page])

    function handleRead(e){
        window.open(e.target.value, '_blank')
    }

    function handleModal(books){
        dispatch(setBooksModal(true))
        dispatch(setCurrentBook(books))

    }

    const searchBooks = books.filter((book)=>{
        return book.name.toLocaleLowerCase().includes(searchValue.toLocaleLowerCase())
    })

    const handleChangePage = (event, value) => {
        setPage(value);
    };

    return (
        <>
            <LibraryModal />
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 2}}
            >
                <div className={dropdown ? `${styles.wrapper_adaptive} ${styles.wrapper}` : styles.wrapper}>
                    <div className={styles.library_header}>
                        <h1>Programming books recommended by<br />Humo Academy</h1>

                    </div>
                    <div className={styles.library_navigation}>
                        <Input status="error" placeholder="search..." onChange={(e) => setSeacrhValue(e.target.value)} className={styles.searchInput} />
                    </div>

                    <Stack spacing={2} className={styles.pagination_wrap}>
                        <Pagination className={styles.pagination} count={3} page={page} onChange={handleChangePage} />
                        <div className={styles.favorite_wrap}>
                            <NavLink className={styles.favorite} to='/library/favorites'>Favorite books</NavLink>
                            <div className={favorites.length > 0 ? styles.indicator : styles.indicatorDisplayNone}>
                                <span className={favorites.length > 0 ? styles.indicator_count : styles.indicatorCountNone}>
                                    {favorites.length}
                                </span>
                            </div>
                        </div>
                    </Stack>
                    <div className={styles.library_container}>

                        {loading ? <div className={styles.library_loading}>
                                        <CircularProgress/>
                                    </div> :
                            searchBooks.map((book, id) => {
                                return <div key={id} className={styles.book_card}>
                                    <img src={book.image} alt={book.name} />
                                    <div className={styles.card_content}>
                                        <div className={styles.card_text}>
                                            <span className={styles.name}>{book.name}</span>
                                            <span className={styles.author}>{book.author}</span>
                                        </div>
                                        <div className={styles.card_button}>
                                            <Button 
                                            value={book.pdf} 
                                            onClick={handleRead}
                                            variant='outlined'
                                            color='success'>
                                                read
                                            </Button>
                                            <Button 
                                            onClick={()=> handleModal(book)}
                                            variant='outlined'
                                            color='primary'>
                                                show more
                                            </Button>    
                                        </div>
                                    </div>
                                </div>
                            })
                        }
                    </div>
                </div>
            </motion.div>

        </>
    )
}

export default Library 