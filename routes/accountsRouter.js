const router = require('express').Router()

const db = require("../data/dbConfig.js")

//API Endpoints

//Create a new Account
router.post('/', (req, res) => {
    const newAccount = req.body

    if (newAccount.name && newAccount.budget) {
        db('accounts')
            .insert(req.body, 'id')
            .then(([id]) => {
                res.status(201).json({ id: id })
            })
            .catch(error => {
                res.status(500).json({ errorMessage: error.message })
            })
    }
    else {
        res.status(400).json({ errorMessage: "Please provide an account name and budget" })
    }


})

//Get all Accounts
router.get('/', (req, res) => {
    db('accounts')
        .select('*')
        .then(accounts => {
            if (accounts) {
                res.status(200).json({ data: accounts })
            }
            else {
                res.status(404).json({ errorMessage: "No records found" })
            }

        })
        .catch(error => {
            res.status(500).json({ errorMessage: error.message })
        })
})

//Get Account by ID
router.get('/:id', (req, res) => {
    const { id } = req.params

    db('accounts')
        .select('*')
        .where('id', id)
        .first()
        .then(account => {
            if (account) {
                res.status(200).json({ data: account })
            }
            else {
                res.status(404).json({ errorMessage: "Account not found" })
            }
        })
        .catch(error => {
            res.status(500).json({ errorMessage: error.message })
        })
})

//Update an Account
router.put('/:id', (req, res) => {
    const { id } = req.params
    const changes = req.body

    if (changes.name && changes.budget) {
        db('accounts')
            .where({ id })
            .update(changes)
            .then(count => {
                if (count) {
                    res.status(200).json({ message: "Account updated successfully" })
                }
                else {
                    res.status(404).json({ errorMessage: "Account could not be found" })
                }
            })
            .catch(error => {
                res.status(500).json({ errorMessage: error.message })
            })
    }
    else {
        res.status(400).json({ errorMessage: "Please provide an account name and budget" })
    }
})

//Delete an account
router.delete('/:id', (req, res) => {
    const { id } = req.params

    db('accounts')
        .where({ id })
        .del()
        .then(count => {
            if (count) {
                res.status(200).json({ message: "Account deleted successfully" })
            }
            else {
                res.status(404).json({ errorMessage: "Account not found" })
            }
        })
        .catch(error => {
            res.status(500).json({ errorMessage: error.message })
        })
})

module.exports = router