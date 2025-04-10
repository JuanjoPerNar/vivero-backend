import express from 'express'
import { createPost, getAllPosts, getPostById, updatePost, deletePost } from '../controllers/postControllers'

const router = express.Router()

router.post('/', createPost)
router.get('/', getAllPosts)
router.get('/:id', getPostById)
router.put('/:id', updatePost)
router.delete('/', deletePost)

export default router
