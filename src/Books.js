import React,{useEffect, useState} from 'react';
import {BiLinkExternal} from "react-icons/bi";
import axios from 'axios';

const url = (`https://api.nytimes.com/svc/books/v3/lists/
current/hardcover-fiction.json?
api-key=${process.env.REACT_APP_BOOK_KEY}`);

export const Books = () => {
    
    const [books, setBooks] = useState([]);
 
    useEffect(() => {
     const fetchBooks = async () => {
        const res = await axios.get(url)
        setBooks(res.data.results.books)
         }
        fetchBooks()
    }, []);
    return (
        <>
        <h1 className="font-bold text-center lg:text-6xl text-4xl py-5">Best Sellers</h1>
        <section className=" pb-10 grid sm:grid-cols-1 gap-10 px-5 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            
            {books.map((book) => {
                const {author, book_image, buy_links,
                description, price, primary_isbn10, publisher, rank, title} = book

                return(
                    <article className='bg-gray-100 py-5 px-10 rounded-lg sm:px-5' key={rank}>
                        <div>
                        <h3 className='text-center font-bold my-2 mb-5 text-2xl'>{title}</h3>
                            <img className="block mx-auto w-1/2" src={book_image} alt={title}/>
                        </div>
                        
                        <div className='text-xl mt-5'>
                            <p className='mb-4'>{description}</p>
                            <p><span className='font-bold'>Author:</span>{author}</p>
                        
                        
                         
                        <ul>
                        <li><span className='font-bold'>Ranking:</span>{rank}</li>
                        <li><span className='font-bold'>ISBN:</span>{primary_isbn10}</li>
                        <li><span className='font-bold'>Publisher:</span>{publisher}</li>
                        </ul>

                        <ul>
                            <h3 className='font-bold text-xl mt-5'>Buy Now:</h3>
                            {buy_links.map((link) =>{
                                const {name, url} = link
                                return(
                                    <div key = {name}>
                                        <a target="_blank" rel='noopenner noreferrer' className="flex items-center" href={url}>{name} <BiLinkExternal className='ml-1'/></a> <hr />
                                    </div>
                                )
                            }
                            
                            )}
                        </ul>
                        </div>

                        
                    </article>
                )
            })}
        </section>
        </>
    )
}
