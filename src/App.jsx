import React, { useEffect, useState } from 'react'
import ClipBoard from './components/ClipBoard';
import calculate from './helper/script';

// rgb rgba hex hsl hsla hwb cmyk

export default function App() {
	const [inputValue, setInputValue] = useState("rgb(20, 184, 166)");
	const [resultValue, setResultValue] = useState({})
	const [rgb, setRgb] = useState(false);
	const [rgba, setRgba] = useState(false);
	const [hex, setHex] = useState(false);
	const [hsl, setHsl] = useState(false);
	const [hsla, setHsla] = useState(false);
	const [hwb, setHwb] = useState(false);
	const [hwba, setHwba] = useState(false);
	const [cmyk, setCmyk] = useState(false);

	const colorMethods = [
		{state: rgb, setState: setRgb, value: resultValue.rgb},
		{state: rgba, setState: setRgba, value: resultValue.rgba},
		{state: hex, setState: setHex, value: resultValue.hex},
		{state: hsl, setState: setHsl, value: resultValue.hsl},
		{state: hsla, setState: setHsla, value: resultValue.hsla},
		{state: hwb, setState: setHwb, value: resultValue.hwb},
		{state: hwba, setState: setHwba, value: resultValue.hwba},
		{state: cmyk, setState: setCmyk, value: resultValue.cmyk}
	];

	const handleChangeInputValue = (e) => {
		setInputValue(e.target.value);

		const res = calculate(e.target.value);
		setResultValue(res);
	}

	useEffect(() => {
		const res = calculate("rgb(20, 184, 166)");
		setResultValue(res);
	}, [])

	return (
		<div className="container max-w-lg m-auto pt-5 pb-10 min-h-screen relative">
			<div className="space-y-5">
				<h1 className="font-mono font-extrabold text-4xl text-center">Color Converter</h1>
				<div
					className="w-full rounded-xl aspect-video border border-slate-300 "
					style={{ backgroundColor: resultValue.hex }}
				></div>
				<div className='block'>
					<label className="block text-gray-500 font-bold  mb-1 md:mb-0 pr-4">
						rgb, rgba, hex, hsl, hsla
					</label>
					<input type='text'
						className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
						defaultValue={inputValue}
						onChange={handleChangeInputValue}
					/>
				</div>
				<div>
					{
						colorMethods.map((c, i) => {
							return (
								<div key={i} className="flex bg-slate-200 rounded justify-between mb-2">
									<div className="flex items-center px-4">
										<h1 className="font-sans font-semibold">{c.value}</h1>
									</div>
									<ClipBoard state={c.state} setState={c.setState} value={c.value} />
								</div>
							)
						})
					}
				</div>
			</div>
			<div className="absolute bottom-0" style={{ width: "100%", textAlign: "center" }}>
				<h1 className="font-mono text-sm">
					Made with &#128151; by &nbsp;
					<a href='https://kyawphyothu.com' target='_blank' className="font-semibold underline">
						Kyaw Phyo Thu
					</a>.
				</h1>
			</div>
		</div>
	)
}
