'use client'
import { useEffect } from "react"

export const SearchBox = () => {
    useEffect(() => {
        const a = async () => {
            const dta = await fetch('/api/categories')
            const js = await dta.json()
            console.log(js)
        }
        a()
    }, [])
    return <></>
}