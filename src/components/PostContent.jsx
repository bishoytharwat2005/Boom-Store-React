import React from 'react'
import { Card, CardContent } from './ui/card'
import { Button } from './ui/button'
import { Star } from 'lucide-react'
import { Heart } from 'lucide-react'

function PostContent() {
    const [posts, setposts] = React.useState([])
    async function postsCard() {
        const req = await fetch("https://fakestoreapi.com/products")
        const res = await req.json()
        setposts(res)
    }
    React.useEffect(() => {
        postsCard()
    }, [])
    return (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 py-10 container mx-auto ">
            {posts.map((item) => (
                <Card key={item.id} className="group overflow-hidden rounded-2xl border shadow-sm hover:shadow-xl hover:-translate-y-2 transition-all duration-300">
                    <CardContent className="p-6">
                        <div className="relative">
                            <img
                                src={item.image}
                                alt={item.title}
                                className="h-52 mx-auto object-contain transition-transform duration-300 group-hover:scale-110"
                            />

                            <button className="absolute top-1 right-1 bg-white p-2 rounded-full shadow-md">
                                <Heart size={20} className="text-red-500 fill-red-500" />
                            </button>
                        </div>


                        <div className="flex items-center justify-between gap-4">
                            <h2 className="text-lg font-bold mt-4 line-clamp-2">
                                {item.title}
                            </h2>
                            <div className="flex items-center justify-between gap-2">
                                <Star className='text-yellow-500 fill-yellow-500 ' />
                                <span >{item.rating.rate}</span>
                            </div>
                        </div>

                        <p className="font-medium mt-2 mb-5">
                            {item.description}
                        </p>
                        <span className='py-2 px-4 border border-black/50 rounded-lg '>{item.rating.count}</span>
                        <div className="flex items-center justify-between mt-5">
                            <span className="text-green-600 text-2xl font-bold mt-2">
                                ${item.price}
                            </span>
                            <Button className="text-md border border-black/50 mt-4">
                                Add To Cart
                            </Button>
                        </div>
                    </CardContent>
                </Card>
            ))}
        </div>
    )
}

export default PostContent