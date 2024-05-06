import styles from '../favorites/favorites.module.css'
import {removeFavorite} from '../../../store/features/books'
import { useDispatch,  useSelector } from 'react-redux'
import favoriteImage from '../../../assets/favorites.png'
import { motion } from 'framer-motion'

const Favorites = ()=>{
    const dispatch = useDispatch()
    const favoriteBooks = useSelector((state)=> state.books.favorites)
    const dropdown = useSelector((state)=> state.books.dropdown)


    const handleRead = (event) =>{
        window.open(event.target.value)
    }

    const handleDelete = (currentBook)=>{
        dispatch(removeFavorite(currentBook))
    }

    return(
        <>
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 2 }}>

                <div className={dropdown ? `${styles.dropdown_adaptive} ${styles.favorites_wrapper}` : styles.favorites_wrapper}>
                    <h1>Your favorite books</h1>
                    <hr />
                    {favoriteBooks.length == 0 ?
                        <div className={styles.noFavorites_wrap}>
                            <h1>You don`t have favorite books yet</h1>
                            <img src={favoriteImage} alt="favorites" />
                        </div> :

                        <div className={styles.favorites_container}>
                            {favoriteBooks.map((book, ind) => {
                                return <div key={ind + 1} className={styles.favorite_card}>
                                    <img src={book.image} alt={book.name} />
                                    <div className={styles.favoriteCard_content}>
                                        <div className={styles.favorite_text}>
                                            <span className={styles.favorite_name}>{book.name}</span>
                                            <span className={styles.favorite_author}>{book.author}</span>
                                        </div>
                                        <div className={styles.favorite_button}>
                                            <button value={book.pdf} className={styles.read} onClick={handleRead}>read</button>
                                            <button className={styles.delete} onClick={() => handleDelete(book)}>delete</button>
                                        </div>
                                    </div>
                                </div>
                            })}
                        </div>

                    }
                </div>

            </motion.div>

        </>
       
    )
}

export default Favorites