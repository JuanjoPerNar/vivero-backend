import Post from "../models/Post.js"

export const createPost = async (req, res) => {
  try {
    const post = new Post(req.body)
    await post.save()
    res.status(201).json(post)
  } catch (error) {
    console.error('Error al crear la publicación', error)
    res.status(400).json({ message: error.message })
  }
}

export const getAllPosts = async (req, res) => {
  try {
    const posts = await Post.find()
    res.status(200).json(posts)
  } catch (error) {
    console.error('Error al obtener las publicaciones', error)
    res.status(500).json({ message: 'Error al obtener las publicaciones' })
  }
}

export const getPostById = async (req, res) => {
  try {
    const { id } = req.params
    const post = await Post.findById(id)

    if (!post) {
      return res.status(404).json({ message: 'Publicación no encontrada' })
    }

    res.status(200).json(post)
  } catch (error) {
    console.error('Error en getPostById:', error)
    res.status(500).json({ message: 'Error al obtener la publicación' })
  }
}

export const updatePost = async (req, res) => {
  const { id } = req.params
  try {
    const updatedPost = await Post.findByIdAndUpdate(id, req.body, {
      new: true,
      runValidators: true,
    })

    if (!updatedPost) {
      return res.status(404).json({ message: 'Publicación no encontrada' })
    }

    res.status(200).json(updatedPost)
  } catch (error) {
    console.error('Error al actualizar la publicación', error)
    res.status(500).json({ message: 'Error al actualizar la publicación' })
  }
}

export const deletePost = async (req, res) => {
  const { id } = req.params

  try {
    const deletedPost = await Post.findByIdAndDelete(id)

    if (!deletedPost) {
      return res.status(404).json({ message: 'Publicación no encontrada' })
    }

    res.status(200).json({ message: 'Publicación eliminada correctamente' })
  } catch (error) {
    console.error('Error al eliminar la publicación', error.message)
    res.status(500).json({ message: 'Error al eliminar la publicación' })
  }
}
