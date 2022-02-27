const express = require('express');
const nano = require('nano')('http://username:password@localhost:5984')
const { createHmac } = require('crypto')
const fs = require('fs')

const app = express()
app.use(express.json())

const db = nano.use('mediatime')


app.post('/signup', (req, res) => {

	const { Username, Password } = req.body


	async function checkUserAvilable(username) {
		try {

			const doc = await db.get(username)

			if (doc) {
				res.send({ message: 'UserExists' })
			}

		} catch (error) {

			if (error.error == 'not_found') {
				const filePath = './UsersImages/' + Username
				fs.mkdir(filePath)

				const key = Password

				const hmacPassword = createHmac('sha256', key).update(Password).digest('hex')

				db.insert({
					Username: Username,
					Password: hmacPassword,
					Posts: [],
					Followers: [],
					Following: []


				}, Username)

				res.send({ message: 'success' })
			}
		}



	}
	checkUserAvilable(Username)



})



app.post('/login', (req, res) => {
	const { Username, Password } = req.body


	async function checkUserAvilable(username) {
		try {

			const doc = await db.get(username)

			if (!doc) {
				res.send({ message: 'UserDoesntExist' })
			}

			else {
				const key = Password
				const hmacPassword = createHmac('sha256', key).update(Password).digest('hex')

				if (hmacPassword == doc.Password) {
					res.send({ message: 'success' })
				}
				else {
					res.send({ message: 'wrongpassword' })

				}
			}

		} catch (error) {
			if (error.error == 'not_found') {
				res.send({ message: 'UserDoesntExist' })

			}
		}



	}
	checkUserAvilable(Username)



})


app.get('/feed', (req, res) => {
	const getFeed = async () => {

	}
	res.sendStatus(200)
})



app.post('/profile', (req, res) => {

	const { Username } = req.body



	async function GetProfile() {
		try {
			const doc = await db.get(Username)
			res.send(doc)
		} catch (error) {
			console.log('boo')
		}

	}
	GetProfile()

})



app.post('/AddPost', (req, res) => {
	// console.log(req.body.file)
	console.log(req)
})


app.listen(3030)