import { useLoaderData } from 'react-router-dom'

const Github = () => {
    // const [data, setDate] = useState([])
    const data = useLoaderData()
    // useEffect(() => {
    //     fetch('https://api.github.com/users/MrSahalImran')
    //         .then(res => res.json())
    //         .then(data => setDate(data))

    // }, [])
    return (
        <div className='text-center items-center gap-5 flex text-3xl p-7 m-4 bg-gray-600 text-white'>
            <div className='rounded-full items-center overflow-hidden'>
                <img src={data?.avatar_url} alt="Git picture" width={200} height={200} />
            </div>
            Git followers: {data?.followers}
        </div>
    )
}

export default Github

export const githubInfoLoader = async () => {
    const res = await fetch('https://api.github.com/users/MrSahalImran')
    return res.json()
}