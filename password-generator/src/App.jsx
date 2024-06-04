import { useState, useCallback, useEffect, useRef } from "react"

export default function App() {
  const [length, setLength] = useState(8)
  const [number, setNumber] = useState(false)
  const [symbol, setSymbol] = useState(false)
  const [password, setPassword] = useState("")
  const passwordRef = useRef(null)

  const copyToClipboard = useCallback(() => {
    passwordRef.current?.select();
    window.navigator.clipboard.writeText(password)
  }, [password])

  const passwordGenerator = useCallback(() => {
    let pass = ""
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"
    if (number) {
      str += "0123456789"
    }
    if (symbol) {
      str += "!@#$%^&*"
    }
    for (let i = 1; i <= length; i++) {
      pass += str.charAt(Math.floor(Math.random() * str.length + 1))
    }
    setPassword(pass)

  }, [length, symbol, number, setPassword])

  useEffect(() => {
    passwordGenerator()
  }, [length, symbol, number, passwordGenerator])
  return (
    <div className="max-w-md pb-3 w-full mx-auto shadow-md rounded-lg px-4 my-8 text-orange-500 bg-gray-700 ">
      <div className="flex shadow p-7 rounded-lg overflow-hidden mb-4">
        <input type="text" value={password} className="outline-none rounded w-full py-1 px-3" placeholder="passowrd"
          ref={passwordRef}
          readOnly />
        <button onClick={copyToClipboard} className="outline-none bg-blue-700 text-white px-3 py-0.5 rounded-tr rounded-br shrink-0">copy</button>
      </div>
      <div className="flex text-sm gap-x-2">
        <div className="flex items-center gap-x-1">
          <input type="range"
            min={6}
            max={100}
            value={length}
            className="cursor-pointer"
            onChange={(e) => setLength(e.target.value)}
          />
          <label>Length ({length})</label>

        </div>
        <div className="flex items-center gap-x-1">
          <input type="checkbox"
            defaultChecked={number}
            id="numberInput"
            onChange={() => setNumber(number => !number)}
          />
          <label > Number</label>
        </div>
        <div className="flex items-center gap-x-1">
          <input type="checkbox"
            defaultChecked={symbol}
            id="symbolInput"
            onChange={() => setSymbol(symbol => !symbol)}
          />
          <label > Symbol</label>
        </div>
      </div>
    </div>
  )
}