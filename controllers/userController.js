import asyncHandler from 'express-async-handler'
import generateToken from '../utils/generateToken.js'
import User from '../models/userModel.js'

// Authentication user and get token
//GET /api/users/login
const authUser = asyncHandler(async (req, res) => {
    const { email, password } = req.body

    const user = await User.findOne({ email })
  
    if (user && (await user.matchPassword(password))) {
      res.json({
        _id: user._id,
        name: user.name,
        email: user.email,
        isAdmin: user.isAdmin,
        token: generateToken(user._id),
      })
    } else {
      res.status(401)
      throw new Error('Invalid email or password')
    }
  })

//register new user
  const registerUser = asyncHandler(async (req, res) => {
    const {name,username, email, password, city, country} = req.body

    const userExists = await User.findOne({ email })
  
    if(userExists){
      res.status(400)
      throw new Error('User already exists')
    }

    const user = await User.create({
      name,
      email,
      password,
      city,
      country,
      username
    })

    if(user){
        res.status(201).json({
                _id: user._id,
                name: user.name,
                username: user.username,
                country: user.country,
                city: user.city,
                email: user.email,
                isAdmin: user.isAdmin,
                token: generateToken(user._id)
          })
    }else{
        res.status(400)
        throw new Error('Invalid User data')
    }
  })

  // get user profile /private
  const getUserProfile = asyncHandler(async (req, res) => {
    const user =  await User.findById(req.user._id)

    if(user){
      res.json({
        _id: user._id,
        name: user.name,
        username: user.username,
        country: user.country,
        city: user.city,
        email: user.email,
        isAdmin: user.isAdmin,
      })
    }else{
      res.status(404)
      throw new Error('User not found')
    }
  })


  // update user profile /private
  const updateUserProfile = asyncHandler(async (req, res) => {
    const user =  await User.findById(req.user._id)

    if(user){
      user.name = req.body.name || user.name
      user.username = req.body.username || user.username
      user.email = req.body.email || user.email
      user.city = req.body.city || user.city
      user.country = req.body.country || user.country
  
      if(req.body.password){
        user.password = req.body.password
      }

      const updatedUser = await user.save()
      res.json({
        _id: updatedUser._id,
        name: updatedUser.name,
        username: user.username,
        country: user.country,
        city: user.city,
        email: updatedUser.email,
        isAdmin: updatedUser.isAdmin,
        token: generateToken(updatedUser._id)
      })
    }else{
      res.status(404)
      throw new Error('User not found')
    }
  })

  // get all users  GET /api/users
  // for admin
  const getUsers = asyncHandler(async (req, res) => {
    const users =  await User.find({})
    res.json(users)
  })

  // delete user DELETE /api/users/:id
  const deleteUser = asyncHandler(async (req, res) => {
    const user = await User.findById(req.params.id)
  
    if (user) {
      await user.remove()
      res.json({ message: 'User removed' })
    } else {
      res.status(404)
      throw new Error('User not found')
    }
  })

  // get user by id 
  // GET /api/users/:id  <-admin
  const getUserById = asyncHandler(async (req, res) => {
    const user = await User.findById(req.params.id).select('-password')
    if(user){
      res.json(user)
    } else {
      res.status(404)
      throw new Error('User not found')
    } 
  })

  // update user <-private/admin
  // PUT /api/users/:id
  const updateUser = asyncHandler(async (req, res) => {
    const user =  await User.findById(req.params.id)

    if(user){
      user.name = req.body.name || user.name
      user.username = req.body.username || user.username
      user.email = req.body.email || user.email
      user.city = req.body.city || user.city
      user.country = req.body.country || user.country
      user.isAdmin = req.body.isAdmin 

      const updatedUser = await user.save()

      res.json({
        _id: updatedUser._id,
        name: updatedUser.name,
        username: user.username,
        country: user.country,
        city: user.city,
        email: updatedUser.email,
        isAdmin: updatedUser.isAdmin
      })
    }else{
      res.status(404)
      throw new Error('User not found')
    }
  })
  export {authUser, getUserProfile, registerUser, updateUserProfile, getUsers, deleteUser, getUserById, updateUser}