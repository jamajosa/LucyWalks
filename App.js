import { StatusBar } from 'expo-status-bar'
import { useState, useEffect } from 'react'
import {
	StyleSheet,
	Text,
	View,
	Image,
	TouchableOpacity,
	Vibration,
} from 'react-native'
import * as Location from 'expo-location'
import {getDistance, getPreciseDistance} from 'geolib';
export default function App() {
	//fun idea, hints! and a admin panel where people can make routes, add hints, add quizzes
	//fun idea the compass can be used to turn vibration of and on

	//#ff6361 red
	//#ffa600 orange
	//#008585 green or #74a892
	const [collected, setCollected] = useState(0)
	const [vibration, setVibration] = useState()
	const [distance, SetDistance] = useState(1000)
	const [color1, setColor] = useState('#008000')
	const [backgroundsize, setSize] = useState(150)
	const Pulse = require('react-native-pulse').default
	const timers = require('timers-promises')

	//this function checks how close the person is to a point
	//after it checked how close it fires up the checklocation function, and change the color the pulse
	//green = 0-20 meters
	//yellow-green = 15-30 meters
	//yellow = 30-40 meters
	//yellow-orange = 40-50 meters
	//orange = 50-75 meters
	//red-orange = 75-100 meters
	//red = 100+ meters
	function checkSwitch(param) {
		if (param <= 10) {
			if (color1 != '#008000') {
				vibrate()
				setColor('#008000')
			}
			calculateDistance(1000)
		} else if (param > 10 && param <= 20) {
			if (color1 != '#9ACD32') {
				vibrate()
				setColor('#9ACD32')
			}
			calculateDistance(1000)
		} else if (param > 20 && param <= 45) {
			if (color1 != '#e6e600') {
				vibrate()
				setColor('#e6e600')
			}
			calculateDistance(1000)
		} else if (param > 45 && param <= 70) {
			if (color1 != '#FFAE42') {
				vibrate()
				setColor('#FFAE42')
			}
			calculateDistance(1000)
		} else if (param > 70 && param <= 100) {
			if (color1 != '#FF5349') {
				vibrate()
				setColor('#FF5349')
			}
			calculateDistance(1000)
		} else if (param > 100 && param <= 150) {
			if (color1 != '#FF0000') {
				vibrate()
				setColor('#FF0000')
			}
			calculateDistance(1000)
		}

		//this function is to check in lower paste, pulse should be always red from here
		else if (param > 150 && param <= 200) {
			calculateDistance(1000)
		} else if (param > 200 && param <= 500) {
			calculateDistance(1000)
		} else {
			calculateDistance(1000)
		}
	}

	//this function asks location permission after rendering (useEffect is a hook for after render)
	//this function is async function, the await has to be resolved before the program continues, location is needed
	//useEffect is used whenever the page reloads
	useEffect(() => {
		;(async () => {
			let { status } = await Location.requestForegroundPermissionsAsync()
			if (status !== 'granted') {
				setErrorMsg('Permission to access location was denied')
				return
			}
			calculateDistance(0)
			setVibration(true)
		})()
	}, [])

	//this function is used for when the compas is touched.
	//it will turn off vibration in the entire application
	function vibrationBtnAnimation() {
		if (vibration == true) {
			setVibration(false)
		} else {
			setVibration(true)
		}
		vibrate()
		setSize(160), setTimeout(() => setSize(150), 200)
	}

	// this function checks if vibration is on.
	//if vibration is on it will vibrate
	function vibrate() {
		if (vibration === true) {
			Vibration.vibrate()
		} else {
		}
	}

	//this function gets the location
	async function locagetter() {
		const loc = await Location.getCurrentPositionAsync({
			enableHighAccuracy: true,
		})
		return loc
	}

	//this function calculates the distance
	async function calculateDistance(timeout) {
		current = await locagetter()
		await timers.setTimeout(timeout)
		const distance = await getPreciseDistance(
			{ latitude: 51.49328, longitude: 4.294605 },
			{ latitude: current.coords.latitude, longitude: current.coords.longitude }
		)

		const distance2 = await getPreciseDistance(
			{ latitude: 51.4922478, longitude: 4.2927204 },
			{ latitude: current.coords.latitude, longitude: current.coords.longitude }
		)

		const distance3 = await getPreciseDistance(
			{ latitude: 51.4915169, longitude: 4.292236 },
			{ latitude: current.coords.latitude, longitude: current.coords.longitude }
		)

		checkSwitch(distance)
		SetDistance(distance)
	}

	function collectPoint() {
		setCollected(collected + 1)
		//remove point from array of pointshghg
	}

	return (
		<View style={styles.container}>
			<View style={styles.container4}>
				<Text style={styles.text2}>{collected} punten</Text>
			</View>
			<View style={styles.container1}>
				<Image
					source={require('./assets/lucywalks.png')}
					style={styles.backgroundImage2}
				></Image>
			</View>
			<View style={styles.container2}>
				{distance <= 15 ? (
					<Pulse
						color='#008000'
						numPulses={1}
						diameter={400}
						speed={5}
						duration={1000}
					/>
				) : null}
				{distance > 10 && distance <= 30 ? (
					<Pulse
						color='#9ACD32'
						numPulses={1}
						diameter={400}
						speed={5}
						duration={1000}
					/>
				) : null}
				{distance > 20 && distance <= 55 ? (
					<Pulse
						color='#e6e600'
						numPulses={1}
						diameter={400}
						speed={5}
						duration={1000}
					/>
				) : null}
				{distance > 45 && distance <= 80 ? (
					<Pulse
						color='#FFAE42'
						numPulses={1}
						diameter={400}
						speed={5}
						duration={1000}
					/>
				) : null}
				{distance > 70 && distance <= 110 ? (
					<Pulse
						color='#FF5349'
						numPulses={1}
						diameter={400}
						speed={5}
						duration={1000}
					/>
				) : null}
				{distance > 100 && distance <= 150 ? (
					<Pulse
						color='#FF0000'
						numPulses={1}
						diameter={400}
						speed={5}
						duration={1000}
					/>
				) : null}
				{distance > 18 ? (
					<TouchableOpacity onPress={() => vibrationBtnAnimation()}>
						<Image
							source={require('./assets/4336206.png')}
							style={[
								styles.backgroundImage,
								{
									width: backgroundsize,
									height: backgroundsize,
									borderRadius: backgroundsize / 2,
									backgroundColor: '#96A35D',
								},
							]}
						/>
					</TouchableOpacity>
				) : (
					<TouchableOpacity onPress={() => collectPoint()}>
						<Image
							source={require('./assets/4336207.png')}
							style={[
								styles.backgroundImage,
								{
									width: backgroundsize,
									height: backgroundsize,
									borderRadius: backgroundsize / 2,
									backgroundColor: '#96A35D',
								},
							]}
						/>
					</TouchableOpacity>
				)}

				<StatusBar style='auto' hidden />
			</View>
			<View style={styles.container3}></View>
		</View>
	)
}

const styles = StyleSheet.create({
	text2: {
		color: 'white',
		fontWeight: 'bold',
	},
	container: {
		flex: 1,
		width: null,
		height: null,
		backgroundColor: '#96A35D',
		alignItems: 'center',
		justifyContent: 'center',
	},
	container1: {
		flex: 0.3,
		width: null,
		height: null,
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'center',
	},
	container2: {
		flex: 0.4,
		width: null,
		height: null,
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'center',
	},
	container3: {
		flex: 0.2,
		width: null,
		height: null,
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'center',
	},
	container4: {
		flex: 0.1,
		width: null,
		height: null,
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'center',
	},
	text: {
		color: '#ffffea',
	},
	backgroundImage: {
		backgroundColor: '#4f1329',
	},
	backgroundImage3: {
		width: 170,
		height: 170,
		borderRadius: 170 / 2,
		backgroundColor: '#4f1329',
	},
	backgroundImage2: {
		bottom: 0,
		resizeMode: 'contain',
		height: 200,
	},
})
