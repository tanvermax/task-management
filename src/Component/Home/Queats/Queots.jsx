import React, { useEffect, useState } from 'react';

const Queots = () => {

    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);



    useEffect(()=>{

        const fethQuotes= async()=>{
            const res = await fetch('https://api.quotable.io/quotes/random?limit=1');
                if (!res.ok) {
                    throw new Error('Network response was not ok');
                }
               const newQuotes = await res.json();


               setData(prevData=>{
                const updateData = [...prevData, ...newQuotes].slice(-1);
                return updateData;
               })
                setLoading(false);
        }


        fethQuotes();

        const intervalId = setInterval(fethQuotes,18000);
        return clearInterval(intervalId)
    },[])

   
    if (loading) return <div><span className="loading loading-ring loading-lg"></span></div>;
    if (error) return <div>Error: {error}</div>;


    return (
        <div>
            {data.length > 0 ? (
                data.map(quote => (
                    <div
                        key={quote._id}
                        className="bg-white p-6 rounded-lg shadow-lg transform transition-all duration-500 hover:scale-105 hover:shadow-xl"
                    >
                        <p className="text-lg font-medium text-gray-800 italic">"{quote.content}"</p>
                        <p className="mt-4 text-sm font-semibold text-blue-600 text-right">
                            — {quote.author}
                        </p>
                    </div>
                ))
            ) : (
                <p>No quotes available</p>
            )}
        </div>
    );
};

export default Queots;