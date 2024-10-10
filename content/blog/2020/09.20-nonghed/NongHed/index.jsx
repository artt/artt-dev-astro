import React from "react"
import Logo from "./profile.svg?react";

export default function NongHed() {

	React.useEffect(() => {

		function moveEye(mX, mY, eye, center) {
			const theta = Math.atan2(mY - center[1], mX - center[0])
			const r = Math.min(Math.sqrt(Math.pow(mX - center[0], 2) + Math.pow(mY - center[1], 2)), 32.5)
				// 32.5 = the width of the glasses - the width of the eyes in the original size
			eye.setAttribute('transform', `translate(${r * Math.cos(theta)}, ${r * Math.sin(theta)})`)
		}

		function getCenter(glasses) {
			const tmp = glasses.getBoundingClientRect()
			return [tmp.left + tmp.width/2, tmp.top + tmp.height/2]
		}

		function eyesHandler(e) {
			const prefix = ''
			const eyes_left = document.getElementById(prefix + 'eyes_left')
			const eyes_right = document.getElementById(prefix + 'eyes_right')
			const glasses_left = document.getElementById(prefix + 'glasses_left')
			const glasses_right = document.getElementById(prefix + 'glasses_right')
			moveEye(e.clientX, e.clientY, eyes_left, getCenter(glasses_left))
			moveEye(e.clientX, e.clientY, eyes_right, getCenter(glasses_right))
		}

		document.addEventListener('mousemove', eyesHandler)
		return () => {
			document.removeEventListener('mousemove', eyesHandler)
		}

	}, [])

	return(
		<div style={{maxWidth: "300px", marginLeft: "auto", marginRight: "auto"}}>
			<a className="nodecoration" href="https://nonghed.artt.dev" target="_blank" rel="noopener noreferrer">
				<Logo />
			</a>
		</div>
	)

}